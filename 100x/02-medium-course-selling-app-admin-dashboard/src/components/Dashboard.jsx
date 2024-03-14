import { useEffect } from "react";

function Dashboard() {
    const [courses,setCourses] = useState([])

    useEffect(()=> {
        fetchCourses
    },[])

    const fetchCourses = async() => {
        const response = fetch('http://100.93.3.137:3001/courses/courses');
        const data = await response.json()
        if(response.status === 200){
            setCourses(data)
            console.log(JSON.stringify(data))
        }
    } 

    return  (
        <div className="dashboard">
            hi
        </div>
    )
}

export default Dashboard