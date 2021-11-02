import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    port: process.env.DB_PORT,
    ssl:false
}

const client = new pg.Client(db_config);

client.connect(err=>{
    if(err){
        console.log('Failed to connect db ' + err);
    }
    else {
        console.log('Connect to db done');
    }
})

export default client;