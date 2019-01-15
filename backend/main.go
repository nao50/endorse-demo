package main

import (
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
		claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

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

	// e.GET("/", func(c echo.Context) error {
	// 	return c.String(http.StatusOK, "Hello, World!")
	// })

	// Basic Authentcation Group
	e.POST("/basiclogin", basiclogin)

	b := e.Group("/basic")
	b.Use(middleware.JWT([]byte("secret")))
	b.GET("/hello", basicroute)

	e.Logger.Fatal(e.Start(":8080"))
}

// curl -X POST -H 'content-type:application/json' -d '{"username":"admin", "password":"password"}' localhost:8080/basiclogin
// curl localhost:8080/basic/hello -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTQ3ODIyMDA4LCJuYW1lIjoiYWRtaW4ifQ.AsNGVZtOsfRzQC-lUaVVVKR-H7mUIM2JkhAjOaltYPg"
