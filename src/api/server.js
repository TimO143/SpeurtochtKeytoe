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
    connectionLimit: 100, // important, als er meer dan 100 connections worden gestuurd dan geeft het een error terug
    host: "localhost",
    user: "root",
    password: "password",
    database: "test_tim"
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

//function post_db(req, res) {
//    pool.getConnection(function (err, connection) {
//        if (err) {
//            res.json({
//                "code": 100, "status": "Error in connection database"
//            })
//            return
//        }
//        console.log('connected  as id ' + connection.threadId)

//        connection.query("insert into question(id,question,hint,answer) values (3,q3,h3,a2)", function (err, rows) {
//            connection.release()
//            if (!err) {
//                res.json(rows)
//                console.log(rows)
//            }
//        connection.on('error', function (err) {
//            res.json({ "code": 100, "status": "Error in connection database" })
//            return
//        })
//    })

//})
//}
function handle_database(req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release()
            res.json({
                "code": 100, "status": "Error in connection database" })
            return
        }
        console.log('connected  as id ' + connection.threadId)

        connection.query("select * from question ORDER BY position", function (err, rows) {
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
        var id = req.body.id
        var question = req.body.question
        var hint = req.body.hint
        var answer = req.body.answer
        var position = req.body.position
        //console.log(req)
        console.log(req.body,question)

        var sql = "INSERT INTO question(id,question,hint,answer,position) values ('"+id+"','"+question+"','"+hint+"','"+answer+"','"+position+"')"
        connection.query(sql, function (err, result) {
            if (err) {
               res.send({ error: 'Something failed! in POST' })
                res.json({ err })
                //res.json({ 'status': 'succes', result, id, question, hint, answer })
            }
            else {
                res.json(result)
            }
            connection.release()
            //res.json({ 'status': 'succes', result })
        })
    })
})
app.delete('/delete', function (req, res) {
    pool.getConnection(function (err, connection) {
        var id = req.body.id
        var question = req.body.question
        var hint = req.body.hint
        var answer = req.body.answer
        var position = req.body.position
        //console.log(req)
        console.log(req.body, question)

        var sql = "DELETE FROM question WHERE id='" + id +"'"
        connection.query(sql, function (err, result) {
            if (err) {
                res.send({ error: 'Something failed! in delete' })
                res.json({ err })
                //res.json({ 'status': 'succes', result, id, question, hint, answer })
            }
            else {
                res.json(result)
            }
            connection.release()
            //res.json({ 'status': 'succes', result })
        })
    })
})

app.put('/update', function (req, res) {
    pool.getConnection(function (err, connection) {
        var id = req.body.id
        var question = req.body.question
        var hint = req.body.hint
        var answer = req.body.answer
        var position = req.body.position
        //console.log(req)
        console.log(req.body, question)


        var sql = "UPDATE question SET question='" + question + "',hint='" + hint + "',answer='" + answer + "',position=" + position + " where id=" + id + ""
        connection.query(sql, function (err, result) {
            if (err) {
                res.send({ error: 'Something failed! in PUT' })
                res.json({ err })
                //res.json({ 'status': 'succes', result, id, question, hint, answer })
            }
            else {
                res.json(result)
            }
            connection.release()
            //res.json({ 'status': 'succes', result })
        })
    })
})

app.listen(4000)
console.log('Server is running.. on ',{constant})

