import React from 'react';
import { useNavigate } from "react-router-dom";

function BigScreen() {

    const host = window.location.hostname;
    const started = false;

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
