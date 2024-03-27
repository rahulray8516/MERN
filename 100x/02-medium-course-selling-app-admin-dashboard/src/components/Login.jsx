import { useNavigate } from "react-router-dom";
import { Button, Card, TextField } from "@mui/material";
import AppBar from "./Appbar";
import { useRecoilState } from "recoil";
import {varUserName,varPassword} from '../atoms/Atom';

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login(){

    const [userName,setUserName] = useRecoilState(varUserName);
    const [password,setPassword] = useRecoilState(varPassword);
    const navigate = useNavigate();
    const handleLogin = async() => {
        loginUser()
        // console.log(`${userName},${password}`);
    }
    const loginUser = async() => {
        try{
            const response = await fetch("http://100.93.3.137:3001/admin/login",{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json', //headers is super Important 
                },
                body : JSON.stringify({
                    userName,password
                })
            })
            const data  = await response.json()
            console.log(data)         
            if(response.status===200){
                localStorage.setItem('token',data.token)
                alert('Successfully Logged In')
                navigate("/dashboard")
            }else{
                 alert("Invalid Username or Password");
            }
        }catch(error){
            console.log(error.message)
        }
    }

    return <div>
        <br/>
        <AppBar/>
        <center>
        <Card variant={"outlined"} style={{'padding':'5%','marginTop':'6%','width':'40%','marginLeft':''}} >
        <h4>Login to admin dashboard</h4>
        <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e=> setUserName(e.target.value)} /><br/><br/>    
        <TextField type='password' label="Password" variant='outlined' onChange={(e)=>{setPassword(e.target.value)}} /><br/><br/>
        <Button onClick={handleLogin}>Login</Button>
        <br/>
        New here? <Button><a href="/register">Register</a></Button>
        </Card>
        </center>
    </div>
}

export default Login; 
