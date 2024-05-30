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
                    bottom: 100px;
                    right: 100px;
                    z-index: 1000;
                }

                @media (max-width: 991px) {
                    .circle-button {
                        width: 100px;
                        height: 100px;
                        font-size: 20px;
                        bottom: 10px;
                        right: 10px;
                    }
                }
            `}</style>
        </>
    );
}

export default CircleButton;
