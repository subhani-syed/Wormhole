const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;

// MongoDB
const mongodb = require('mongodb');
const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
console.log("Connected to MongoDB");

client.connect((err)=>{
    if(err){
      console.log("Error connecting to MongoDB",err);
    }
});


app.get("/",(req,res)=>{
    res.send("Hello World!!");
})

app.post("/upload",upload.any(),(req,res)=>{

    const db = client.db("GridFSDB");
    console.log("GridFS DB connected");
    const bucket = new mongodb.GridFSBucket(db);

    const {name,iv,id} =req.body;
    const files_data = req.files;
  
    files_data.forEach((file) => {
        const uploadStream = bucket.openUploadStream(name,{metadata:{
          "iv":iv,
          "file_id" : id,
        }});
        uploadStream.write(file.buffer);
        uploadStream.end();
    
        uploadStream.on('finish', () => {
          console.log("File Uploaded to GridFS");
        });
    
        uploadStream.on('error', (err) => {
          console.log("Error Uploading to GridFS ", err);
        });
      });
    res.send("Uploaded");
});

app.get("/:file_id/:file_key",async (req,res)=>{

    const file_id = req.params.file_id;

    const db = client.db("GridFSDB");
    console.log("DB connected");
    const bucket = new mongodb.GridFSBucket(db);
  
    const result = await db.collection("fs.files").findOne({"metadata.file_id":file_id})
  
    const downloadStream = bucket.openDownloadStream(result._id);
    
    let fileData = Buffer.from('');
  
    downloadStream.on('error', (error) => {
      console.error('Error retrieving file from GridFS:', error);
    });
    
    downloadStream.on('data', (chunk) => {
      fileData = Buffer.concat([fileData,chunk])
    });
  
    downloadStream.on('end', () => {
      const payload = {"name":result.filename,"iv":result.metadata.iv,"blob":fileData};
      res.json(payload);
    });
});

app.listen(PORT,()=>{
    console.log(`Server listenig on http://localhost:${PORT}`);
})