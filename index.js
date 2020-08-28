const {google} = require('googleapis');
const express = require('express');
var app = express();

app.use('/', async (req, res) => {
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
	const result = await drive.files.get({
		fileId: url,
		fields: 'webContentLink',
		//alt: 'media',
	}).catch(error => {
		res.redirect(302, 'https://njzjz.win/404.html');
	});
	if ( result.data && result.data.webContentLink ){
		const newurl = result.data.webContentLink;
		res.redirect(302, newurl);
	} else {
		res.redirect(302, 'https://njzjz.win/404.html');
	}
})
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
module.exports = app;
