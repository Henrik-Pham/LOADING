import React, { useState, useEffect } from 'react';
import './styles.css';
import backgroundImage from './OpenLandscape.png';
import RotateScreen from './RotateScreen';

function InstructionsPage() {
    const [showInstructions, setShowInstructions] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
    const [selectedChoice, setSelectedChoice] = useState(0);

    useEffect(() => {
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        const handleResize = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        checkIfMobile();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    const handleButtonClick = () => {
        alert(`You locked the answer: ${['👆', '🎮', '🎥', '🗺️'][selectedChoice]}`);
    };

    if (!showInstructions && isMobile) {
        return <RotateScreen onComplete={() => setShowInstructions(true)} />;
    }

    if (isMobile && !isLandscape) {
        return (
            <div className="landscape-container">
                <div className="landscape-message">Vennligst vend telefonen til landskap-modus/sidelengs for å spille</div>
            </div>
        );
    }

    return (
        <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="instructions-box">
                <p>Velkommen til spillet! Her er hvordan du spiller:</p>
                <ol>
                    <li>Bruk tastene for å rotere valgene.</li>
                    <li>Trykk på "CHOOSE" knappen for å bekrefte valget ditt.</li>
                    <li>Vent til admin starter spillet for å begynne.</li>
                </ol>
                <p>Ha en fet opplevelse!</p>
            </div>
            <div className="circle-container">
                {['👆', '🎮', '🎥', '🗺️'].map((choice, index) => (
                    <Choice key={index} index={index} selectedChoice={selectedChoice}>
                        {choice}
                    </Choice>
                ))}
            </div>
            <div className="controls">
                <button onClick={() => handleKeyDown('up')}>Left</button>
                <button onClick={() => handleKeyDown('down')}>Right</button>
            </div>
            <CircleButton handleClick={handleButtonClick} isBlurred={false} />
        </div>
    );
}

export default InstructionsPage;
