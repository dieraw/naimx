package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserForm struct {
	Name      string `json:"name" binding:"required"`
	Email     string `json:"email" binding:"required"`
	BirthDate string `json:"birthDate" binding:"required"`
	BirthTime string `json:"birthTime"`
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3001"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	r.Static("/static", "./frontend/build/static")

	r.StaticFile("/", "./frontend/build/index.html")

	r.NoRoute(func(c *gin.Context) {
		c.File("./frontend/build/index.html")
	})

	r.POST("/register", func(c *gin.Context) {
		var user UserForm

		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"ok": "false", "error": err.Error()})
			return
		}
	})

	r.Run(":8080")
}
