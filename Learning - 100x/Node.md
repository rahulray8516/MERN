## Code to update the fields which are changed only
    ```javascript
    app.put('/updateCourse/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body; // Assuming the request body contains the updated course information

        // Find the existing course
        const existingCourse = await Course.findById(id);

        if (!existingCourse) {
            return res.status(404).send({ message: "Course not found." });
        }

        // Compare existingCourse with updates and update only the changed fields
        Object.keys(updates).forEach((key) => {
            if (existingCourse[key] !== updates[key]) {
                existingCourse[key] = updates[key];
            }
        });

        // Save the updated course
        const updatedCourse = await existingCourse.save();

        res.status(200).send(updatedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to update course.", error: error.message });
    }
});
  ```

## JWT Auth Token Code

  ```javascript
    const generateJWT = (user) => {
    const payload = user
    console.log("Payload is : ", payload)
    return jwt.sign(payload,secretKey,options)
}

const authenticateJWT = (req, res, next) => {
    // Typically, the token is sent in the Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Bearer schema is expected, so split by space and get the token part
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                // If there's an error during verification, such as token expiration
                return res.sendStatus(403); // Forbidden access
            }

            // If verification is successful, the decoded payload is attached to the request object
            req.user = user;
            next(); // Proceed to the next middleware/route handler
        });
    } else {
        // If the Authorization header is missing, deny access
        res.sendStatus(401); // Unauthorized access
    }
};

```

## How to make a register form with input text
 
    ```javascript
    const [firstName,setFirstName] = useState("")
        const [lastName,setLastName] = useState("")
        const [userName,setUserName] = useState("")
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")

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
            <button onClick={() => console.log(`${firstName}, ${lastName}, ${userName}, ${email},${password}`)} >Submit</button>
            Already a user? <a href="/login">Login</a>
        </div>
    ```

## Code for creating a user by sending request
    ```javascript
    import React, { useState } from "react";

    function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Added state for confirmPassword

    const createUser = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://100.93.3.137:3001/admin/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // This header tells the server to expect JSON
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    userName,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console,log(data)
            if (response.status === 200) {
                // Assuming successful signup redirects to the login page or a confirmation page
                window.location.href = '/login'; // Redirect the user to login page
            } else {
                // Handle server errors or show error messages to the user
                alert(data.message || "An error occurred during registration.");
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return <div>
        <h1>Register to the website</h1>
        {/* Inputs */}
        Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        Username: <input type="text" value={userName} onChange={e => setUserName(e.target.value)} /><br/>
        First Name: <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} /><br/>
        Last Name: <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} /><br/>
        Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        Confirm Password: <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /><br/>
        <button onClick={createUser}>Submit</button>
        Already a user? <a href="/login">Login</a>
    </div>;
    }

    export default Register;
    ```


