import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    useEffect(() => {
        // Connect to WebSocket server for real-time updates
        const socket = new WebSocket(`ws://${host}:8080`);

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.action === 'next') {
                window.location.reload(); // Reload the page on 'next' action
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
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

    var math = Math.random()
    const handleClick = () => {
        fetch(`http://${host}:8080/api/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: math }),
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
                return 'Option 1: Description for choice 1';
            case 1:
                return 'Option 2: Description for choice 2';
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
                <button onClick={() => handleKeyDown('up')} disabled={isBlurred}>Left</button>
                <button onClick={() => handleKeyDown('down')} disabled={isBlurred}>Right</button>
            </div>
            <div className="instructions-box">{getTextForSelectedChoice(selectedChoice)}</div>
            <div className="circle-button" tabIndex="0" role="button" onClick={handleClick} disabled={isBlurred}>
                CHOOSE
            </div>
        </div>
    );
}

export default MainPage;
