import React from 'react';
import SResidents from "./Residents.jsx";
import styled from "styled-components";
import { useState } from 'react';
import SSuccess from './success';

let currentResidents = null;

const Planets = ({ data, loginState, className }) => {
    const [seen, setSeenState] = useState(false)
    const [currentResidents, setCurrentResidents] = useState(null)
    const [voted, setVoted] = useState(null)

    function togglePop () {
        setSeenState(!seen);
    }

    function togglePopV() {
        setVoted(null)
    }

    const sendResidents = async (residents) => {
        setSeenState(true)
        setCurrentResidents(null)
        const people = {residents: residents};
        let residentsData;
        await fetch("/people", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(people)
        })
        .then(response => response.json())
        .then(function (data) {residentsData = data})
        // console.log(residentsData);

        setCurrentResidents(residentsData.people)
        console.log("residentsInput: ", residentsData.people)
    }

    async function sendVote(pName) {
       await fetch('/vote', {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({"planetName": pName})
        })
        .then(response => response.text())
        .then((data) => {setVoted(data)})
        // console.log(voted)
        // if(voted) {
        //     console.log("ifvoted")
        // } else {
        //     console.log("voted is false, bibibiiii")
        // }
    }

    // useEffect(()=>{}, [voted])

    const headers = ["Name", "Diameter", "Climate", "Terrain", "Surface Water Percentage", "Population", "Residents", ""];

    return (
        <div className={className}>
            <div className="container">
            {headers.map((headerText, index) => <p key={index}>{headerText}</p>)}
            </div>
            {data.map((planet, index) => {
                return  <div key={index} className="container">
                            <p title="Name: ">{planet.name}</p>
                            <p title="Diameter: ">{planet.diameter === "unknown" ? "unknown" : parseInt(planet.diameter).toLocaleString("en-US") + " km"}</p>
                            <p title="Climate: ">{planet.climate}</p>
                            <p title="Terrain: ">{planet.terrain}</p>
                            <p title="Surface Water: ">{planet.surface_water === "unknown" ? "unknown" : planet.surface_water + "%"}</p>
                            <p title="Population: ">{planet.population === "unknown" ? "unknown" : parseInt(planet.population).toLocaleString("en-US") + " people"}</p>
                            {planet.residents.length > 0 ? <button onClick={(e) => sendResidents(planet.residents)}>{planet.residents.length} Residents</button> : <p>No Known Residents</p>}
                            {loginState ? <button onClick={() => sendVote(planet.name)} className="vote-btn">Vote</button>
                            : <button disabled className="vote-btn tooltip">Vote<span className="tooltipText">Please log in to Vote!</span></button>}
                        </div>
            })}
            {currentResidents && seen ? <SResidents data={currentResidents} toggle={togglePop}/> : null}
            {voted ? <SSuccess message={voted} toggle={togglePopV}></SSuccess> : null}
        </div>
    )
}

const SPlanets = styled(Planets)`
    max-width: 80%;
    min-height: 100vh;
    display: grid;
    grid-auto-flow: row;

    margin: 10vh auto 20vh;

    background-color: #333138;
    border: 5px solid #ff615e;
    box-shadow: 0 0 50px 20px #ff312e;

    .container:first-child {
        font-size: 1.2em;
        font-weight: bold;
        font-family: "Roboto Mono", monospace;
        background-color: #1c1a1f;
        box-shadow: 0 8px 10px #080808;
        border-bottom: none;

    }

    .container:first-child + .container {
        padding-top: 2vh;
    }

    .container:last-child {
        border-bottom: none;
    }

    .container {
        margin: auto;
        
        width: 100%;
        min-height: 15vh;
        display: grid;
        justify-content: space-round;
        grid-auto-flow: column;
        grid-template-columns: repeat(8, 1fr);
        
        border-bottom: 3px solid #515052;

        p {
            text-align: center;
            place-self: center;
            color: #fffffa;
            font-family: "Robot Mono", monospace;
        }

        button {
            place-self: center;
            color: #fffffa;
            background-color: #515052;
            transform: scale(1);
            box-shadow: 0 0 10px #1c1a1f;
            padding: 15px;
            font-weight: 600;
            font-family: "Roboto Mono", monospace;
            border: none;
            transition: all 0.3s;
            cursor: pointer;
            
            &:hover {
                background-color: #ff312e;
                transform: scale(1.1);
                box-shadow: 0 0 10px #ff312e;
            }

        }

        .vote-btn.tooltip {
            position: relative;
            place-self: center;
            opacity: 0.5;
            padding: 15px;
            font-weight: 600;
            font-family: "Roboto Mono", monospace;
            border: none;

            &:hover {
                background-color: #515052;
                transform: scale(1);
                box-shadow: 0 0 10px #1c1a1f;

            }

            &:hover .tooltipText {
                visibility: visible;
            }

            .tooltipText {
                visibility: hidden;
                width: 120px;
                background-color: #1c1a1f;
                color: #fffffa;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                z-index: 1;
                bottom: 150%;
                left: 50%;
                margin-left: -60px;

                &::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #1c1a1f transparent transparent transparent;
                    
                }
            }
        }
    }

    @media screen and (max-width: 1250px) {
        /* padding: 60px;
        margin-left: 15%;
        margin-bottom: 5vh;
        margin-top: 5vh;
        box-sizing: border-box;
        width: 70%; */
        
        .container {
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 2fr 2fr;
            grid-template-columns: 1fr;
            min-height: 5vh;
            padding: 20px 0;
            width: 90%;
            margin-left: 5%;
        

            p {
                margin-block-end: 0;
                margin-block-start: 0;
            }
            p::before {
                content: attr(title);
            }
            button {
                width: 50%;
                padding: 2vh 0;
                margin: 20px 0;
                background-color: #515052ab;
            }
            .vote-btn.tooltip {
                width: 80%;
                background: none;
                box-shadow: none;
                font-size: 2em;
                font-family: 'STARWARS';
                color: #ffe81f;
                text-transform: uppercase;
                padding: 0;
                margin-top: 0;
            
                .tooltipText {
                    position: absolute;
                    left: 50%;
                    bottom: 150%;
                    visibility: hidden;
                    width: 120px;
                    background-color: #1c1a1f;
                    color: #fffffa;
                    text-align: center;
                    font-family: "Roboto Mono", monospace;
                    font-size: 1em;
                    border-radius: 6px;
                    padding: 5px 0;
                    margin-left: -60px;
                    z-index: 1;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        margin-left: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: #1c1a1f transparent transparent transparent;
                        
                    }
                }
            }
        }
        .container:first-child {
                display: none;
        }

    }

`

export default SPlanets
