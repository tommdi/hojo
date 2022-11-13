import { useEffect, useState } from "react";
import UserPool from "../UserPool";




export function Jwt(props: any) {
  const [token, setToken] = useState("");

  const poolData = UserPool;
const userPool = poolData

  useEffect(() => {
const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.getSession((err: any, session: any) => {
      if (err) {
        console.log(err);
      } else if (!session.isValid()) {
        console.log("Invalid session.");
        setToken("")
      } else {
        setToken(session.getIdToken().getJwtToken())
        props.JWT(session.getIdToken().getJwtToken())
        console.log(token)
      }
    });
  } else {
    console.log("User not found.");
    setToken("");
  }
}, []);
    return (
        <div></div>
    )
}