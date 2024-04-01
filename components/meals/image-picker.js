"use client";

import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState();
  //useRef() is used to connect HTML input tag with a refrence variable imageInput
  const imageInput = useRef();
  const handlePickClick = () => {
    //When we click on the button then we want to actually trigger click event for input tag
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    //below function will be executed once the readAsDataURL() is completed and we will get generated
    //DataUrl through result
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      {/* htmlFor prop is used to connect label to some input */}
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image selected yet!</p>}
          {pickedImage && <Image src={pickedImage} alt="Selected image" fill />}
        </div>
        {/* accept prop is used to check which type of file can be accepted */}
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
