import constant from '../api/constant';
var express = require('express')
var app = express()
const mysql = require('mysql')

var cors = require('cors')

//const con = mysql.createConnection({
//    host: "localhost",
//    user: "root",
//    password: "password",
//    database: "test_tim"
//})

// config voor database
const pool = mysql.createPool({
    connectionLimit: 100, // important, als er meer dan 100 requests worden gestuurd dan geeft het een error terug
    host: "localhost",
    user: "root",
    password: "password",
    database: "test_tim"
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

function post_db(req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({
                "code": 100, "status": "Error in connection database"
            })
            return
        }
        console.log('connected  as id ' + connection.threadId)

        connection.query("insert into user(username, score) values (branko, 300)", function (err, rows) {
            connection.release()
            if (!err) {
                res.json(rows)
                console.log(rows)
            }
        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in connection database" })
            return
        })
    })

        })
}
function handle_database(req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({
                "code": 100, "status": "Error in connection database" })
            return
        }
        console.log('connected  as id ' + connection.threadId)

        connection.query("select * from question", function (err, rows) {
            connection.release()
            if (!err) {
                res.json(rows)
            }
        })
        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in connection database" })
            return
        })
    })
}

// krijg connectie als de server draait
app.get('/', function (req, res) {
    handle_database(req,res)
})
app.post('/scoreboard', function (req, res) {
    // res.send('POST request to homepage')
    pool.getConnection(function (err, connection) {

        var username = req.body.username
        var score= req.body.score


        var sql = 'INSERT INTO user (username, score) VALUES("TestPost", 1337)'
        connection.query(sql, function (err, result) {
            if (err) {
                res.status(500).send({ error: 'Something failed!' })
            }
            res.json({ 'status': 'succes',result })
        })

    })

})
app.listen(4000)
console.log('Server is running.. on ',{constant})

//// connect met database
//con.connect(function (err) {
//    if (err) throw err;
//    console.log('connected')


//app.get('/get', function (req, res) {
//        let sql = 'SELECT * from question';
//        con.query(sql, function (err, result) {
//            if (err) throw err;
//            console.log(result);
//        })
//    })
//})

    //var server = app.listen(4000, function () {
    //    console.log('server is running..')
    //})
