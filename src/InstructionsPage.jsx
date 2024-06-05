// InstructionsPage.jsx
import React, { useState } from 'react';
import './styles.css';
import Choice from './Choice';
import CircleButton from './CircleButton';
import backgroundImage from './images/DALL·E 2024-05-24 14.55.20 - A bright, open landscape with majestic mountains in the background. The scene is realistic with natural colors, depicting a serene outdoor environment.webp';


function InstructionsPage() {
    const [selectedChoice, setSelectedChoice] = useState(0);

    const handleKeyDown = (rotation) => {
        if (rotation === 'up') {
            setSelectedChoice((previousChoice) => (previousChoice - 1 + 4) % 4);
        } else if (rotation === 'down') {
            setSelectedChoice((previousChoice) => (previousChoice + 1) % 4);
        }
    };

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="instructions-box">
                <h1>Instruksjoner</h1>
                <p>Velkommen til spillet! Her er hvordan du spiller:</p>
                <ol>
                    <li>Bruk pilknappene for å rotere valgene.</li>
                    <li>Trykk på "CHOOSE" knappen for å bekrefte valget ditt.</li>
                    <li>Vent til admin starter spillet for å begynne.</li>
                </ol>
                <p>Ha en SPA opplevelse!</p>
            </div>
            <div className="circle-container">
                {['👆', '🎮', '🎥', '🗺️'].map((choice, index) => (
                    <Choice key={index} index={index} selectedChoice={selectedChoice}>
                        {choice}
                    </Choice>
                ))}
            </div>
            <div className="controls">
                <button className="controls-buttons" onClick={() => handleKeyDown('up')}>Spin left</button>
                <button className="controls-buttons" onClick={() => handleKeyDown('down')}>Spin right</button>
            </div>
            <CircleButton handleClick={() => {}} isBlurred={false} />
        </div>
    );
}

export default InstructionsPage;
