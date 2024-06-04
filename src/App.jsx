import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './styles.css';
import './Background_toturial_page.css';
import Choice from './Choice';

function App() {
    const [selectedChoice, setSelectedChoice] = useState(0);

    const handleKeyDown = (rotation) => {
        if (rotation === 'up') {
            setSelectedChoice((previousChoice) => (previousChoice - 1 + 4) % 4);
        } else if (rotation === 'down') {
            setSelectedChoice((previousChoice) => (previousChoice + 1) % 4);
        }
    };

    const handleClick = () => {
        alert("Button clicked!");
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
        <div className="background-container">
            <div className="circle-container">
                <Choice index={0} selectedChoice={selectedChoice}>👆</Choice>
                <Choice index={1} selectedChoice={selectedChoice}>🎮</Choice>
                <Choice index={2} selectedChoice={selectedChoice}>🎥</Choice>
                <Choice index={3} selectedChoice={selectedChoice}>🗺️</Choice>
            </div>
            <div className="controls">
                <button onClick={() => handleKeyDown('up')}>Spin left</button>
                <button onClick={() => handleKeyDown('down')}>Spin right</button>
            </div>
            <div className="text-box">
                {getTextForSelectedChoice(selectedChoice)}
            </div>
            <div
                className="circle-button"
                tabIndex="0"
                role="button"
                onClick={handleClick}
            >
                CHOOSE
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
