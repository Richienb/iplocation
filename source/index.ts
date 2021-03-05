import ky from "ky-universal"
import isIp from "is-ip"

interface IpApiData {
	ip: string
	city: string
	reserved: boolean
	region: string
	region_code: string
	country: string
	country_code: string
	country_code_iso3: string
	country_capital: string
	country_tld: string
	country_name: string
	continent_code: string
	in_eu: boolean
	postal: string
	latitude: number
	longitude: number
	timezone: string
	utc_offset: string
	country_calling_code: string
	currency: string
	currency_name: string
	languages: string
	country_area: number
	country_population: number
}

declare namespace ipLocation {
	export interface Options {
		userAgent?: string // The User-Agent header to send along. Useful if you receive unexpected 429 Rate Limited errors.
	}

	export interface LocationData {
		latitude: number
		longitude: number
		city: string
		region: {
			name: string
			code: string
		}
		country: {
			name: string
			code: string
			iso3: string
			capital: string
			tld: string
			population: number
			area: number
			callingCode: string
			postalCode: string
			timezone: {
				code: string
				offset: string
			}
			currency: {
				name: string
				code: string
			}
			languages: string[]
		}
		continent: {
			code: string
			inEu: boolean
		}
	}

	export interface ReservedData {
		reserved: boolean
	}

	export type ReturnType = (LocationData & ReservedData) | ReservedData
}

/**
Get ip location information.
@param ip The ipv4 address to get the information for.
@param options An Options object. Optional.
@example
```
const ipLocation = require("iplocation");

(async () => {
	await ipLocation("172.217.167.78", { userAgent: "My Awesome Project (mailto:author@example.org)" });
	//=> { latitude: -33.8591, longitude: 151.2002, region: { name: "New South Wales" ... } ... }
})();
```
*/
async function ipLocation(ip: string, options: ipLocation.Options = {}): Promise<ipLocation.ReturnType> {
	if (typeof ip !== "string" || !isIp.v4(ip)) {
		throw new TypeError(`${typeof ip} '${ip}' is not a valid IPv4 address`)
	}

	const {
		latitude,
		longitude,
		city,
		reserved,
		region,
		region_code,
		country_name,
		country_code,
		country_code_iso3,
		country_capital,
		country_tld,
		country_population,
		country_calling_code,
		continent_code,
		in_eu,
		postal,
		timezone,
		utc_offset,
		currency,
		currency_name,
		languages,
		country_area
	}: IpApiData = await ky(
		`https://ipapi.co/${ip}/json/`,
		{
			headers: {
				"User-Agent": options.userAgent
			}
		}
	).json()

	return reserved ? {
		reserved
	} : {
		latitude,
		longitude,
		city,
		reserved: Boolean(reserved),
		region: {
			name: region,
			code: region_code
		},
		country: {
			name: country_name,
			code: country_code,
			iso3: country_code_iso3,
			capital: country_capital,
			tld: country_tld,
			population: country_population,
			area: country_area,
			callingCode: country_calling_code,
			postalCode: postal,
			timezone: {
				code: timezone,
				offset: utc_offset
			},
			currency: {
				name: currency_name,
				code: currency
			},
			languages: languages ? languages.split(",") : []
		},
		continent: {
			code: continent_code,
			inEu: in_eu
		}
	}
}

export default ipLocation

module.exports = ipLocation
module.exports.default = ipLocation // eslint-disable-line @typescript-eslint/no-unsafe-member-access
