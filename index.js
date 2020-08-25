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
	});
	var url = req.originalUrl.replace('/', '');
	if (!url){
		res.redirect(302, "https://njzjz.win/");
		return;
	}
	const result = drive.files.get({
		fileId: url,
		fields: 'webContentLink',
		//alt: 'media',
	});
	result.then(function(res){
		const newurl = res.data.webContentLink;
		res.redirect(302, newurl);
	})
})
module.exports = app;
