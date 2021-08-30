import styled from "styled-components";
import React from 'react';
import {useEffect} from "react";

const SuccessDiv = styled.div`
        position: absolute;
        top: 50vh;
        left: 50vw;
        transform:translate(-50%, -50%);
        min-width: 30%;
        min-height: 50vh;
        padding: 5vh;
        background-color: #333138;
        box-shadow:  0 0 40px 15px #FFE81F;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 7vh;

        div {
            font-size: 1.3em;
            color: #fffffa;
        }

        #closeBtn {
            position: absolute;
            top: 10%;
            right: 90%;
        }
`
const Header = styled.header`
    color: #FFE81F;
    font-size: 2em;
`

function SSuccess(props) {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          }) //just to make it scroll back to top once the new list is rendered
    })

    function handleClose() {
        props.toggle();
    }

    return (
        <SuccessDiv>
            <i id="closeBtn" onClick={handleClose} className="fas fa-times"></i>
            <Header>Success!</Header>
            <div>{props.message}</div>
        </SuccessDiv>
    )
}

export default SSuccess
