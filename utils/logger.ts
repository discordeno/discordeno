import { blue, green, red, yellow } from "https://deno.land/std/fmt/colors.ts"

export const getTime = () => {
	const now = new Date()
	const hours = now.getHours()
	const minute = now.getMinutes()

	let hour = hours
	let amOrPm = `AM`
	if (hour > 12) {
		amOrPm = `PM`
		hour = hour - 12
	}

	return `${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`} ${amOrPm}`
}

export const logGreen = (text: string) => {
	console.log(green(`[${getTime()}] => ${text}`))
}

export const logBlue = (text: string) => {
	console.log(blue(`[${getTime()}] => ${text}`))
}

export const logRed = (text: string) => {
	console.log(red(`[${getTime()}] => ${text}`))
}

export const logYellow = (text: string) => {
	console.log(yellow(`[${getTime()}] => ${text}`))
}
