const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(ID_USER_UUID){
    const payload = {
    user : ID_USER_UUID
    }

    return jwt.sign(payload, process.env.jwtSecret )
}

module.exports = jwtGenerator;