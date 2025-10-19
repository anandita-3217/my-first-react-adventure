// import React, {useState,useEffect} from "react";
// import Webcam from "react-webcam";
// const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user"
// };
// function Camera(){
//     const [cap,setCap] = useState('');
//     const webCamRef = React.useRef(null);
//     const capture = React.useCallback(() =>{
//         const imageSrc = webCamRef.current.getScreenshot();
//         setCap(imageSrc);
//     },[webCamRef]);
//     return(
//         <div>
//         <Webcam audio={false} height={450} width={300}
//         ref={webCamRef} screenshotFormat="image/jpeg" 
//         videoConstraints={videoConstraints} />
//         <button onClick={capture} >Capture!</button>
//         </div>
//     )

// }
// export default Camera;
import WebCam from 'react-webcam';

import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function Camera({ onCapture }) {
    const webCamRef = useRef(null);
    
    const capture = useCallback(() => {
        const imageSrc = webCamRef.current.getScreenshot();
        onCapture(imageSrc); // Send it back to parent!
    }, [webCamRef, onCapture]);
    
    return(
        <div>
            <Webcam 
                audio={false} 
                height={450} 
                width={300}
                ref={webCamRef} 
                screenshotFormat="image/jpeg" 
                videoConstraints={videoConstraints} 
            />
            <button onClick={capture}>Capture!</button>
        </div>
    )
}

export default Camera;