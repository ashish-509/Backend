const express = require('express')
const app = express()
const port = 4000

require('dotenv').config()

app.get('/', (req, res) => {
  res.send('Nepali ho ni!')
})

app.get('/github', (req, res) => {
    res.send('ashish-509') 
})

app.get('/login', (req, res) => {
    res.send('<h1>Currently you do not have your acocunt. So, please kindly register at KothaKunj<h1/>')
})

app.listen(process.env.PORT, () => {    
  console.log(`Example app listening on port ${port}`)
})