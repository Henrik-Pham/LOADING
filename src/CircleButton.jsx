// CircleButton.jsx
import React from 'react';
import './styles.css';

function CircleButton({ handleClick, isBlurred }) {
    return (
        <div
            className="circle-button"
            tabIndex="0"
            role="button"
            onClick={handleClick}
            disabled={isBlurred}
        >
            CHOOSE
        </div>
    );
}

export default CircleButton;
