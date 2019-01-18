package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type jwtCustomClaims struct {
	jwt.StandardClaims
	EndorseClaim endorseClaim `json:"soracom-endorse-claim"`
}

type endorseClaim struct {
	IMSI              string            `json:"imsi"`
	IMEI              string            `json:"imei"`
	MSISDN            string            `json:"msisdn"`
	RequestParameters map[string]string `json:"requestparameters,omitempty"`
}

func tokenlogin(c echo.Context) error {
	endorseTokenString := c.Request().Header["Authorization"][0]

	fmt.Println(endorseTokenString)

	endorseToken, _ := jwt.ParseWithClaims(endorseTokenString, &jwtCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		publicKeyURL := "https://s3-ap-northeast-1.amazonaws.com/soracom-public-keys/" + token.Header["kid"].(string)

		response, err := http.Get(publicKeyURL)
		if err != nil {
			return nil, fmt.Errorf("http.Get(publicKeyURL) Error: ", publicKeyURL, err)
		}
		defer response.Body.Close()

		pubkeyData, _ := ioutil.ReadAll(response.Body)
		key, _ := jwt.ParseRSAPublicKeyFromPEM(pubkeyData)

		return key, nil
	})

	if endorseClaims, ok := endorseToken.Claims.(*jwtCustomClaims); ok && endorseToken.Valid {
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["imsi"] = endorseClaims.EndorseClaim.IMSI
		claims["imei"] = endorseClaims.EndorseClaim.IMEI
		claims["msisdn"] = endorseClaims.EndorseClaim.MSISDN
		claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

		t, err := token.SignedString([]byte("secret"))
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, map[string]string{
			"token": t,
		})
	} else {
		return echo.ErrUnauthorized
	}
	return echo.ErrUnauthorized
}

func tokenroute(c echo.Context) error {
	// user := c.Get("user").(*jwt.Token)
	// claims := user.Claims.(*jwtCustomClaims)
	// imsi := claims.EndorseClaim.IMSI
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	imsi := claims["imsi"].(string)
	imei := claims["imei"].(string)
	// return c.String(http.StatusOK, "Welcome "+imsi+"!")

	return c.JSON(http.StatusOK, map[string]string{
		"imsi": imsi,
		"imei": imei,
	})
}

func basiclogin(c echo.Context) error {
	u := new(User)
	if err := c.Bind(u); err != nil {
		return err
	}

	if u.Username == "admin" && u.Password == "password" {
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["name"] = u.Username
		claims["admin"] = true
		claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

		t, err := token.SignedString([]byte("secret"))
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, map[string]string{
			"token": t,
		})
	}
	return echo.ErrUnauthorized
}

func basicroute(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	name := claims["name"].(string)
	return c.String(http.StatusOK, "Welcome "+name+"!")
}

func main() {
	e := echo.New()
	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	// Basic Authentcation Group
	e.POST("/basiclogin", basiclogin)

	b := e.Group("/basic")
	b.Use(middleware.JWT([]byte("secret")))
	b.GET("/hello", basicroute)

	// Token Authentcation Group
	e.POST("/tokenlogin", tokenlogin)

	t := e.Group("/token")
	t.Use(middleware.JWT([]byte("secret")))
	t.GET("/hello", tokenroute)

	e.Logger.Fatal(e.Start(":8080"))
}
