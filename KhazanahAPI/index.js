const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./database/Db_Connection'); 
const passport = require("passport");
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const cookieParser = require("cookie-parser");
require('./config/passportSetup');

// app.use(cors());
app.use(express.json());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

//routes
app.use("/auth", require("./routes/jwtAuth")); 
 
app.listen(5000, () => {
    console.log("server started...")
})