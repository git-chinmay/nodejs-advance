// RELACING DOWORK FUNCTION TO SIMULATE REALWORLD
process.env.UV_THREADPOOL_SIZE = 1; //This will just restrict the thread count inside the child not on cluster
const cluster = require('cluster');
const crypto = require('crypto');

// If the index.js file being eecuted in cluster mode?
if(cluster.isMaster){
    // Cause the index.js to be eecuted *again* but in child mode
    cluster.fork(); //Child node 1
}else{
    //I am child mode so I will act like a node server nothing else
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
}