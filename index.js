const express = require ('express')
const bodyParser = require('body-parser')
const app = express()

var port = env.process.PORT || 3000

// Custom modules
const scrape = require('./scrape')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/data', (req, res) => {
    res.redirect('/')
    const {amt, addr } = req.body
    scrape(amt, addr);
})


app.listen(port)

