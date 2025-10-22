import React from "react";

const emojis = ["😀", "😎", "🤩", "🥳", "😍", "🤪", "😜", "🔥", "💯", "✨", "❤️", "💜"];

function EmojiSelector({ onSelectEmoji, selectedEmoji }) {
    return (
        <div className="emoji-selector">
            <p className="emoji-label">Pick a vibe:</p>
            <div className="emoji-grid">
                {emojis.map((emoji, index) => (
                    <button
                        key={index}
                        className={`emoji-button ${selectedEmoji === emoji ? 'selected' : ''}`}
                        onClick={() => onSelectEmoji(emoji)}
                    >
                        {emoji}
                    </button>
                ))}
                <button
                    className="emoji-button clear-emoji"
                    onClick={() => onSelectEmoji(null)}
                >
                    ❌
                </button>
            </div>
        </div>
    );
}

export default EmojiSelector;