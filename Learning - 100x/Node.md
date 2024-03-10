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

const authenticateJWT = (req,res,next) => {
    const auth = req.headers.authorization
    
    if(auth){
        const token = auth.split(' ')[1]
        jwt.verify(token,secretKey,(err,user) => {
            if(err){
                console.log("Error Occurred at verify token Stage")
                return res.status(403).json({
                    message : "Sorry Token Extraction Issue"
                })
            }
            req.user = user
            next()
        });
    }else{
        res.status(401).json({
            message : "auth header is wrong , please check"
        })
    }
}
```