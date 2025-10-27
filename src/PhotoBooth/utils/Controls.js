import React from "react";

function Controls({ onCapture, onClearAll, onDownloadAll, photoCount }) {
    return (
        <div className="controls-container">
            <button 
                className="control-button capture-btn" 
                onClick={onCapture}
            >
                📸 Capture Photo
            </button>
            
            {photoCount > 0 && (
                <>
                    <button 
                        className="control-button download-btn" 
                        onClick={onDownloadAll}
                    >
                        💾 Download All ({photoCount})
                    </button>
                    
                    <button 
                        className="control-button clear-btn" 
                        onClick={onClearAll}
                    >
                        🗑️ Clear All
                    </button>
                </>
            )}
        </div>
    );
}

export default Controls;