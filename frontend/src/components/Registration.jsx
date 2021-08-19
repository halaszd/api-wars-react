import React from 'react';
import styled from "styled-components";
import  { Redirect } from 'react-router-dom'
import { useState } from 'react';
import SSuccess from './success';

const Registration = ({ className }) => {
    const [redirectPage, setRedirectPage] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)


    async function sendRegistration(e) {
        e.preventDefault()
        const inputs = e.target.querySelectorAll('.input'), values ={};
        
        for(const input of inputs) {
            values[input.name] = input.value
        }
        
        let redirectURL;

        await fetch('http://localhost:3000/registration', {
            method: 'POST',
            // redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.url).then((data) => {redirectURL = data}) //.then(data => console.log(data))

        const splitURL = redirectURL.split('/');

        if(splitURL[splitURL.length -1] === 'registration'){
            alert('Username already exists, please choose another one!')
        }else {

           setTimeout(() => {
               setRedirectPage(`/${splitURL[splitURL.length - 1]}`)
            }, 3000);
            

            setIsSuccess(true)
           // alert('This will redirect after 1 second!')
        }
    }



    return (
        <div className={className}>

            {isSuccess ? <SSuccess message="Successful registration. Log in to continue."></SSuccess> : 
                        <form onSubmit={sendRegistration}>
                        <input className="input" type="text" placeholder="username" name="name" required />
                        <input className="input" type="email" placeholder="email" name="email" required />
                        <input className="input" type="password" placeholder="password" name="password" required />
                        <button className="submit" type="submit" >Register</button>
                    </form>
            }

            {redirectPage ? <Redirect to={redirectPage} />: null}
        </div>
    )
}

const SRegistration = styled(Registration)`
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

    }

`

export default SRegistration