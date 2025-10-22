// Photobooth
import { useState, useEffect } from "react";
import './PhotoBooth.css';
import Camera from "./utils/Camera.js";
import PhotoGallery from "./utils/PhotoGallery.js";
import EmojiSelector from "./utils/EmojiSelector.js";

function Photobooth(){
    const [status, setStatus] = useState('');
    const [photos, setPhotos] = useState([]);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    
    const handleCapture = (imageSrc) => {
        setPhotos([...photos, imageSrc]);
    };

    const handleDelete = (indexToDelete) => {
        setPhotos(photos.filter((_, index) => index !== indexToDelete));
    };

    const handleSelectEmoji = (emoji) => {
        setSelectedEmoji(emoji);
    };
    
    useEffect(() => {
        setStatus("🔧 Under Construction 🔧")
    }, []);
    
    return(
        <div className="photo-booth-container">
            <h1 className="photo-booth-title">
                📸 PhotoBooth 📸
            </h1>
            <p className="photo-booth-subtitle">
                Take cute pics!
            </p>
            <p className="app-footer">{status}</p>
            
            <EmojiSelector 
                onSelectEmoji={handleSelectEmoji} 
                selectedEmoji={selectedEmoji}
            />
            
            <Camera 
                onCapture={handleCapture} 
                selectedEmoji={selectedEmoji}
            />
            
            <PhotoGallery photos={photos} onDelete={handleDelete} />
        </div>
    )
}
export default Photobooth;