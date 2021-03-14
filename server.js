//variables for the notetaker 
const fs = require("fs");
const path = require("path");
const express = require("express");
const database = require("./db/db.json")
const app = express();


//port
let PORT = process.env.PORT || 3000;


//express application
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.route("/api/notes")

    .get(function (req, res) {
        res.json(database);
    })

    //new note added to db
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "./db/db.json");
        let createNote = req.body;

        //puts the notes in the correct order with the highest number first
        let aNumber = 99;
        for (let i = 0; i < database.length; i++) {
            let aNote = database[i];

            if (aNote.id > aNumber) {

                aNumber = aNote.id;
            }
        }
        //creates Id numbers for the notes 

        createNote.id = aNumber + 1;
        database.push(createNote)

        //when the note is saves it tells the user the note is not saved
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Note Saved!");
        });
        res.json(createNote);
    });



//html pages for the application
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})
app.get("*", function (req, res) {
    res.sendFile(path.join(_direname, "./public/index.html"))
});


//port listener
app.listen(PORT, () => {
    console.log("Server listening" + PORT)
});