import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import UserPool from "../UserPool";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { Verify } from "./Verify";
import { Link } from "react-router-dom";

export function Signup() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");

    var attributeList = [];

var dataEmail = {
	Name: 'email',
	Value: mail,
};

var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);


attributeList.push(attributeEmail);

    const onSubmit = (event: any) => {
        event.preventDefault();
    

    UserPool.signUp(userName, password, [attributeEmail], [], (err, data) => {
        if (err) {
            console.error(err)
        }
        console.log(data)
    });

}


    return (
        <div> <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                ></input>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                <input
                value={mail}
                onChange = {(event => setMail(event.target.value))}
                >
                </input>
                <button type="submit">Signup</button>
            </form>
            <Verify />
            </div>
    )
}