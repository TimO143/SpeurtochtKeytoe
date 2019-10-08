var express = require('express')
var app = express()
const mysql = require('mysql')

var cors = require('cors')


// config voor database
const pool = mysql.createPool({
    connectionLimit: 100, // important, als er meer dan 100 connections worden gestuurd dan geeft het een error terug
    host: "localhost",
    user: "root",
    password: "password",
    database: "test_score"
})

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

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

app.get('/getScoreboard', function (req,res) {
    pool.getConnection(function (err, connection){
    
    var sql = "SELECT username, score, date_format(date, '%d/%m/%Y') as date FROM user ORDER BY score DESC"
    connection.query(sql, function (err, result){
        if(err){
            res.send({error: "Something failed in getScoreboard"})
            res.json({err}) }
        else {
            res.json(result)
        }
        connection.release()
        })
    })
})

app.post('/createUserAndScore', function(req, res) {
    pool.getConnection(function (err, connection){
        var id = req.body.id
        var username = req.body.username
        var score = req.body.score
        console.log(req.body)

        var sql = "INSERT INTO user(username, score) values('"+username+"', '"+score+"')" 
        connection.query(sql, function( err,result){
            if (err) {
                res.send({ error: 'Something failed! in POST SCORE USERNAME' })
                 res.json({ err })
                 //res.json({ 'status': 'succes', result, id, username, score })
             }
             else {
                 res.json(result)
             }
             connection.release()
        })
    })
})

app.post('/create', function (req, res) {
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
        console.log(req.body)


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
console.log('Server is running.. on ')

