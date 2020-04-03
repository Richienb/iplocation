import ky from "ky-universal"
import isIp from "is-ip"

declare namespace ipLocation {
	export interface LocationData {
		latitude: number
		longitude: number
	}
}

/**
Get ip location information.
@param ip The ipv4 address to get the information for.
@example
```
const ipLocation = require("ip-location");

(async () => {
	await ipLocation("172.217.167.78")
	//=> { latitude: -33.8591, longitude: 151.2002 }
})()
```
*/
async function ipLocation(ip: string): Promise<ipLocation.LocationData> {
	if (typeof ip !== "string" || !isIp.v4(ip)) {
		throw new TypeError("A valid ipv4 address must be provided!")
	}

	const { latitude, longitude } = await ky(`https://ipapi.co/${ip}/json/`).json()

	return { latitude, longitude }
}

export default ipLocation

module.exports = ipLocation
