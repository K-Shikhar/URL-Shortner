const dotenv=require("dotenv")
dotenv.config();

const {DBHOST}= process.env;
module.exports={
    DBHOST:DBHOST,
}