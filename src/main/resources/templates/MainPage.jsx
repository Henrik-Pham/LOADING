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
        setSelectedChoice((previousChoice) =>
            rotation === 'up' ? (previousChoice - 1 + 4) % 4 : (previousChoice + 1) % 4
        );
    };

    const handleClick = () => {
        const voteModel = {
            id: Math.floor(Math.random() * 10000),
            choice: { id: selectedChoice }
        };

        fetch(`http://${host}:8080/api/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: Choice.id}),
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Vote sent successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error sending vote. Please try again.');
            });
    };

    const getTextForSelectedChoice = (index) => {
        const descriptions = [
            'Option 1: Description for choice 1',
            'Option 2: Description for choice 2',
            'Option 3: Description for choice 3',
            'Option 4: Description for choice 4',
        ];
        return descriptions[index] || 'Click a button to see the options';
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
            <div className="text-box">{getTextForSelectedChoice(selectedChoice)}</div>
            <div className="circle-button" tabIndex="0" role="button" onClick={handleClick} disabled={isBlurred}>
                CHOOSE
            </div>
        </div>
    );
}

export default MainPage;
