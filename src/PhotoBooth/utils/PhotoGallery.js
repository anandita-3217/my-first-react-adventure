import React from "react";
function PhotoGallery({photos,onDelete}){
    if (photos.length === 0){
        return<p className="no-photos-message"> No phot yet!</p> ;  
    } 
    return(
        <div className="photo-gallery">
            {photos.map((photo,index)=>(
                <div className="photo-item" key={index}>
                    <img src={photo} alt={`capture ${index}`}/>
                    <button className="delete-button" onClick={() => onDelete(index)}>🗑️</button>
                </div>
            ))}
        </div>
    );
}
export default PhotoGallery;