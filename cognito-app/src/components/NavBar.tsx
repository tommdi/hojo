import React from "react";
import { Link } from "react-router-dom";
import { SignOut } from "./SignOut";



export function NavBar(props: any) {

    let isLoggedIn;
    if (props.UserName != "") {
        isLoggedIn = <SignOut />
    }
    else {
        isLoggedIn = <Link to='Login'>Login</Link>
    }

    return (
        <div>
            <ul className="navbar-ul">
            <li className="navbar-li"><Link to='/'>home</Link></li>
            <li className="navbar-li"> {isLoggedIn}</li>
            </ul>
        </div>
    )
}