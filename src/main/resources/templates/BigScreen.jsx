import React, { useEffect, useState } from 'react';
import './styles.css';
import backgroundImage from '../static/mainPicture.webp';

function BigScreen() {
    const host = window.location.hostname;
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`http://${host}:8080/start`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data === 'Process started') {
                        setStarted(true);
                        console.log('Process started');
                    } else if (data === 'Process not started') {
                        console.log('Process not started');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, 1000); // Poll every 1 second

        return () => clearInterval(interval); // Clean up on component unmount
    }, [host]);

    const ChoiceDisplay = ({ icon, description }) => (
        <div className="choice-display">
            <br></br>
            <br></br>
            <div className="choice-description">{description}</div>
        </div>
    );
            //<div className="choice-icon">{icon}</div>

    const routes = [
        { icon: '👆', description: 'Option 👆: Description for choice 1' },
        { icon: '🎮', description: 'Option 🎮: Description for choice 2' },
        { icon: '🎥', description: 'Option 🎥: Description for choice 3' },
        { icon: '🗺️', description: 'Option 🗺️: Description for choice 4' }
    ];

    function DrawQrCode() {
        if (started) {
            return (
                <div>
                    <img className="qr-code" src={`http://${host}:8080/api/qr`} alt="QR Code" />
                </div>
            );
        }
    }

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="qr-page">
                <h1 style={{ color: 'black', zIndex: 100 }}>Loading...</h1>
                <div className="text-box">
                    {routes.map((route, index) => (
                        <ChoiceDisplay key={index} icon={route.icon} description={route.description} />
                    ))}
                </div>
            </div>
            <DrawQrCode />
        </div>
    );
}

export default BigScreen;
