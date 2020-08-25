const {google} = require('googleapis');
const express = require('express');
var app = express();

app.use('/', (req, res) => {
	const oauth2Client = new google.auth.OAuth2(
		'202264815644.apps.googleusercontent.com',
		'X4Z3ca8xfWDb1Voo-F9a7ZxJ',
		''
	);
	oauth2Client.setCredentials({
		  refresh_token: process.env.token
	});
	const drive = google.drive({
		version: 'v3',
		auth: oauth2Client,
	})
	var url = req.originalUrl.replace('/', '');
	const result = drive.get({
		fileId: url
	});
	//const newurl = result.webViewLink;
	//res.redirect(302, newurl);
	res.send(result);
})
module.exports = app;
