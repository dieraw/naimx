package handlers

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Login(c *gin.Context) {
	var loginReq struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": "false", "error": "Invalid input"})
		return
	}

	// Будем получать данные с базы
	if loginReq.Username == "admin" && loginReq.Password == "password" {

		session := sessions.Default(c)
		session.Set("username", loginReq.Username)
		session.Set("logged_in", true)

		if err := session.Save(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": "false", "error": "Failed to save session"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"success": "true", "message": "Logged in successfully"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"success": "false", "error": "Invalid credentials"})
	}
}
