// src/components/ui/AudioUploader.jsx

import { useState, useRef } from "react";

const AudioUploader = () => {
  const [audioURL, setAudioURL] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white shadow-md rounded-xl w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold">Upload and Play Audio</h2>
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload Audio File
      </button>
      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {audioURL && (
        <audio
          controls
          src={audioURL}
          className="mt-4 w-full rounded-md"
        />
      )}
    </div>
  );
};

export default AudioUploader;