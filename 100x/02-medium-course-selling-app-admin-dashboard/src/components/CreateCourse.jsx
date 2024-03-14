import { useState } from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [courseID, setCourseID] = useState("")
    const [courseTitle,setCourseTitle] = useState("")
    const [courseDescription,setCourseDescription] = useState("")
    const [courseImage, setCourseImage] = useState("")
    const [coursePrice, setCoursePrice] = useState("")
    const [isPostedby, setIsPostedBy] = useState("")
    const [isPurchasedBy, setIsPurchasedBy] = useState("")

    const handleCreateCourse = () => {
        createCourse();
        console.log("courseID : ",courseID);
    }
    const createCourse = async() =>{
        try{
            const response  = await fetch("http://100.93.3.137:3001/courses/createCourse",{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    courseID,courseTitle,courseDescription,courseImage,
                    coursePrice,isPostedby,isPurchasedBy
                })
            })

            const data = await response.json()
            console.log("response", response)

            if(response.status === 200){
                console.log(data)
            }else{
                alert('Error Creating Course')
            }
        }catch(error){
            console.log(error.message)
            alert("Error in Creating Course")
        }
    }

    const updateCourse = async(id) => {
        try {
            const response = await fetch(`http://100.93.3.137:3001/courses/updateCourse/${id}`,{
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    courseID,courseTitle,courseDescription,courseImage,
                    coursePrice,isPostedby,isPurchasedBy
                })
            })
            const data = await  response.json();
            if(response.status === 200){
                console.log(data);
            }else{
                console.log("failed to updatye")
            }
        } catch (error) {
            console.log(error.message)            
        }
    }

    
    return <div>
        <h1>Create Course Page</h1>      
        courseID: <input type="text" value={courseID} onChange={e => setCourseID(e.target.value)} /><br/>
        courseTitle: <input type="text" value={courseTitle} onChange={e=>setCourseTitle(e.target.value)}/><br/>
        courseDescription: <input type="text" value={courseDescription} onChange={e=>setCourseDescription(e.target.value)}/><br/>
        courseImage: <input type="text" value={courseImage} onChange={e=>setCourseImage(e.target.value)}/><br/>
        coursePrice: <input type="text" value={coursePrice} onChange={e=>setCoursePrice(e.target.value)}/><br/>
        isPostedby: <input type="text" value={isPostedby} onChange={e=>setIsPostedBy(e.target.value)}/><br/>
        isPurchasedBy: <input type="text" value={isPurchasedBy} onChange={e=>setIsPurchasedBy(e.target.value)}/><br/>
        <button onClick={handleCreateCourse}>Create Course</button><br/>
        <div>
        {/* {courses.map(course => (
                    <div key={course._id}>
                        <h3>{course.courseTitle}</h3>
                        <p>{course.courseDescription}</p>
                        <img src={course.courseImage} alt={course.courseTitle} style={{width: '15vw'}} />
                        <p>Price: {course.coursePrice}</p>
                        <p>Posted by: {course.isPostedby}</p>
                        <p>Purchased by: {course.isPurchasedBy}</p>
                        <button onClick>Update</button>
                        <button onClick>Delete</button>
                    </div>
                ))} */}
        </div>
     </div>
}


export default CreateCourse;