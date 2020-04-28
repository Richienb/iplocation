import test from "ava"
import ipLocation from "./source"

test("main", async t => {
	t.deepEqual(await ipLocation("172.217.167.78"), {
		latitude: -33.8591,
		longitude: 151.2002,
		city: "Sydney",
		reserved: false,
		region: { name: "New South Wales", code: "NSW" },
		country: {
			name: "Australia",
			code: "AU",
			iso3: "AUS",
			capital: "Canberra",
			tld: ".au",
			population: 21515754,
			area: 7686850,
			callingCode: "+61",
			postalCode: "2000",
			timezone: { code: "Australia/Sydney", offset: "+1000" },
			currency: { name: "Dollar", code: "AUD" },
			languages: ["en-AU"]
		},
		continent: { code: "OC", inEu: false }
	})
})
