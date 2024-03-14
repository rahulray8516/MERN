import { useEffect , useState} from "react";

function Dashboard() {
    const [courses,setCourses] = useState([])

    useEffect(()=> {
        fetchCourses();
    },[])

    const fetchCourses = async() => {

        try{
                const response = await fetch('http://100.93.3.137:3001/courses/courses',{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json' 
                }
            });
    
            const data = await response.json();
            if(response.status === 200) {
                setCourses(data)
                console.log("Courses Fetched SuccessFully")
                console.log(data)
            }else{
                console.log("Fetching Error")
            }
        }catch(error){
            console.log(error.message)
            }
        }

    return  (
        <div>
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
                    {/* <button onClick>Update</button>
                    <button onClick>Delete</button> */}
                </div>
                ))}
            </div>
        </div>
    )
}


export default Dashboard;