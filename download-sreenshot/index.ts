import express from 'express';
import cors from 'cors';
import * as path from 'path';
import axios from 'axios';
import puppeteer from 'puppeteer';
import multer from 'multer';

const FormData = require('form-data');

const app = express();
const storage = multer.memoryStorage()
const upload = multer({ storage })

const corsOptions = {
	origin: '*'
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));

app.get('/get-template', (req, res) => {
	res.sendFile(path.resolve(__dirname + `/../card.html`));
});

app.get('/create-screenshot/:number/:person/:secret', async (req, res) => {
	const data = {
		number: req.params.number,
		person: req.params.person,
		secret: req.params.secret
	};

	const templateResponse = await axios.get('http://localhost:8888/get-template');
	let template = templateResponse.data;

	template = template.replace(`{{card-number}}`, data.number);
	template = template.replace(`{{card-person}}`, data.person.toUpperCase());
	template = template.replace(`{{card-secret}}`, data.secret);

	return res.send(template);
});

app.get('/download-card/:number/:person/:secret', async (req, res) => {
	const data = {
		number: req.params.number,
		person: req.params.person,
		secret: req.params.secret
	};

	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto(`http://localhost:8888/create-screenshot/${data.number}/${data.person}/${data.secret}`);
	await page.setViewport({width: 900, height: 400});
	const screenshot = await page.screenshot();
	await browser.close();

	res.set({'Content-Type': 'image/png'})
	res.send(screenshot);
});


app.listen(8888, () => console.log('app listening on port 8888'));