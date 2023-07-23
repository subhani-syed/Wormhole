import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [ttl, setTtl] = useState(600000);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTTLChange = (event) => {
    setTtl(Number(event.target.value));
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

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select the file");
    } else {
      try {
        // Convert file into blob
        const blob = new Blob([selectedFile], { type: selectedFile.type });

        const [enc_blob, iv, k] = await encryptblob(blob);

        const key = k.k;

        const file_id = Math.floor(Math.random() * 1000000 + 1);

        // Form Data
        const formData = new FormData();
        formData.append("name", selectedFile.name);
        formData.append("file_data", enc_blob);
        formData.append("iv", iv);
        formData.append("id", file_id);
        formData.append("expire_time", Date.now() + ttl);
        // Handle error here---->
        const data = await fetch(`https://api-wormhole.up.railway.app/upload`, {
          method: "POST",
          body: formData,
        });
        console.log(data);
        setDownloadUrl(`https://wormhole.up.railway.app/${file_id}/${key}`);
      } catch (err) {
        console.log("Error Uploading the File ", err);
      }
    }
  };
  const copyUrl = () => {
    navigator.clipboard.writeText(downloadUrl);
    toast("Link Copied", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  if (downloadUrl) {
    toast("File Uploaded Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    return (
      <div className="bg-gradient-to-r from-cyan-500 to-blue-800 text-white p-10 rounded-lg shadow-lg m-10">
        <h1 className="text-4xl font-semibold mb-4">
          Your file is ready to share!
        </h1>
        <p className="text-xl">Copy the link to share the file</p>
        <div className="flex items-center mt-4">
          <input
            className="flex-grow rounded-lg p-3 bg-gray-200 text-gray-800 mr-4"
            type="text"
            value={downloadUrl}
            readOnly
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
            onClick={copyUrl}
          >
            Copy Link
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-10">
      <div className="bg-blue-400 text-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Upload Your File Here</h1>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-gray-200 text-gray-800 p-3 rounded-lg w-full"
          />
        </div>
        <div className="flex items-center">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 border border-black"
            onClick={handleUpload}
          >
            Send File
          </button>
          <label className="text-white text-lg ml-4">Delete File after:</label>
          <select
            className="bg-gray-200 text-gray-800 p-3 rounded-lg ml-2"
            onChange={handleTTLChange}
          >
            <option value="600000">10 Minutes</option>
            <option value="1800000">30 Minutes</option>
            <option value="3600000">1 Hour</option>
            <option value="86400000">24 Hours</option>
          </select>
        </div>
      </div>
      <div className="p-10">
        <h1 className="text-4xl font-semibold mb-4">Simple, Private File Sharing</h1>
        <p className="text-lg text-gray-800">
          Wormhole lets you share files with end-to-end encryption and a link
          that automatically expires. So you can keep what you share private and
          make sure your stuff doesn't stay online forever.
        </p>
      </div>
    </div>
  );
};

export default Upload;