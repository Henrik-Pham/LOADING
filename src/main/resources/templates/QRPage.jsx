import React from 'react';
import './styles.css';
import backgroundImage from '../static/mainPicture.webp';

function QRPage() {
    return (
        <div className="background-container">
            <img src={backgroundImage} alt="Main background" />
            <div className="qr-page">
                <h1 style={{ color: 'black', zIndex: 100 }}>Loading...</h1>
            </div>
        </div>
    );
}

export default QRPage;