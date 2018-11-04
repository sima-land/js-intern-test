package coordinates

import (
	"math"
)

// Sieve counts not prime numbers using Eratosthenes sieve
func Sieve(pos int) (ulamPos int) {
	ulamPos = 0
	if pos > 1 {
		var nums = make([]int, pos + 1)
		nums[0] = 1
		nums[1] = 0
		nums[2] = 1
		for i := 3; i <= pos; i++ {
			if i % 2 > 0 {
				nums[i] = 1
			} else {
				nums[i] = 0
			}
		}
		j := 0
		g := 0
		for k := 3; int(math.Pow(float64(k), 2)) <= pos; k += 2 {
			if nums[k] == 1 {
				for l := int(math.Pow(float64(k), 2)); l <= pos; l += 2 * k {
					nums[l] = 0
					g++
				}
			}
			j++
		}
		println(j + g)
		if nums[pos] == 1 {
			ulamPos = -1
		} else {
			for i := range nums {
				if nums[i] == 0 {
					ulamPos++
				}
			}
		}
	} else {
		ulamPos = pos
	}
	return ulamPos
}

// UlamToCartesian transforms place on modified Ulam spiral to cartesian coordinates
func UlamToCartesian(pos int) (x, y int) {
	closestSqrt := int(math.Floor(math.Sqrt(float64(pos))))
	minOddSqrt := closestSqrt
	if closestSqrt != 0 && closestSqrt % 2 == 0 {
		minOddSqrt = closestSqrt - 1
	}
	if minOddSqrt == 0 {
		x = 0
		y = 0
	} else {
		contourNum := (minOddSqrt + 1) / 2
		minOdd := int(math.Pow(float64(minOddSqrt), float64(2)))
		contourPos := pos - minOdd + 1
		secondCoord := contourPos % contourNum
		if secondCoord == 0 && (pos / contourNum) % 2 == 0 {
			secondCoord = contourNum
		}
		if pos >= minOdd && pos < minOdd + contourNum {
			x = -(contourNum - secondCoord)
			if secondCoord == 0 {
				x = 0
			}
			y = contourNum
		} else if pos >= minOdd + contourNum && pos < minOdd + 2 * contourNum {
			x = secondCoord
			y = contourNum
		} else if pos >= minOdd + 2 * contourNum && pos < minOdd + 3 * contourNum {
			x = contourNum
			y = contourNum - secondCoord
			if secondCoord == 0 {
				y = 0
			}
		} else if pos >= minOdd + 3 * contourNum && pos < minOdd + 4 * contourNum {
			x = contourNum
			y = -secondCoord
		} else if pos >= minOdd + 4 * contourNum && pos < minOdd + 5 * contourNum {
			x = contourNum - secondCoord
			if secondCoord == 0 {
				x = 0
			}
			y = -contourNum
		} else if pos >= minOdd + 5 * contourNum && pos < minOdd + 6 * contourNum {
			x = -secondCoord
			y = -contourNum
		} else if pos >= minOdd + 6 * contourNum && pos < minOdd + 7 * contourNum {
			x = -contourNum
			y = -(contourNum - secondCoord)
			if secondCoord == 0 {
				y = 0
			}
		} else if pos >= minOdd + 7 * contourNum && pos < minOdd + 8 * contourNum {
			x = -contourNum
			y = secondCoord
		}
	}
	return x, y
}
