FROM golang:1.11

RUN go get github.com/labstack/echo/...
RUN go get github.com/dgrijalva/jwt-go

WORKDIR /app
ADD . /app

CMD ["go", "run", "main.go"]
