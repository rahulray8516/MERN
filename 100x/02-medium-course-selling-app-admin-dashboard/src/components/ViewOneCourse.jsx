import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card, TextField, colors } from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function ViewOneCourse() {
  let courID = useParams()  
  const [courses, setCourses] = useRecoilState(coursesState);
  const [currCourse,setCurrCourse] = useState("")
  const [showUpdate, setShowUpdate] = useState(false);
  const [isUpdate,setIsUpdate] = useState(false)
  const [updateKey,setUpdateKey] = useState(0)
  const navigate = useNavigate();

  useEffect(()=>{
    fetchCourse(courID);
  },[courID,isUpdate])

  const onUpdate = async() => {
      setIsUpdate(!isUpdate)
      console.log("inside onUpdate")
  }

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
    setUpdateKey(prev => prev+1)
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
                    <Button onClick={()=>handleUpdate(course._id)}>Edit</Button>
                    <Button>Delete</Button>
                    
                </div>
                ))}
            </div>
            {showUpdate && <UpdateOneCourse courseID={currCourse} key={updateKey}
            course={courses.find(a => a._id === currCourse)} onUpdate={onUpdate} />}
  </div>
}


function UpdateOneCourse(props){
  console.log("Props : "+ JSON.stringify(props)+Date());
  console.log(props.course.courseTitle);
    const [courseTitle,setTitle] = useState(props.course.courseTitle)
    const [courseDescription,setDescription] = useState(props.course.courseDescription)
    const [courseImage,setImage] = useState(props.course.courseImage)
    const [coursePrice,setPrice] = useState(props.course.coursePrice);

    

    const refeshCheck = () => {
       updateTheCourse()
    }
    //get the data from server and display in for the updtaed course
    const updateTheCourse = async() => {
      try{
          const response = await fetch(`http://100.93.3.137:3001/courses/updateCourse/${props.courseID}`,{
            method:"PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body :JSON.stringify({
              courseTitle,
              courseDescription,
              courseImage,
              coursePrice
            })
          });
          const data = await response.json(); // Await the JSON parsing
    
          if (response.status === 200) { // Corrected to === for comparison
            console.log(data)
            console.log("Data Fetched Successfully");
            props.onUpdate()
          } else {
            console.log('Error In Fetching Data');
          }
        } catch (error) {
          console.log(error.message);
          alert('Error in Fetching Course');
        }
    }

    const viewOneUpdatedCourse = async() =>{
        try {
            const response = await fetch(`http://100.93.3.137:3001/courses/updatedcourse/${props.courseID}`,{
              method : "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
              },
              
            })
            console.log("response is :",response)
            const data = await response.json();
            if(response.status === 200){
              console.log("DATA Updated Succcesssssfuuuuulllly",data)

            }else{
              console.log("viewOneUpdatedCourse data fetching errorr")
            }
        } catch (error) {
          console.log(error)
          console.log(error.message)
        }
    }

    return <div>
        <center>
        <Card variant={"outlined"} style={{'padding':'5%','marginTop':'6%','width':'40%','marginLeft':''}} >

        <h4>Please update the course with Course title</h4> 
        <TextField id="outlined-basic" value={courseTitle} variant="outlined" onChange={e=> setTitle(e.target.value)} /><br/><br/>    
        <TextField value={courseDescription} variant='outlined' onChange={(e)=>{setDescription(e.target.value)}} /><br/><br/>
        <TextField value={courseImage} variant='outlined' onChange={(e)=>{setImage(e.target.value)}} /><br/><br/>
        <TextField value={coursePrice} variant='outlined' onChange={(e)=>{setPrice(e.target.value)}} /><br/><br/>
        <Button onClick={refeshCheck}>Update</Button>
        <br/>
        </Card>
        </center>
    </div>
}
export default ViewOneCourse;

const coursesState = atom({
  key: 'coursesState',
  default: [], 
});