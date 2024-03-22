import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card, TextField, colors } from "@mui/material";

function ViewOneCourse() {
  let courID = useParams()  
  const [courses,setCourses] = useState([]);
  const [currCourse,setCurrCourse] = useState("")
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    fetchCourse(courID);
  },[courID])

  const fetchCourse = async(id) => {
    try {
      const response = await fetch(`http://100.93.3.137:3001/courses/courses/${id.courseID}`, {
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

  // const showCourse=()=>{
  //   console.log("Inside showCourse")
  //   console.log("currCourse + ",currCourse)
  // }

  const handleUpdate = (courseID) => {
    setShowUpdate(true)
    setCurrCourse(courseID)
   }

  return <div>
    <div>
        <Button onClick={()=>navigate('/dashboard')}>DashBoard</Button>
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
                    <Button onClick={()=>handleUpdate(course.courseID)}>Edit</Button>
                    {/* <Button onClick={()=>showCourse()}>ShowCourse</Button> */}
                    <Button>Delete</Button>
                    
                </div>
                ))}
            </div>
            {showUpdate && <UpdateOneCourse courseID={currCourse}/> }
  </div>
}


function UpdateOneCourse(props){
  console.log("from updateonecourse "+ JSON.stringify(props));
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [image,setImage] = useState("")
    const [price,setPrice] = useState("");

    //get the data from server and display in for

    const updateTheCourse = async() => {
      try{
        const response = await fetch(`/updateCourse/cs102`,{
            method:"PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body :{
              title,
              description,
              image,
              price
            }
          });
          const data = await response.json(); // Await the JSON parsing
    
          if (response.status === 200) { // Corrected to === for comparison
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
        <center>
        <Card variant={"outlined"} style={{'padding':'5%','marginTop':'6%','width':'40%','marginLeft':''}} >
        <h4>Please update the course with Course title</h4>
        <TextField id="outlined-basic" label="title" variant="outlined" onChange={e=> setTitle(e.target.value)} /><br/><br/>    
        <TextField label="Description" variant='outlined' onChange={(e)=>{setDescription(e.target.value)}} /><br/><br/>
        <TextField label="Image" variant='outlined' onChange={(e)=>{setImage(e.target.value)}} /><br/><br/>
        <TextField label="Price" variant='outlined' onChange={(e)=>{setPrice(e.target.value)}} /><br/><br/>
        <Button onClick={updateTheCourse}>Update</Button>
        <br/>
        </Card>
        </center>
    </div>
}
export default ViewOneCourse;
