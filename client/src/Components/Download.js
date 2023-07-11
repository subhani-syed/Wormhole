import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Upload from "./Upload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Download = () =>{
  
    const [fileName,setFileName] = useState("");
    const [file,setFile] = useState(null);
    
    useEffect(()=>{
        searchFile();
    },[]);

    const {file_id,file_key} = useParams();

    function blobToFile(blob, fileName, blobType) {
        const file = new File([blob], fileName, { type: blobType });
        return file;
    }

    // Search file
    const searchFile = async () => {
        try{
          const apiUrl = process.env.REACT_APP_API_URL;
          console.log(apiUrl)
          const data = await fetch(`https://${apiUrl}/${file_id}/${file_key}`);
          const json = await data.json();
          console.log(json);
          if(json.status){
            const bufferData = json.blob;
            const uint8Array = new Uint8Array(bufferData.data);
            const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
    
            const decrpyt_key = {
              "alg":"A256GCM",
              "ext":true,
              "k":file_key,
              "key_ops":["encrypt","decrypt"],
              "kty":"oct"
              }
    
              const dcrpy_blob = await decryptblob(blob, json.iv, decrpyt_key);
              const newFile = blobToFile(dcrpy_blob, json.name, blob.type);
              setFile(newFile);
              setFileName(json.name);
          }
        }catch(err){
          toast("Invalid Link",{
            position: toast.POSITION.TOP_CENTER,
        });
          console.log("Error seraching for file ",err);
        }
    }

    // Download File
    function downloadFile(file) {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    // Decrypt Blob
    async function decryptblob(encblob, ivdata, exportedKey) {
    
        let key = await crypto.subtle.importKey(
          "jwk",
          exportedKey,
          { name: "AES-GCM" },
          true,
          ["encrypt", "decrypt"]
        );
    
        let iv = new Uint8Array(ivdata.split(","));
    
        let algorithm = {
          name: "AES-GCM",
          iv: iv,
        };
    
        let data = await encblob.arrayBuffer();
    
        let decryptedData = await crypto.subtle.decrypt(algorithm, key, data);
    
        return new Blob([decryptedData]);
    }


    const handleDownload = () =>{
        downloadFile(file);
    }

    if(file === null){
      return (<>
      <Upload />
      <ToastContainer />
      </>);
    };

    return (<>
      <div className="bg-[#555555] rounded-[30px] border-4 border-black drop-shadow-[4px_4px_0px_black] m-10 p-10">
        <h1 className="text-4xl">Download your File Here</h1>
        <h3 className="text-2xl">File Name: {fileName}</h3>
        <br></br>
        <button className="bg-[#FFFF00] rounded-[30px] border-4 border-black m-5 p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200" onClick={handleDownload}>Download</button>
      </div>
    </>);
};

export default Download;