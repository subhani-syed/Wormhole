import { useState } from "react";

const Upload = () =>{

    const [downloadUrl,setDownloadUrl] = useState("");
    const [selectedFile,setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    
    // Encrypting the Blob
    async function encryptblob(blob) {
        let iv = crypto.getRandomValues(new Uint8Array(12));
        let algorithm = {
        name: "AES-GCM",
        iv: iv,
        };

        let key = await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
        );

        let data = await blob.arrayBuffer();

        const result = await crypto.subtle.encrypt(algorithm, key, data);

        let exportedkey = await crypto.subtle.exportKey("jwk", key);

        return [new Blob([result]), iv.toString(), exportedkey];
    }


    const handleUpload = async () =>{
        if(!selectedFile){
            alert("Please select the file")
        }else{
            try{
            // Convert file into blob
            const blob = new Blob([selectedFile], { type: selectedFile.type });
            
            const [enc_blob, iv, k] = await encryptblob(blob);
            
            const key = k.k;

            const file_id = Math.floor((Math.random() * 1000000) + 1);
            
            // Form Data
            const formData = new FormData();
            formData.append("name", selectedFile.name);
            formData.append("file_data", enc_blob);
            formData.append("iv",iv);
            formData.append("id",file_id);
            formData.append("expire_time",Date.now() + 600000); //10 Minutes
            // Handle error here---->
            const data = await fetch("http://localhost:8000/upload",{method:"POST",body:formData});
            console.log(data);
            setDownloadUrl(`http://localhost:1234/${file_id}/${key}`);
            
        }catch(err){
            console.log("Error Uploading the File ",err)
        }
        }
    }

    if(downloadUrl){
        return (<>
            <div>
                <h1>Download Link: {downloadUrl}</h1>
            </div>
        </>)
    };
    
    return (<>
        <h1>Upload your File Here</h1>
        <div>
            <input type="file" onChange={handleFileChange}></input>
            <input type="submit" value="Upload" onClick={handleUpload}></input>
        </div>
    </>)
};

export default Upload;