import GoogleDrive from './googleDrive'
var express = require('express');
var app = express();
const gd = new GoogleDrive({
	client_id: '202264815644.apps.googleusercontent.com',
	client_secret: 'X4Z3ca8xfWDb1Voo-F9a7ZxJ',
	refresh_token: process.env.token
})
app.use('/', function (req, res) {
	var url = req.originalUrl.replace('/', '');
	const result = gd.getMeta(url);
	const newurl = result.webViewLink;
	res.redirect(302, newurl);
})
module.exports = app;
