import React from 'react';
import styled from "styled-components";
import  { Redirect } from 'react-router-dom'
import { useState } from 'react'

const Login = ({setOuterPageNum, outerPageNum, loginState, className }) => {
    const [redirectPage, setRedirectPage] = useState(null);


    async function sendLoginInfo(e) {
        e.preventDefault()
        const inputs = e.target.querySelectorAll('.input'), values ={};
        
        for(const input of inputs) {
            values[input.name] = input.value
        }

        let redirectURL;

        await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.url).then((data) => {redirectURL = data})

        const splitURL = redirectURL.split('/');

        if(splitURL[splitURL.length -1] === 'login'){
            alert('Wrong username or password.')
        }else {
            setRedirectPage(`/${splitURL[splitURL.length - 1]}`)
            setOuterPageNum(outerPageNum + 1)
            // setOuterPageNum(outerPageNum - 1)
            console.log(`"/${splitURL[splitURL.length - 1]}"`);
            loginState(true)
        }
    }

    return (
        <div className={className}>
            <form onSubmit={sendLoginInfo}>
                <input className="input" type="text" placeholder="email" name="email" required /> 
                <input className="input" type="password" placeholder="password" name="password" required />
                <button className="submit" type="submit">Login</button>
                <div>
                    <p>Don't have an account yet?</p>
                    <a href="/registration">Register</a>
                </div>
            </form>
            {redirectPage ? <Redirect to={redirectPage} />: null}
        </div>
    )
}

const SLogin = styled(Login)`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    form {
        min-width: 30%;
        min-height: 50vh;
        padding: 5vh;
        margin-top: 10vh;
        background-color: #333138;
        box-shadow:  0 0 40px 15px #FFE81F;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 7vh;

        input {
            outline: none;
            border: none;
            background-color: transparent;
            border-bottom: 3px solid #ff312e;
            transition: border-bottom 0.3s;
            font-size: 1.3em;
            font-family: "Roboto Mono", monospace;
            text-align: center;
            padding: 5px;
            color: #FFE81F;

            &::placeholder {
                color: #ff312e;
                transition: color 0.3s;
            }

            &:hover, :focus {
                border-bottom: 3px solid #FFE81F;
                &::placeholder {
                    color: #FFE81F;
                }
            }
        }

        .submit {
            border: 3px solid #FFE81F;
            background-color: #515052;
            color: #fffffa;
            padding: 10px 20px;
            font-size: 1.3em;
            font-weight: bold;
            font-family: "Roboto Mono", monospace;
            transition: border .3s, background-color .3s, transform .3s;
            cursor: pointer;
            
            &:hover {
                background-color: #1c1a1f;
                border: 3px solid #ff312e;
                transform: scale(1.2);
            }

        }
        div {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        div p {
            font-size: 1em;
            color: #fffffa;
        }
        div a {
            font-size: 1.3em;
            text-align: center;
            margin: auto;
        }

    }

`

export default SLogin
