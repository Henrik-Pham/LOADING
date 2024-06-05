// InstructionsPage.jsx
import React, { useState } from 'react';
import './styles.css';
import backgroundImage from './OpenLandscape.png';

function InstructionsPage() {

    const [selectedChoice, setSelectedChoice] = useState(0);

    const handleKeyDown = (rotation) => {
        if (rotation === 'up') {
            setSelectedChoice((previousChoice) => (previousChoice - 1 + 4) % 4);
        } else if (rotation === 'down') {
            setSelectedChoice((previousChoice) => (previousChoice + 1) % 4);
        }
    };

    const Choice = ({ index, selectedChoice, children }) => {
        return (
            <div className={`circle-choice choice${index + 1} ${selectedChoice === index ? 'selected' : ''}`}>
                {children}
            </div>
        );
    };

    const CircleButton = ({ handleClick, isBlurred }) => {
        return (
            <div className={`circle-button ${isBlurred ? 'blurred' : ''}`} tabIndex="0" role="button" onClick={handleClick}>
                CHOOSE
            </div>
        );
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
                <button onClick={() => handleKeyDown('up')}>Spin left</button>
                <button onClick={() => handleKeyDown('down')}>Spin right</button>
            </div>
            <CircleButton handleClick={() => {}} isBlurred={false} />
        </div>
    );
}

export default InstructionsPage;