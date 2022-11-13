import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import UserPool from "../UserPool";
 

export function Verify (props: any) {
	const [user, setUser] = useState("");
	const [code, setCode] = useState("");

	const navigate = useNavigate();

	var poolData = UserPool;
	
	var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
	var userPool = poolData;
	var userData = {
		Username: user,
		Pool: userPool,
	};


		const onSubmit = (event: any) => {
		event.preventDefault();


	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	cognitoUser.confirmRegistration(code, true, function(err: any, result: any) {
		if (err) {
			alert(err.message || JSON.stringify(err));
			return;
			
		}
		console.log('call result: ' + result);
		navigate("/Login")
	});
}


return (
    <div>
		<h3>Verify user!</h3>
		<p>Chcek you email: </p>
		<form onSubmit={onSubmit}>
			Your username:
			<input 
			value={props.this_user}
			onChange={(event => setUser(event.target.value))}
			></input><br></br>
			Verification code:
			<input
			value={code}
			onChange={(event => setCode(event.target.value))}
			></input>
			<br></br>
			<button type="submit">Verify</button>
		</form>
	</div>
)

}