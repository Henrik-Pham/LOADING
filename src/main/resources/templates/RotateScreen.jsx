import React, { useEffect } from 'react';
import './styles.css';
import rotateImage from './images/rotate_your_screen.png'; // Adjust the path as necessary

const RotateScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 6000); // 4 seconds to allow for blinking three times

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="rotate-screen">
            <img src={rotateImage} alt="Rotate Your Screen" className="rotate-image" />
        </div>
    );
};

export default RotateScreen;
