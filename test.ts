import test from "ava"
import ipLocation from "./source"

test("main", async t => {
	t.deepEqual(await ipLocation("172.217.167.78"), {
		latitude: -33.8591,
		longitude: 151.2002
	})
})
