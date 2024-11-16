package handlers

import (
	"github.com/gin-contrib/sessions"
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

// Register Регистрация пользователя
// @Summary Регистрация нового пользователя
// @Description Создает учетную запись пользователя
// @Tags auth
// @Accept  json
// @Produce  json
// @Param user body struct{Email string `json:"email"`; Password string `json:"password"`} true "Данные для регистрации"
// @Success 201 {object} map[string]interface{} "Пользователь зарегистрирован"
// @Failure 400 {object} map[string]interface{} "Неверные данные"
// @Failure 500 {object} map[string]interface{} "Ошибка сервера"
// @Router /api/register [post]
func Register(c *gin.Context) {

	var user UserForm
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": "false", "error": err.Error()})
		return
	}

	session := sessions.Default(c)
	session.Set("username", user.Username)
	session.Set("logged_in", true)

	if err := session.Save(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": "false", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": "true", "message": "User registered successfully"})

}
