// MainPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';
import Choice from './Choice';
import CircleButton from './CircleButton';
import backgroundImage from './images/mainPicture.webp';
import ItemInfo from "./components/items/ItemInfo.jsx";
import {INFO_BOX_CONTENT} from "./data/infoBoxData.js";

function MainPage() {
    const [selectedChoice, setSelectedChoice] = useState(0);
    const [isBlurred, setIsBlurred] = useState(false);
    const [timerWidth, setTimerWidth] = useState(100);
    const navigate = useNavigate();

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
        <div className={`background-container ${isBlurred ? 'blur' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
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
                {getTextForSelectedChoice(selectedChoice)}
            </div>
            <CircleButton handleClick={handleClick} isBlurred={isBlurred} />
        </div>
    );
}

export default MainPage;
