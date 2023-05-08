/* CLUSTER MANAGMENT USING PM2 
To start pm2: pm2 start index.js -i 0
*/

const crypto = require('crypto');

const express = require('express');
const app = express();

app.get("/", (req, res)=>{
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', ()=>{
        res.send("Hi There!");
    }); 
})
app.get("/fast", (req, res)=>{
    res.send("This was fast.");
})

app.listen(3000, ()=>{
    console.log("Server running.");
});
