package handlers

import (
	"fmt"
	"net/http"
	_ "time"

	"github.com/gin-gonic/gin"
)

type UserForm struct {
	Username  string `json:"username" binding:"required"`
	Name      string `json:"name" binding:"required"`
	Email     string `json:"email" binding:"required"`
	BirthDate string `json:"birthDate" binding:"required"`
	BirthTime string `json:"birthTime"`
}

func Register(c *gin.Context) {
	fmt.Println("привет")

	var user UserForm

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": "false", "error": err.Error()})
		return
	}
	//
	//session := sessions.Default(c)
	//session.Set("username", user.Username)
	//session.Set("logged_in", true)

	//if err := session.Save(); err != nil {
	//	c.JSON(http.StatusBadRequest, gin.H{"success": "false", "error": err.Error()})
	//	return
	//}

}
