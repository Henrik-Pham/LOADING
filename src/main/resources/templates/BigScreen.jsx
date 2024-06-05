import React from 'react';
import { useNavigate } from "react-router-dom";
    import { useEffect, useState } from 'react';

function BigScreen() {

    const host = window.location.hostname;
    //const started = false;




    const [started, setStarted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`http://${host}:8080/start`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify({ action: 'start' }),
            })

                .then(response => response.json())
                .then(data => {
                    if (data === 'Process started') {
                        setStarted(true);
                        console.log('Process started');
                    }else if (data === 'Process not started'){
                        console.log('Process not started');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);

                });
        }, 1000); // Poll every 1 second

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);



    const handleStart = () => {
        if (started) {
            return (
                <div>
                    <img src={`http://${host}:8080/api/qr`}/>
                </div>
            );
        }
    };

    return (
        <div>
            {handleStart()}
        </div>
    );
/*
    const handleStart = () => {

    return (
        <div>
            <img src={`http://${host}:8080/api/qr`}/>
        </div>
    )}

    const showContent = () => {
        switch ("state?") {
            case 'start':
                <img src={`http://${host}:8080/api/qr`}/>;
        }
    }

 */
}

export default BigScreen;

/*

nødløsning
while(!started){
    fetch(hente flagg fra server);
    if (started){
        handleStart();
    }
    sleep(1sec);
}

 */
