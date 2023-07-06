const express = require("express");
const app = express();

const PORT = 8000;

app.get("/",(req,res)=>{
    res.send("Hello World!!");
})

app.listen(PORT,()=>{
    console.log(`Server listenig on http://localhost:${PORT}`);
})