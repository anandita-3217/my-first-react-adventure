// Photobooth
import { useState,useEffect } from "react";
import './PhotoBooth.css';
function Photobooth(){
    const [status, setStatus] = useState('');
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

        </div>
    )
}
export default Photobooth;