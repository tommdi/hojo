import React, {useState} from "react";
import userPool from "../UserPool";
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";




export function SignOut() {

    const [isSignedin, setIsSignedIn] = useState(false)

    var cognitoUser = userPool.getCurrentUser();

    const onSubmit = (event: any) => {
        event.preventDefault();

    if (cognitoUser != null) {
        cognitoUser.signOut();
        setIsSignedIn(true);
    }
    else {
        setIsSignedIn(false)
    }
}

if (isSignedin === true) {
    window.location.reload()
    setIsSignedIn(false);
}
    return (
            <button onClick={onSubmit}>Log out</button>   
        
    )

}   