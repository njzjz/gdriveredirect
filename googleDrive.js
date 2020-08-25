xf = require('xfetch-js')

class GoogleDrive {
	constructor(auth) {
		this.auth = auth
		this.expires = 0
		this._getIdCache = new Map()
	}
	async initializeClient() {
		// any method that do api call must call this beforehand
		if (Date.now() < this.expires) return
		const resp = await xf
			.post('https://www.googleapis.com/oauth2/v4/token', {
				urlencoded: {
					client_id: this.auth.client_id,
					client_secret: this.auth.client_secret,
					refresh_token: this.auth.refresh_token,
					grant_type: 'refresh_token'
				}
			})
			.json()
		this.client = xf.extend({
			baseURI: 'https://www.googleapis.com/drive/v3/',
			headers: {
				Authorization: `Bearer ${resp.access_token}`
			}
		})
		this.expires = Date.now() + 3500 * 1000 // normally, it should expiers after 3600 seconds
	}
	async getMeta(id) {
		await this.initializeClient()
		return this.client
			.get(`files/${id}`, {
				qs: {
					includeItemsFromAllDrives: true,
					supportsAllDrives: true,
					fields: '*'
				}
			})
			.json()
	}
}
module.exports = GoogleDrive
