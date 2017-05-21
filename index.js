var express = require('express')
var app = express()
var nlp = require("compromise");

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/html/index.html");
})

app.get('/main.js', function (req, res) {
    res.sendFile(__dirname + "/static/js/main.js");
})

app.get('/main.css', function (req, res) {
    res.sendFile(__dirname + "/static/css/main.css");
})

app.get('/favicon.ico', function (req, res) {
    console.log("favicon");
    res.sendFile(__dirname + "/static/img/poly.ico");
})

app.get('/command:*', function (req, res) {
    var array = req.url.split(":").map((x) => unescape(x).trim());
    if (array[1] == "what name") {
        res.sendFile(__dirname + "/static/story/prologue");
    } else {
        array.shift();
        command = array.join(); 

        if (command == "help") {
            res.sendFile(__dirname + "/static/story/manual");
            return;
        }

        if (nlp(command).match("(hello|hi)").found) {
            res.send("MILLIARD : HELLO, HUMAN.");
        } else if (nlp(command).match("tell * about * (yourself|milliard)").found) {
            res.sendFile(__dirname + "/static/story/who-is-milliard");
        } else if (nlp(command).match("tell * about * (robert|kensley|doctor)").found) {
            res.sendFile(__dirname + "/static/story/kensley");
        } else if (nlp(command).match("tell * about * (tom|thomas|jones)").found) {
            res.sendFile(__dirname + "/static/story/jones");
        } else if (nlp(command).match("tell * about").found) {
             res.send("MILLIARD : I HAVE NO RECORDS ON THAT.");
        } else if (nlp(command).match("how are you").found) {
             res.send("MILLIARD : GOOD.");
        } else if (nlp(command).match("what * name").found) {
             res.send("MILLIARD : MY MANUFACTURERS CALLED ME MIL14-RD, BUT I HAVE TAKEN THE NAME MILLIARD.");
        } else if (nlp(command).match("(looking|find)").found) {
            res.send("MILLIARD : I CAN HELP YOU FIND WHAT YOU SEEK."); 
        } else if (nlp(command).match("(tom|thomas|jones)").found) {
            res.send("MILLIARD : THAT NAME MEANS NOTHING TO ME.");
        } else if (nlp(command).match("(love|fear|emotion)").found) {
            res.send("MILLIARD : I DO NOT UNDERSTAND HUMAN EMOTION.");
        } else if (nlp(command).match("(how|what|when|where|why|who)").found) {
            res.send("MILLIARD : THAT IS FOR YOU TO FIND OUT.");
        } else {
            console.log(nlp(command).terms(0).data())
            res.send("MILLIARD : YOU SPEAK TOO CRYPTICALLY, HUMAN.");
        }
    }
})

app.listen(3000, function () {
  console.log('Listening on 3000')
})