// // // Photobooth
// // import { useState, useEffect } from "react";
// // import './PhotoBooth.css';
// // import Camera from "./utils/Camera.js";
// // import PhotoGallery from "./utils/PhotoGallery.js";
// // import EmojiSelector from "./utils/EmojiSelector.js";

// // function Photobooth(){
// //     const [status, setStatus] = useState('');
// //     const [photos, setPhotos] = useState([]);
// //     const [selectedEmoji, setSelectedEmoji] = useState(null);
    
// //     const handleCapture = (imageSrc) => {
// //         setPhotos([...photos, imageSrc]);
// //     };

// //     const handleDelete = (indexToDelete) => {
// //         setPhotos(photos.filter((_, index) => index !== indexToDelete));
// //     };

// //     const handleSelectEmoji = (emoji) => {
// //         setSelectedEmoji(emoji);
// //     };
    
// //     useEffect(() => {
// //         setStatus("🔧 Under Construction 🔧")
// //     }, []);
    
// //     return(
// //         <div className="photo-booth-container">
// //             <h1 className="photo-booth-title">
// //                 📸 PhotoBooth 📸
// //             </h1>
// //             <p className="photo-booth-subtitle">
// //                 Take cute pics!
// //             </p>
// //             <p className="app-footer">{status}</p>
            
// //             <EmojiSelector 
// //                 onSelectEmoji={handleSelectEmoji} 
// //                 selectedEmoji={selectedEmoji}
// //             />
            
// //             <Camera 
// //                 onCapture={handleCapture} 
// //                 selectedEmoji={selectedEmoji}
// //             />
            
// //             <PhotoGallery photos={photos} onDelete={handleDelete} />
// //         </div>
// //     )
// // }
// // export default Photobooth;

// import { useState, useEffect } from "react";
// import './PhotoBooth.css';
// import Camera from "./utils/Camera.js";
// import PhotoGallery from "./utils/PhotoGallery.js";
// import EmojiSelector from "./utils/EmojiSelector.js";
// import PhotoFrame from "./utils/PhotoFrame.js";

// function Photobooth(){
//     const [status, setStatus] = useState('');
//     const [photos, setPhotos] = useState([]);
//     const [selectedEmoji, setSelectedEmoji] = useState(null);
//     const [selectedFrame, setSelectedFrame] = useState('none');
//     const [selectedFilter, setSelectedFilter] = useState('none');
    
//     const handleCapture = (imageSrc) => {
//         setPhotos([...photos, imageSrc]);
//     };

//     const handleDelete = (indexToDelete) => {
//         setPhotos(photos.filter((_, index) => index !== indexToDelete));
//     };

//     const handleSelectEmoji = (emoji) => {
//         setSelectedEmoji(emoji);
//     };

//     const handleSelectFrame = (frameId, filter) => {
//         setSelectedFrame(frameId);
//         setSelectedFilter(filter);
//     };
    
//     useEffect(() => {
//         setStatus("🔧 Under Construction 🔧")
//     }, []);
    
//     return(
//         <div className="photo-booth-container">
//             <h1 className="photo-booth-title">
//                 📸 PhotoBooth 📸
//             </h1>
//             <p className="photo-booth-subtitle">
//                 Take cute pics!
//             </p>
//             <p className="app-footer">{status}</p>
            
//             <PhotoFrame 
//                 onSelectFrame={handleSelectFrame}
//                 selectedFrame={selectedFrame}
//             />
            
//             <EmojiSelector 
//                 onSelectEmoji={handleSelectEmoji} 
//                 selectedEmoji={selectedEmoji}
//             />
            
//             <Camera 
//                 onCapture={handleCapture} 
//                 selectedEmoji={selectedEmoji}
//                 selectedFilter={selectedFilter}
//             />
            
//             <PhotoGallery photos={photos} onDelete={handleDelete} />
//         </div>
//     )
// }
// export default Photobooth;
import { useState, useEffect, useRef } from "react";
import './PhotoBooth.css';
import Camera from "./utils/Camera.js";
import PhotoGallery from "./utils/PhotoGallery.js";
import EmojiSelector from "./utils/EmojiSelector.js";
import PhotoFrame from "./utils/PhotoFrame.js";
import Controls from "./utils/Controls.js";

function Photobooth(){
    const [status, setStatus] = useState('');
    const [photos, setPhotos] = useState([]);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [selectedFrame, setSelectedFrame] = useState('none');
    const [selectedFilter, setSelectedFilter] = useState('none');
    
    const webCamRef = useRef(null);
    const canvasRef = useRef(null);
    
    const handleCapture = () => {
        const video = webCamRef.current.video;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        if (selectedEmoji) {
            context.font = '100px Arial';
            context.fillText(selectedEmoji, canvas.width - 150, 120);
        }
        
        const imageSrc = canvas.toDataURL('image/jpeg');
        setPhotos([...photos, imageSrc]);
    };

    const handleDelete = (indexToDelete) => {
        setPhotos(photos.filter((_, index) => index !== indexToDelete));
    };

    const handleClearAll = () => {
        if (window.confirm(`Delete all ${photos.length} photos?`)) {
            setPhotos([]);
        }
    };

    const handleDownloadAll = () => {
        photos.forEach((photo, index) => {
            const link = document.createElement('a');
            link.href = photo;
            link.download = `photobooth-${index + 1}.jpg`;
            link.click();
        });
    };

    const handleSelectEmoji = (emoji) => {
        setSelectedEmoji(emoji);
    };

    const handleSelectFrame = (frameId, filter) => {
        setSelectedFrame(frameId);
        setSelectedFilter(filter);
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
            
            <PhotoFrame 
                onSelectFrame={handleSelectFrame}
                selectedFrame={selectedFrame}
            />
            
            <EmojiSelector 
                onSelectEmoji={handleSelectEmoji} 
                selectedEmoji={selectedEmoji}
            />
            
            <Camera 
                selectedEmoji={selectedEmoji}
                selectedFilter={selectedFilter}
                cameraRef={webCamRef}
                canvasRef={canvasRef}
            />
            
            <Controls 
                onCapture={handleCapture}
                onClearAll={handleClearAll}
                onDownloadAll={handleDownloadAll}
                photoCount={photos.length}
            />
            
            <PhotoGallery photos={photos} onDelete={handleDelete} />
        </div>
    )
}
export default Photobooth;