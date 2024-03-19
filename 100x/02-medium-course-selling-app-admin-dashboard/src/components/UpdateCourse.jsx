
function UpdateCourses(){

    var xhttp = new XMLHttpRequest();
    
    // Get the courses from the  server and update them in the HTML page.
    xhttp.onreadystatechange = function() {
        if (this.readyState ==  4 && this.status == 200) {
            document.getElementById("courses").innerHTML=this.responseText;
        }
    };
    xhttp.open("GET", "update_courses", true);
    xhttp.send();
}
export default UpdateCourses;