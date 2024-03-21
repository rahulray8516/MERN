import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import AppBar from "./Appbar";
function UpdateCourses() {

  let courseID = useParams();
  
  const [courses,setCourses] = useState([]);

  useEffect(()=>{
    console.log(courseID)
    fetchCourse();
  },[])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`http://100.93.3.137:3001/courses/courses/${courseID}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
      });
      const data = await response.json(); // Await the JSON parsing

      if (response.status === 200) { // Corrected to === for comparison
        setCourses(data);
        console.log(data)
        console.log("Data Fetched Successfully");
      } else {
        console.log('Error In Fetching Data');
      }
    } catch (error) {
      console.log(error.message);
      alert('Error in Fetching Course');
    }
  }

  return <div>
    <div>
        <AppBar/>
    </div>
     <div>
            {courses.map(course => (
                <div key={course._id}>
                    <h3>{course.courseTitle}</h3>
                    <p>{course.courseDescription}</p>
                    <img src={course.courseImage} 
                        alt={course.courseTitle} 
                        style={{width: '15vw'}} />
                    <p>Price: {course.coursePrice}</p>
                    <p>Posted by: {course.isPostedby}</p>
                    <p>Purchased by: {course.isPurchasedBy}</p>
                    <Button onClick>Update</Button>
                    <Button onClick>Delete</Button>
                </div>
                ))}
            </div>
  </div>
}

export default UpdateCourses;
