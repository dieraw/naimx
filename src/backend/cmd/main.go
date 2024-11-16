package main

import (
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	handlers "naimx/internal"
	utils "naimx/pkg"
)

func main() {
	utils.ConnectToDB()
	utils.CreateTables()
	r := gin.Default()

	secret := utils.GenerateSecret()

	store := cookie.NewStore([]byte(secret))
	r.Use(sessions.Sessions("naimix-session", store))

	//r.Use(cors.New(cors.Config{
	//	AllowOrigins:     []string{"http://localhost:5000", "http://localhost:3000"},
	//	AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
	//	AllowHeaders:     []string{"Content-Type", "Authorization"},
	//	AllowCredentials: true,
	//}))

	//r.Static("/static", "./frontend/build/static")
	//
	//r.StaticFile("/", "./frontend/build/index.html")
	//
	//r.NoRoute(func(c *gin.Context) {
	//	c.File("./frontend/build/index.html")
	//})

	r.POST("/api/register", handlers.Register)
	r.POST("/api/login", handlers.Login)

	r.GET("/session-data", func(c *gin.Context) {
		session := sessions.Default(c)

		username := session.Get("username")
		fmt.Println("Username in session:", username)

		c.JSON(200, gin.H{
			"username":  username,
			"logged_in": session.Get("logged_in"),
		})
	})

	r.Run(":5000")
}
