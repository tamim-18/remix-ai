import React from 'react';

const LoadingWidget: React.FC = () => {
    return (
        <div className="loading flex flex-wrap items-center">
            <style>
                {`:root {
                    --b: #262626;
                    --w: #dcdcd2;
                    --s: 2s; /* change speed */
                }	

                *, *:before, *:after {
                    box-sizing: border-box;
                    transform-style: preserve-3d;
                }

                body {
                    margin: 0;
                    padding: 0;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--b);
                }

                .content {
                    width: 50vmin;
                    height: 50vmin;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    perspective: 1000vmin;
                }

                .bars {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    padding: 6.5vmin 3vmin;
                    animation: mirror1 calc(var(--s) * 2) ease 0s infinite ;
                }

                .bars + .bars {
                    transform: rotate(90deg) rotateX(180deg);
                    animation: mirror2 calc(var(--s) * 2) ease calc(var(--s) / 2) infinite;
                }

                .bar {
                    width: 44vmin;
                    height: 3vmin;
                    margin: 2vmin 0vmin;
                    background: linear-gradient(90deg, #fff0 33%, var(--w) 33% 67%, #fff0 67% 100%);
                    animation: grow var(--s) ease-in-out 0s infinite alternate; 
                    background-size: 300%;
                    background-position-x: -203%;
                }

                @keyframes mirror1 {
                    0%, 47%, 99.99%, 100% { transform: rotate(180deg) rotateX(0deg); }
                    47.01%, 99.98% { transform: rotate(180deg) rotateX(180deg); }
                }

                @keyframes mirror2 {
                    0%, 47%, 99.99%, 100% { transform: rotate(90deg) rotateX(180deg); }
                    47.01%, 99.98% { transform: rotate(90deg) rotateX(0deg); }
                }

                @keyframes grow {
                    0%, 25% { background-position-x: -297%; }
                    45%, 55% { background-position-x: -250%; }
                    75%, 100% { background-position-x: -203%; }
                }

                .bar:nth-child(2) {
                    animation-delay: calc(var(--s) * -0.02);
                }
                .bar:nth-child(3) {
                    animation-delay: calc(var(--s) * -0.04);
                }
                .bar:nth-child(4) {
                    animation-delay: calc(var(--s) * -0.06);
                }
                .bar:nth-child(5) {
                    animation-delay: calc(var(--s) * -0.08);
                }
                .bar:nth-child(6) {
                    animation-delay: calc(var(--s) * -0.1);
                }
                .bar:nth-child(7) {
                    animation-delay: calc(var(--s) * -0.12);
                }

                .bars:nth-child(2) .bar:nth-child(1) {
                    animation-delay: calc(calc(var(--s) * -0.001) - calc(var(--s) / 2));
                }
                .bars:nth-child(2) .bar:nth-child(2) {
                    animation-delay: calc(calc(var(--s) * -0.02) - calc(var(--s) / 2));
                }
                .bars:nth-child(2) .bar:nth-child(3) {
                    animation-delay: calc(calc(var(--s) * -0.04) - calc(var(--s) / 2));
                }
                .bars:nth-child(2) .bar:nth-child(4) {
                    animation-delay: calc(calc(var(--s) * -0.06) - calc(var(--s) / 2));
                }
                .bars:nth-child(2) .bar:nth-child(5) {
                    animation-delay: calc(calc(var(--s) * -0.08) - calc(var(--s) / 2));
                }
                .bars:nth-child(2) .bar:nth-child(6) {
                    animation-delay: calc(calc(var(--s) * -0.1) - calc(var(--s) / 2));
                }
                .bars:nth-child(2) .bar:nth-child(7) {
                    animation-delay: calc(calc(var(--s) * -0.12) - calc(var(--s) / 2));
                }
                .generating-text {
                    color: var(--w);
                    font-size: 50px;
                    font-weight: bold;
                    margin-top: 3vmin;
                    text-align: center;
                }
                `}
            </style>
            <div className="content">
                <div className="bars">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="bars">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            <div className="generating-text">
                Generating...
            </div>
        </div>
    );
};

export default LoadingWidget;