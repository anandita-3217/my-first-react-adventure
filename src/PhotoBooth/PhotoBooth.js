// Photobooth
import React,{ useState,useEffect } from "react";

import './PhotoBooth.css';
import Camera from "./utils/Camera";

function Photobooth(){
    const [status, setStatus] = useState('');
    const [photos,setPhotos] = useState([]);
    const handleCapture = (imageSrc) => {
        setPhotos([...photos,imageSrc]);
    };
    useEffect(() => {
        setStatus("🔧 Under Construction🔧")
    },[]);
    
    return(
        <div className="photo-booth-container">
            <h1 className="photo-booth-title">
                📸 PhotoBooth 📸
            </h1>
            <p className="photo-booth-subtitle">
                Take cute pics!
            </p>
            <p className="app-footer">{status}</p>
            <Camera onCapture =  {handleCapture}/>
            {/* <button className="photo-booth-button" onClick={capture}>Capture Photo</button> */}
            <br/>
            <div className="photo-gallery">
    {photos.length === 0 ? (
        <p>No photos yet! Start snapping! 📸</p>
    ) : (
        photos.map((photo, index) => (
            <img key={index} src={photo} alt={`capture ${index}`} />
        ))
    )}
</div>
        </div>
    )
}
export default Photobooth;