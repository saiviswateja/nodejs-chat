import React from 'react';

const SignedinMenu = ({logout})=>{
    return (
        <li onClick={logout}><a href="#">Logout</a></li>
    );
}

export default SignedinMenu;