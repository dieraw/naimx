package utils

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"time"
	//"math"
)

func zodiacSign(day, month int) int {
	switch {
	case (month == 1 && day >= 20) || (month == 2 && day <= 18):
		return 2
	case (month == 2 && day >= 19) || (month == 3 && day <= 20):
		return 3
	case (month == 3 && day >= 21) || (month == 4 && day <= 19):
		return 4
	case (month == 4 && day >= 20) || (month == 5 && day <= 20):
		return 5
	case (month == 5 && day >= 21) || (month == 6 && day <= 20):
		return 6
	case (month == 6 && day >= 21) || (month == 7 && day <= 22):
		return 7
	case (month == 7 && day >= 23) || (month == 8 && day <= 22):
		return 8
	case (month == 8 && day >= 23) || (month == 9 && day <= 22):
		return 9
	case (month == 9 && day >= 23) || (month == 10 && day <= 22):
		return 10
	case (month == 10 && day >= 23) || (month == 11 && day <= 21):
		return 11
	case (month == 11 && day >= 22) || (month == 12 && day <= 21):
		return 12
	case (month == 12 && day >= 22) || (month == 1 && day <= 19):
		return 1
	default:
		return 0
	}
}

func EmployeesCompatibility(sing1 int, sing2 int) int {
	compatibilityMatrix := [12][12]int{
		{-1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 1},
		{1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1},
		{1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1},
		{-1, 1, -1, -1, -1, 1, -1, 1, -1, 1, 1, 1},
		{1, -1, -1, -1, -1, 1, 1, 1, 1, -1, 1, 1},
		{1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, -1},
		{1, -1, -1, -1, 1, 1, -1, -1, 1, -1, 1, 1},
		{-1, -1, -1, 1, 1, -1, -1, -1, 1, -1, 1, 1},
		{1, -1, -1, -1, 1, -1, 1, 1, 1, -1, 1, -1},
		{1, 1, -1, 1, -1, 1, -1, -1, -1, -1, 1, 1},
		{1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1},
		{1, -1, -1, 1, 1, -1, 1, 1, -1, 1, 1, -1},
	}
	return compatibilityMatrix[sing1-1][sing2-1]
}

func personalQualities(tenthHouse int, sixthHouse int) int {
	house6 := [12]int{
		3,
		6,
		5,
		10,
		9,
		7,
		5,
		6,
		7,
		6,
		2,
		10,
	}
	house10 := [12]int{
		7,
		3,
		4,
		10,
		7,
		8,
		3,
		5,
		6,
		5,
		1,
		8,
	}
	return house6[sixthHouse-1] + house10[tenthHouse]
}
func TarotCoefficient(date [3]int) {
	number := 0
	for i := 0; i < 3; i++ {
		for date[i] > 0 {
			number += date[i] % 10
			date[i] /= 10
		}
	}
	number %= 22
	//arcana_priority := [22]int{
	//	1, 7, 3, 6, 5, 4, 5, 7, 8, 3, 9, 10, 5, 4, 7, 7, 3, 9, 6, 10, 7, 7,
	//}
}

func GenerateSecret() string {
	bytes := make([]byte, 32)
	_, err := rand.Read(bytes)
	if err != nil {
		fmt.Println("Error generating secret:", err)
		return ""
	}
	return base64.StdEncoding.EncodeToString(bytes)
}

func main() {

	var date_of_birth string
	fmt.Scan(&date_of_birth)
	parsedDate, err := time.Parse("02.01.2006", date_of_birth)
	if err != nil {
		fmt.Println("Error parsing date:", err)
		return
	}
	dateArray := [3]int{
		parsedDate.Day(),
		int(parsedDate.Month()),
		parsedDate.Year(),
	}
	zodiacSignNumber := zodiacSign(dateArray[0], dateArray[1])
	fmt.Print(zodiacSignNumber)

}
