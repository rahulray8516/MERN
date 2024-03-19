import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


function AppBar(){

    const navigate = useNavigate();
    const handleSignup = () =>{
        navigate('/signup')
    }
    const handleLogin = () => {
        navigate('/login')
    }

    return (<div style={{
        display : 'flex',
        justifyContent : 'space-between'
    }}>

    <div>
    <Typography variant="h6">
        Coursera
    </Typography>
    </div>
    <div style={{display:'flex'}}>
    <div>
        <Button onClick={handleSignup}>
            Signup
        </Button>
        <Button onClick={handleLogin}>
            Login
        </Button>
        </div>
    </div>
    </div>)
}

export default AppBar
