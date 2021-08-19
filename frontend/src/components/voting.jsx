import React from 'react';
import styled from "styled-components";

const Voting = ({ data, setOuterSeen, className }) => {
    function handleClose() {
        setOuterSeen(false);
    }

    const headers = ["Planet", "Votes"]

    console.log("data from voting", data)

    return (
        <div className={className}>
            <div className="modal_content">
                <h3>Voting Statistics</h3>
                <div className="resData">
                    {headers.map((headerText, index) => <span key={index}>{headerText}</span>)}
                </div>
                 {Object.keys(data).map((key, index) => (
                    <div className="resData" key={index}>
                        <span >{key}</span>  
                        <span >{data[key]}</span>
                    </div>
                    ))
                } 
                <i id="closeBtn" onClick={handleClose} className="fas fa-times"></i>
            </div>
            
        </div>
    )
}

const SVoting = styled(Voting)`
    // display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    min-height: calc(100% + 20vh);
    background-color: #ff312eb9;
    
    .modal_content {
        min-width: 75%;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        padding-top: 5vh;
        
        background-color: #333138;
        border: 5px solid #ff615e;
        /* box-shadow: 0 0 50px 20px #ff312e; */
        
        display: grid;
        grid-auto-flow: row;

        h3 {
            position: absolute;
            top: 5vh;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
            font-family: "STARWARS";
            letter-spacing: 0.05em;
            font-size: 2em;
            color: #FFE81F; 
        }

        .resData:first-of-type {
            margin-top: 5vh;
            font-size: 1.2em;
            font-weight: bold;
            font-family: "Roboto Mono", monospace;
            background-color: #1c1a1f;
            box-shadow: 0 8px 10px #080808;
            border-bottom: none;
        }
        
        .resData:first-of-type + .resData {
            padding-top: 2vh;
        }
        
        .resData:last-of-type {
            border-bottom: none;
            padding-bottom: 2vh;
        }
        
        .resData {
            min-height: 7vh;
            padding: 0 10px;
            border-bottom: 3px solid #515052;

            display: grid;
            justify-content: space-round;
            grid-auto-flow: column;
            grid-template-columns: repeat(8, 1fr);
            span {
                display: block;
                text-align: center;
                place-self: center;
                color: #fffffa;
                font-family: "Robot Mono", monospace;
            }
        }

        #closeBtn {
            position: absolute;
            top: 4vh;
            right: 5vh;
            transform: scale(2.5);
            cursor: pointer;
            transition: transform 0.3s;
            &:hover {
                transform: scale(3);
            }
        }

    }

    @media screen and (max-width: 1250px) {
        .modal_content {
            min-width: 75%;
            position: absolute;
            top: 10vh;
            left: 50%;
            transform: translateX(-50%);
            
            padding-top: 2vh;
            
            background-color: #333138;
            border: 5px solid #ff615e;
            /* box-shadow: 0 0 50px 20px #ff312e; */

            h3 {
                position: absolute;
                top: 5vh;
                left: 30vw;
                margin: 0;
                font-family: "STARWARS";
                letter-spacing: 0.05em;
                font-size: 2em;
                color: #FFE81F; 
            }

        
            .resData {
                min-height: 5vh;
                padding: 20px 0;
                width: 90%;
                margin-left: 5%;
                grid-auto-flow: row;
                grid-template-columns: 1fr;
            

                span {
                    margin-block-end: 0;
                    margin-block-start: 0;
                }
                
                
            }
            .resData:first-of-type {
                display: none;
            }
            
            .resData:first-of-type + .resData {
                margin-top: 5vh;
            }

            #closeBtn {
                left: 62vw;
                top: 4.3vh;
            }
        }
    }

`

export default SVoting

