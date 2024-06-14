import React from 'react';
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();
    const host = window.location.hostname;
    const play = {};

    const handleGenerateQR = () => {
        fetch(`http://${host}:8080/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'start' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Start action successful:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleStart = () => {
        fetch('http://localhost:8080/api/admin/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'start' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Start action successful:', data);
                navigate('/main'); // Redirect to the main page
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleNext = () => {
        fetch('http://localhost:8080/api/admin/next', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'next' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Next action successful:', data);
                window.location.reload(); // Reload the main page
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleStop = () => {
        fetch('http://localhost:8080/api/admin/stop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'stop' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Stop action successful:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    function handleSelectPlay() {
        const filename = document.getElementById('filename').value;
        fetch(`http://localhost:8080/api/play/${filename}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                play.fileName = data.fileName;
                if(data.events != null){
                    play.events = data.events.map(event => ({
                        id: event.id,
                        playEventName: event.playEventName,
                        eventDescription: event.eventDescription,
                        choices: event.choices ? event.choices.map(choice => ({
                            id: choice.id,
                            choiceDescription: choice.choiceDescription,
                            nextEvent: choice.nextEvent
                        })) : []
                    }));
                }
            })
            .then(() => {
                console.log('Play action successful:', play);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="admin-container">
            <input type="text" id="filename" placeholder="Play file name"/><button onClick={handleSelectPlay}>Select play</button>
            <button onClick={handleGenerateQR}>Generate and display QRcode</button>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleNext}>Next</button>
            <button onClick={handleStop}>Stop</button>

        </div>
    );
}

export default Admin;
