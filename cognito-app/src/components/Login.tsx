import React, { useState } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

export function Login(props: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();

    const onSubmit = (event: any) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });
        
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                setUserName("app")
                console.log("onSucces: ", data)
            },
            onFailure: (err) => {
                console.log("onFailure: ", err)
                setUserName("")
            }
          
        }) 


    } 

    if (userName === "app") {
        setTimeout(() => { }, 3000);
        props.onSubmit("app")
        navigate("/")
    }


    return (
        <div className="login"> <h3 className="otsikko">Login</h3>
            <form onSubmit={onSubmit}>
                <input
                    className="login-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                ></input> <br></br>
                <input
                    className="login-input"
                    value={password}
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                ></input> <br></br>
                <button className="login-button" type="submit">Login</button>
            </form>
            <div>Don't have an account please <strong><Link to='Register'>Register account</Link> </strong></div>
        </div>
    )
}