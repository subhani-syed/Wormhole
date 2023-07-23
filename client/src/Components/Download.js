import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Upload from "./Upload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Download = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    searchFile();
  }, []);

  const { file_id, file_key } = useParams();

  function blobToFile(blob, fileName, blobType) {
    const file = new File([blob], fileName, { type: blobType });
    return file;
  }

  // Search file
  const searchFile = async () => {
    toast("Loading...", {
      position: toast.POSITION.TOP_CENTER,
    });
    try {
      const data = await fetch(
        `https://api-wormhole.up.railway.app/${file_id}/${file_key}`
      );
      const json = await data.json();
      console.log(json);
      if (json.status) {
        const bufferData = json.blob;
        const uint8Array = new Uint8Array(bufferData.data);
        const blob = new Blob([uint8Array], {
          type: "application/octet-stream",
        });

        const decrypt_key = {
          alg: "A256GCM",
          ext: true,
          k: file_key,
          key_ops: ["encrypt", "decrypt"],
          kty: "oct",
        };

        const decrypted_blob = await decryptblob(blob, json.iv, decrypt_key);
        const newFile = blobToFile(decrypted_blob, json.name, blob.type);
        setFile(newFile);
        setFileName(json.name);
      }
    } catch (err) {
      toast("Invalid Link", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("Error searching for file ", err);
    }
  };

  // Download File
  function downloadFile(file) {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
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

  const handleDownload = () => {
    downloadFile(file);
  };

  if (file === null) {
    return (
      <>
        <Upload />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div className="bg-gray-800 text-white rounded-lg border-4 border-black shadow-lg m-10 p-10">
        <h1 className="text-4xl font-semibold mb-4">Download Your File Here</h1>
        <h3 className="text-2xl">File Name: {fileName}</h3>
        <br />
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 border border-black m-5"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </>
  );
};

export default Download;