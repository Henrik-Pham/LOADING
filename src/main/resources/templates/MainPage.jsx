import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemInfo from "./components/ItemInfo.jsx";
import {INFO_BOX_CONTENT} from "./infoBoxData.js";

function CircleButton() {
    return (
        <div className="circle-button" tabIndex="0" role="button">
            CHOOSE
        </div>
    );
}

function Choice({ index, selectedChoice, children }) {
    return (
        <div className={`circle-choice choice${index + 1} ${selectedChoice === index ? 'selected' : ''}`}>
            {children}
        </div>
    );
}

function MainPage() {
    const host = window.location.hostname;
    const [selectedChoice, setSelectedChoice] = useState(0);
    const [isBlurred, setIsBlurred] = useState(false);
    const [timerWidth, setTimerWidth] = useState(100);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the QR code URL when the component mounts
        fetch(`http://${host}:8080/api/qr`)
            .then(response => response.json())
            .then(data => setQrCodeUrl(data.qrCodeUrl))
            .catch(error => console.error('Error fetching QR code:', error));
    }, [host]);

    useEffect(() => {
        let interval;
        if (!isBlurred) {
            interval = setInterval(() => {
                setTimerWidth(prevWidth => {
                    const newWidth = prevWidth - (100 / 30); // decrease width over 30 seconds
                    if (newWidth <= 0) {
                        setIsBlurred(true);
                        clearInterval(interval);
                        return 0;
                    }
                    return newWidth;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isBlurred]);

    const handleKeyDown = (rotation) => {
        if (rotation === 'up') {
            setSelectedChoice((previousChoice) => (previousChoice - 1 + 4) % 4);
        } else if (rotation === 'down') {
            setSelectedChoice((previousChoice) => (previousChoice + 1) % 4);
        }
    };

    const handleClick = () => {
        fetch('http://localhost:3001/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ choice: selectedChoice }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Data sent successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const getTextForSelectedChoice = (index) => {
        switch (index) {
            case 0:
                return <ItemInfo {...INFO_BOX_CONTENT[0]}/>;
            case 1:
                return <ItemInfo {...INFO_BOX_CONTENT[1]}/>;
            case 2:
                return 'Option 3: Description for choice 3';
            case 3:
                return 'Option 4: Description for choice 4';
            default:
                return 'Click a button to see the options';
        }
    };

    return (
        <div className={`background-container ${isBlurred ? 'blur' : ''}`}>
            <div className="timer-bar" style={{ width: `${timerWidth}%` }}></div>
            <div className="circle-container">
                <Choice index={0} selectedChoice={selectedChoice}>👆</Choice>
                <Choice index={1} selectedChoice={selectedChoice}>🎮</Choice>
                <Choice index={2} selectedChoice={selectedChoice}>🎥</Choice>
                <Choice index={3} selectedChoice={selectedChoice}>🗺️</Choice>
            </div>
            <div className="controls">
                <button onClick={() => handleKeyDown('up')} disabled={isBlurred}>Spin left</button>
                <button onClick={() => handleKeyDown('down')} disabled={isBlurred}>Spin right</button>
            </div>
            <div className="text-box">
                <div id="qr-container">
                    {qrCodeUrl ? (
                        <img src={qrCodeUrl} alt="QR Code" />
                    ) : (
                        <p>Loading QR code...</p>
                    )}
                        <img src={`http://${host}:8080/api/qr`}/>
                </div>
                {getTextForSelectedChoice(selectedChoice)}
            </div>
            <div
                className="circle-button"
                tabIndex="0"
                role="button"
                onClick={handleClick}
                disabled={isBlurred}
            >
                CHOOSE
            </div>
        </div>
    );
}

export default MainPage;
