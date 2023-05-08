/* NODE PERFORMANCE NEHANCEMENT  WITH EXPERIMENTAL WORKERTHREAD

*/

const crypto = require('crypto');
const express = require('express');
const app = express();
const worker = require('webworker-threads').worker;

app.get("/", (req, res)=>{

    const worker = new worker(function(){
        //WORKER THREAD SIDE interface
        // 'this' reprsents thread of local function
        // If we use arrowfunction then 'this' will repreent the thread of OS
        this.onmessage = function(){
            // Simulating a heavy load task
            let counter = 0;
            //1e9 = 10 * 10 ^9
            while(count<1e9){
                counter++;
            }
            // Take the counter calcualated in onmessage and pas it to the application interface
            postMessage(counter);
        }



    });

    // Application side interface
    worker.onmessage = function(message){
        console.log(message.data);
        res.send('Data: ', message.data);
    }

    worker.postMessage();
})
app.get("/fast", (req, res)=>{
    res.send("This was fast.");
})

app.listen(3000, ()=>{
    console.log("Server running.");
});
