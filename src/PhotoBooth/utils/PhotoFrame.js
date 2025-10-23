import React from "react";

const frames = [
    { id: 'none', name: 'None', filter: 'none' },
    { id: 'grayscale', name: 'B&W', filter: 'grayscale(100%)' },
    { id: 'sepia', name: 'Vintage', filter: 'sepia(100%)' },
    { id: 'saturate', name: 'Pop', filter: 'saturate(200%)' },
    { id: 'contrast', name: 'Drama', filter: 'contrast(150%)' },
    { id: 'brightness', name: 'Bright', filter: 'brightness(120%)' },
    { id: 'blur', name: 'Dreamy', filter: 'blur(2px)' },
    { id: 'invert', name: 'Invert', filter: 'invert(100%)' },
    { id: 'hue', name: 'Psycho', filter: 'hue-rotate(180deg)' },
];

function PhotoFrame({ onSelectFrame, selectedFrame }) {
    return (
        <div className="frame-selector">
            <p className="frame-label">Pick a filter:</p>
            <div className="frame-grid">
                {frames.map((frame) => (
                    <button
                        key={frame.id}
                        className={`frame-button ${selectedFrame === frame.id ? 'selected' : ''}`}
                        onClick={() => onSelectFrame(frame.id, frame.filter)}
                    >
                        <div 
                            className="frame-preview"
                            style={{ filter: frame.filter }}
                        >
                            <span>Aa</span>
                        </div>
                        <span className="frame-name">{frame.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PhotoFrame;