import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
function Dashboard() {
    const [courses,setCourses] = useState([])
    const navigate = useNavigate();


    useEffect(()=> {
        const token = localStorage.getItem('token');
        if(!token){
            alert("Token Empty's")
            navigate('/login')
        }
        const decodedToken  =  decodeToken(token);
        console.log("decodedToken : ", decodedToken)
        if(!decodedToken){
            alert("Invalid Token");
            navigate('/login')
        }
        fetchCourses();
    },[])

    const logout = async () => {
        let token = await localStorage.getItem('token');
        console.log("Logging out "+token);
        localStorage.clear();
        navigate('/login')
    }

     
    const decodeToken = () => {
        try{
           return JSON.parse(atob(localStorage.getItem("token").split('.')[1]))
        }catch (e) {
            console.log(e);
        }
    }

    const fetchCourses = async() => {

        try{
            const response = await fetch('http://100.93.3.137:3001/courses/courses',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json' ,
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
            });
            const data = await response.json();
            if(response.status === 200) {
                setCourses(data)
                console.log("Courses Fetched SuccessFully")
                console.log(data)
            }else{
                console.log("Fetching Error")
                logout()
            }
        }catch(error){
            console.log(error.message)
            }
        }
    const handleViewCourse = async(courseID) => {
        navigate('/courses/'+courseID)
    }
        
    return  (
        <div>
            <Button variant="contained" onClick={logout}>Logout</Button>
            <div>
            {courses.map(course => (
                <div key={course._id}>
                    <h3>{course.courseTitle}</h3>
                    <p>{course.courseDescription}</p>
                    <p>{course.courseID}</p>
                    <img src={course.courseImage} 
                        alt={course.courseTitle} 
                        style={{width :'15vw'}} />
                    <p>Price: {course.coursePrice}</p>
                    <p>Posted by: {course.isPostedby}</p>
                    <p>Purchased by: {course.isPurchasedBy}</p>
                    <Button onClick={()=>handleViewCourse(course.courseID)}>View Course</Button>
                    <Button onClick>Delete</Button>
                </div>
                ))}
            </div>
        </div>
    )
}
export default Dashboard;