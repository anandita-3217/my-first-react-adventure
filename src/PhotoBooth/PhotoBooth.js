// Photobooth
import React,{ useState,useEffect } from "react";
import WebCam from 'react-webcam';
import './PhotoBooth.css';

const videoConstraints={
    width: 1280,
    height: 720,
    facingMode: "user"
};

function Photobooth(){
    const [status, setStatus] = useState('');
    const [cap,setCap] = useState('');
    const weCamRef = React.useRef(null);
    const capture = React.useCallback(()=>{
        const imageSrc = weCamRef.current.getScreenshot();
        setCap(imageSrc);
    }, [weCamRef])
    useEffect(()=>{
        setStatus("🔧 under construction 🔧");
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
            <WebCam
            audio = {false} height ={300}
            ref={weCamRef} screenshotFormat="image/jpeg"
            width = {300} videoConstraints={videoConstraints}
            />
            <button className="photo-booth-button" onClick={capture}>Capture Photo</button>
            <br/>
            {cap && <img src={cap} alt="captured" />}
        </div>
    )
}
export default Photobooth;