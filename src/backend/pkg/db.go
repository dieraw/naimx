package utils

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

type HR struct {
	ID    uint   `gorm:"primary_key"`
	Name  string `gorm:"not null"`
	Email string `gorm:"unique"`
}
type Team struct {
	ID    uint   `gorm:"primary_key"`
	Title string `gorm:"not null"`
	HR    HR     `gorm:"foreignkey:HRID"`
}
type Finders struct {
	ID        uint   `gorm:"primary_key"`
	Name      string `gorm:"not null"`
	Email     string `gorm:"unique"`
	Team      Team   `gorm:"foreignkey:TeamID"`
	BirthDate string `gorm:"not null"`
	BirthTime string `gorm:"not null"`
}
type Employees struct {
	ID        uint   `gorm:"primary_key"`
	Name      string `gorm:"not null"`
	Email     string `gorm:"unique"`
	Team      Team   `gorm:"foreignkey:TeamID"`
	BirthDate string `gorm:"not null"`
	BirthTime string `gorm:"not null"`
}

var DB *gorm.DB
var err error

func ConnectToDB() {
	dsn := "host=localhost user=postgres password=yourpassword dbname=yourdb port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	fmt.Println("Successfully connected to the database!")

}

func CreateTables() {
	if err := DB.AutoMigrate(&HR{}); err != nil {
		log.Fatal("error:", err.Error())
	}
	DB.Commit()
	if err := DB.AutoMigrate(&Team{}); err != nil {
		log.Fatal("error:", err.Error())
	}
	DB.Commit()
	if err := DB.AutoMigrate(&Finders{}); err != nil {
		log.Fatal("error:", err.Error())
	}
	DB.Commit()

	if err := DB.AutoMigrate(&Employees{}); err != nil {
		log.Fatal("error:", err.Error())
	}
	DB.Commit()
}
func CreateTeam(title string, hr *HR) {
	team := Team{
		Title: title,
		HR:    *hr,
	}
	if err := DB.Create(&team).Error; err != nil {
		log.Fatal("error:", err.Error())
	}
}
func CreateHR(name, email string) {
	hr := HR{
		Name:  name,
		Email: email,
	}
	if err := DB.Create(&hr).Error; err != nil {
		log.Fatal("error:", err.Error())
	}
}
func CreateEmployee(name, email, birthDate, birthTime string, team *Team) {
	employee := Employees{
		Name:      name,
		Email:     email,
		BirthDate: birthDate,
		BirthTime: birthTime,
		Team:      *team,
	}
	if err := DB.Create(&employee).Error; err != nil {
		log.Fatal("error:", err.Error())
	}
}
func CreateFinder(name, email, birthDate, birthTime string, team *Team) {
	finder := Finders{
		Name:      name,
		Email:     email,
		BirthDate: birthDate,
		BirthTime: birthTime,
		Team:      *team,
	}
	if err := DB.Create(&finder).Error; err != nil {
		log.Fatal("error:", err.Error())
	}
}
