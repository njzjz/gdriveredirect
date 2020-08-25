const {google} = require('googleapis');
const express = require('express');
var app = express();

app.use('/', async (req, res) => {
	var url = req.originalUrl.replace('/', '');
	if (!url){
		res.redirect(302, "https://njzjz.win/");
		return;
	}

	const oauth2Client = new google.auth.OAuth2(
		'202264815644.apps.googleusercontent.com',
		'X4Z3ca8xfWDb1Voo-F9a7ZxJ',
		''
	);
	oauth2Client.setCredentials({
		refresh_token: process.env.token
	});
	oauth2Client.on('tokens', (tokens) => {
		var access_token = tokens.access_token;
		var redirect_url = `https://www.googleapis.com/drive/v3/files/get?fileId=${url}&alt=media&access_token=${access_token}`;
		res.header('Authorization', 'Bearer '+ access_token);
		res.redirect(302, redirect_url);
	});
});

module.exports = app;
