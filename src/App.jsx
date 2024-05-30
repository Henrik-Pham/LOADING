import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './styles.css';
import './Background_toturial_page.css';

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
            <style jsx>{`
                .circle-button {
                    background-color: rgba(232, 29, 29, 0.86);
                    color: #000000;
                    border-radius: 50%;
                    width: 150px;
                    height: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                    font: 700 27px/129% Inter, -apple-system, Roboto, Helvetica, sans-serif;
                    text-align: center;
                    letter-spacing: -0.41px;
                    cursor: pointer;

                    position: fixed;
                    bottom: 70px;
                    right: 70px;
                    z-index: 1000;
                }

                .text-box {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(255, 255, 255, 0.8);
                    padding: 20px;
                    border: 2px solid #000;
                    border-radius: 10px;
                    font-size: 24px;
                    text-align: center;
                    width: 300px;
                    transition: background-color 0.3s, color 0.3s;
                }

                @media (max-width: 991px) {
                    .circle-button {
                        width: 100px;
                        height: 100px;
                        font-size: 20px;
                        bottom: 10px;
                        right: 10px;
                    }

                    .text-box {
                        width: 250px;
                        font-size: 20px;
                    }
                }
            `}</style>
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
