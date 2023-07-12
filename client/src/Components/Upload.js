import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () =>{

    const [downloadUrl,setDownloadUrl] = useState("");
    const [selectedFile,setSelectedFile] = useState(null);
    const [ttl,setTtl] = useState(600000);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    
    const handleTTLChange = (event) =>{
        setTtl(Number(event.target.value))
    }
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
            formData.append("expire_time",Date.now() + ttl);
            // Handle error here---->
            const apiUrl = process.env.API_URL;
            console.log(apiUrl);
            const clientUrl = process.env.CLIENT_URL;
            console.log(clientUrl);
            const data = await fetch(`https://${apiUrl}/upload`,{method:"POST",body:formData});
            console.log(data);
            setDownloadUrl(`https://${clientUrl}/${file_id}/${key}`);
            
        }catch(err){
            console.log("Error Uploading the File ",err)
        }
        }
    }
    const copyUrl = () =>{
        navigator.clipboard.writeText(downloadUrl);
        toast("Link Copied",{
            position: toast.POSITION.TOP_CENTER,
        });
    }
    if(downloadUrl){
        toast("File Uploaded Successfully",{
            position: toast.POSITION.TOP_CENTER,
        });
        return (<>
            <div className="bg-[#555555] rounded-[30px] border-4 border-black drop-shadow-[4px_4px_0px_black] m-10 p-10">
                <h1 className="text-4xl">Your file is ready to share!</h1>
                <p className="text-xl">Copy the link to share the file</p>
                <input className="bg-gray-100 rounded-[30px] border-4 border-black drop-shadow-[4px_4px_0px_black] p-3" type="text" value={downloadUrl} readOnly size={downloadUrl.length}/>
                <button className="bg-[#FFFF00] rounded-[30px] border-4 border-black mx-5 p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200" onClick={copyUrl}>Copy Link</button>
            </div>
            <ToastContainer/>
        </>)
    };

    return (<>
        <div className="flex bg-[#D9D9D9] rounded-[30px] border-4 border-black drop-shadow-[4px_4px_0px_black] m-10 p-10">
            <div className="bg-[#555555] rounded-[30px] p-10 w-1/2">
                <h1 className="text-3xl">Upload your File Here</h1>
                <div>
                    <input type="file" onChange={handleFileChange} />
                    <button className="bg-[#FFFF00] rounded-[30px] border-4 border-black mx-5 p-5 text-xl hover:drop-shadow-[4px_4px_0px_black] hover:-translate-x-2 hover:-translate-y-1 duration-200 " onClick={handleUpload}>Send File</button>
                    <br></br>
                    <label className="text-2xl">Delete File after: </label>
                    <select className="bg-gray-200 border border-black-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleTTLChange}>
                        <option value="600000" className="">10 Minutes</option>
                        <option value="1800000">30 Minutes</option>
                        <option value="3600000">1 Hour</option>
                        <option value="86400000">24 Hours</option>
                    </select>
                </div>
            </div>
            <div className=" p-10 w-1/2">
                <h1 className="text-4xl">Simple, private file sharing</h1>
                <p className="text-2xl">Wormhole lets you share files with end-to-end encryption and a link that automatically expires. So you can keep what you share private and make sure your stuff doesn't stay online forever.</p>
            </div>
        </div>
    </>)
};

export default Upload;