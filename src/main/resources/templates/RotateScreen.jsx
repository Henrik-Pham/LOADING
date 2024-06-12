import React, { useEffect } from 'react';
import './styles.css';
import rotateImage from './images/rotate_your_screen.png';

const RotateScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="rotate-screen">
            <img src={rotateImage} alt="Roter skjermen din" className="rotate-image" />
        </div>
    );
};

export default RotateScreen;
