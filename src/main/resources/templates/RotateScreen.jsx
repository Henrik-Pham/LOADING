import React, { useEffect } from 'react';
import './styles.css';

const RotateScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 4000); // 4 seconds to allow for blinking three times

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="rotate-screen">
            <div className="rotate-message">ROTATE YOUR SCREEN</div>
        </div>
    );
};

export default RotateScreen;
