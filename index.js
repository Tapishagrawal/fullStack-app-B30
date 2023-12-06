const express = require("express");
const { connection } = require("./db");
const { usersRouter } = require("./routes/users.route");
const { notesRouter } = require("./routes/notes.route");
require("dotenv").config();
const cors = require("cors");


const app = express();
app.use(cors());

app.use(express.json());
app.use("/users", usersRouter)
app.use("/notes", notesRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`http://localhost:${process.env.port}`)
    }
    catch (error) {
        console.log("Error in connecting Db.")
        console.log(error)
    }
})