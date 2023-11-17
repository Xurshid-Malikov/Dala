import React, { useState } from "react";
import Shablon from "../../Assets/img/shablon.png";
import "./Banner.css";

const Banner = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadClick = () => {
    document.getElementById("imageUpload").click();
  };

  return (
    <div className="container">
      <h2>Banner</h2>
      <div className="banner-wrapper">
        <div className="banner-inner">
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the file input
          />
          <div className="box">
            <h3>Rasm Yuklash</h3>
            <button className="btn-file" onClick={handleUploadClick}>
              <img className="Shablon" src={Shablon} alt="" />
            </button>
          </div>
          {file && (
            <ul className="banner-list">
              <li className="banner-item">
                <img className="add-image" src={URL.createObjectURL(file)} alt="Selected" width={588} height={268} />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;