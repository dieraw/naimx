package main

import (
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

func compatibility_with_employees(sing1 int, sing2 int) int {
	constM := [12][12]int{
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
	return constM[sing1-1][sing2-1]
}

func personal_qualities(tenth_house int, sixth_house int) int {
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
	return house6[sixth_house-1] + house10[tenth_house]
}

func main() { //date_of_birth string, 10th_house int, 6th_house int) {

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
	nomber_z_s := zodiacSign(dateArray[0], dateArray[1])
	fmt.Print(nomber_z_s)

}
