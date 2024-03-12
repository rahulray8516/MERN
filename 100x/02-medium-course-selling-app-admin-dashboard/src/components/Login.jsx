import  { useState } from "react";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")

    const handleLogin = () => {
        loginUser()
        console.log(`${userName},${password}`);
    }
    const loginUser = async() =>{
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
            console.log("data : ",data)
            console.log("Response : ",response)
            if(response.status===200){
                 alert("Logged In Successfully")
            }else{
                 alert("Invalid Username or Password");
            }

        }catch(error){
            console.log(error.message)
            alert(error.message)
        }
    }

    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        userName - <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
        <br/>
        password - <input type="password" value={password} onChange={e=> setPassword(e.target.value)}/>
        <button onClick={handleLogin}>Login</button>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;