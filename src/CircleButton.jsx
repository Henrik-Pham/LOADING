import React from 'react';

function CircleButton() {
    const handleClick = () => {
        alert("Button clicked!");
    };

    return (
        <>
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
                    border: 4px solid rgba(255, 204, 0, 1);
                    background-color: rgba(232, 29, 29, 0.86);
                    color: #fc0;
                    border-radius: 50%;
                    width: 90px;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px auto;
                    padding: 10px;
                    font: 700 17px/129% Inter, -apple-system, Roboto, Helvetica, sans-serif;
                    text-align: center;
                    letter-spacing: -0.41px;
                    cursor: pointer;
                }
                @media (max-width: 991px) {
                    .circle-button {
                        margin-top: 40px;
                        white-space: normal;
                    }
                }
            `}</style>
        </>
    );
}

export default CircleButton;
