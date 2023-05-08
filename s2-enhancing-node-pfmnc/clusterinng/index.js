// DEMONOSTRATING CLUSTER CONFIGURATION
const cluster = require('cluster');

// If the index.js file being eecuted in cluster mode?
if(cluster.isMaster){
    // Cause the index.js to be eecuted *again* but in child mode
    cluster.fork(); //Child node 1
    cluster.fork(); //Child node 2
    cluster.fork(); //Child node 3
    cluster.fork(); //Child node 4
}else{
    //I am child mode so I will act like a node server nothing else
    const express = require('express');
    const app = express();
    
    function doWork(duration){
        const start = Date.now();
        while(Date.now()-start < duration){}
    }
    app.get("/", (req, res)=>{
        doWork(5000);
        res.send("Hi There!");
    })

    app.get("/fast", (req, res)=>{
        res.send("This was fast.");
    })
    
    app.listen(3000, ()=>{
        console.log("Server running.");
    });
}