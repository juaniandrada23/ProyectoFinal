const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors');

const routes = require('./pacientes/pacientesRoute')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'us-cdbr-east-05.cleardb.net',
    port: 3306,
    user: 'b9247a1f5e2338',
    password: '1b503f4e',
    database: 'heroku_5dfa85f905e247b'
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

// routes -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})
app.use('/api', routes)

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})