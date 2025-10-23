// // Camera.js
// import WebCam from 'react-webcam';

// import React, { useRef, useCallback } from "react";
// import Webcam from "react-webcam";
// import EmojiSelector from './EmojiSelector.js';

// const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user"
// };

// function Camera({ onCapture,selectedEmoji }) {
//     const webCamRef = useRef(null);
    
//     const capture = useCallback(() => {
//         const imageSrc = webCamRef.current.getScreenshot();
//         onCapture(imageSrc); // Send it back to parent!
//     }, [webCamRef, onCapture]);
    
//     return(
//         <div className='camera-container'>
//             <div className='camera-wrapper'>
//                 <Webcam 
//                     audio={false} 
//                     height={450} 
//                     width={300}
//                     ref={webCamRef} 
//                     screenshotFormat="image/jpeg" 
//                     videoConstraints={videoConstraints} 
//                     mirrored = {false}
//                 />
//                 {selectedEmoji && (
//                         <div className="emoji-overlay">
//                             {selectedEmoji}
//                         </div>
//                     )}
//                 <button className='photo-booth-button' onClick={capture}>Capture!</button>
//             </div>
//         </div>
//     )
// }

// export default Camera;
import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function Camera({ onCapture, selectedEmoji, selectedFilter }) {
    const webCamRef = useRef(null);
    const canvasRef = useRef(null);
    
    const capture = useCallback(() => {
        const video = webCamRef.current.video;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Apply filter if selected (we'll do this with CSS on video instead)
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        if (selectedEmoji) {
            context.font = '100px Arial';
            context.fillText(selectedEmoji, canvas.width - 150, 120);
        }
        
        const imageSrc = canvas.toDataURL('image/jpeg');
        onCapture(imageSrc);
    }, [selectedEmoji, onCapture]);
    
    return(
        <div className="camera-container">
            <div className="camera-wrapper">
                <Webcam 
                    audio={false} 
                    height={450} 
                    width={300}
                    ref={webCamRef} 
                    screenshotFormat="image/jpeg" 
                    videoConstraints={videoConstraints}
                    mirrored={false}
                    style={{ filter: selectedFilter }}
                />
                {selectedEmoji && (
                    <div className="emoji-overlay">
                        {selectedEmoji}
                    </div>
                )}
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <button className="capture-button" onClick={capture}>📸 Capture!</button>
        </div>
    )
}

export default Camera;