package handlers

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Login Авторизация пользователя
// @Summary Авторизация
// @Description Проверка email и пароля, создание сессии
// @Tags auth
// @Accept  json
// @Produce  json
// @Param login body struct{Email string `json:"email"`; Password string `json:"password"`} true "Данные для входа"
// @Success 200 {object} map[string]interface{} "Успешный вход"
// @Failure 400 {object} map[string]interface{} "Неверный запрос"
// @Failure 401 {object} map[string]interface{} "Неверные учетные данные"
// @Router /api/login [post]

func Login(c *gin.Context) {
	var loginReq struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": "false", "error": "Invalid input"})
		return
	}

	// Будем получать данные с базы
	if loginReq.Email == "admin@com" && loginReq.Password == "password" {

		session := sessions.Default(c)
		session.Set("email", loginReq.Email)
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
