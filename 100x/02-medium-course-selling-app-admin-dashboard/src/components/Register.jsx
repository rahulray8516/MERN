import { useState } from "react";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log(`${firstName}, ${lastName}, ${userName}, ${email},${password}`)
        createUser();
    }
    const createUser = async() => {
        // API call here to create a new user
        try{
            const response = await fetch("http://100.93.3.137:3001/admin/signup",{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    firstName,email,lastName,password,userName
                })
            })

            const data  = await response.json();
            console.log(response)
            console.log("data",data)
            if(response.status === 200){ 
                alert('Registration Successful')
                navigate( "/login" )
            }else{
                alert('Error in Registration');
            }
        }catch(error){
            console.log(error.message)
            alert(error.message)
        }
    }

    return <div>
        <h1>Register to the website</h1>
        <br/>
        Email: <input type="text" onChange={e=>setEmail(e.target.value)} /><br/>
        Username: <input type="text" value={userName} onChange={e=>setUserName(e.target.value)}/>
        <br/><br/>
        First Name: <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} />
        Last Name: <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} />
        <br/><br/>
        Password: <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        Confirm Password: <input type="password" value={""+password} onChange={e=>{if (e.target.value !== password) alert('Passwords do not- Match')}}/>
        <br/><br/>
        <button onClick={handleSubmit} >Submit</button>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;