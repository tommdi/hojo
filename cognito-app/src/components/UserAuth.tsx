import React, { useEffect, useState } from "react";
import userPool from "../UserPool";
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";


export function UserAuth(props: any) {
    
    const [userInfo, setUserInfo] = useState("");
    var cognitoUser = userPool.getCurrentUser();

    //Herättää funkkarin reloadaamaan
    if(props.spinner === "app") {
        //setTimeout(() => { }, 3000);
        window.location.reload();
    }

    useEffect(()=>{

    if (cognitoUser != null) {
        cognitoUser.getSession(function(err: any, session: any) {
            if (err) {
                alert(err);
                return
            }
            console.log("Validity ", session.isValid())

            cognitoUser?.getUserData(function(err, result: any) {
                if (err) {
                    console.log(err);
                    return
                }
                if (result != undefined) {
                    setUserInfo(result.Username)
                    props.user(result.Username)
                    console.log(result.Username)
                }
                
            })
            
        })

        
    }

    
}, [])

    return (
        <div>
            
        </div>
    )
    
} 
