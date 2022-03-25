function filterCoursesByTitle(coursetitle){
    return DATABASE.courses.filter(course=>{
        return course.title.toLowerCase().includes(coursetitle)
    })

}


function cretaDiv (title, credits){

    let courseDiv = document.createElement("div")
    courseDiv.classList.add("box")
    courseDiv.innerHTML = `
    <h3>${title} (Credits ${credits})</h3>
    <h4>Students</h4>`

    return courseDiv
}

function setCourseHTML (){
    let courseTitle = document.getElementById("search").value
    let courses = filterCoursesByTitle(courseTitle)
    let wrapper = document.getElementById("result")

    // tömmer wrapper på divar innan loopen körs
    wrapper.innerHTML=""
    for (let course of courses){
        let courseDiv = cretaDiv(course.title, course.totalCredits)
        wrapper.appendChild(courseDiv)
    }
}


// lystnar på knapptryck i sökrutan
function setEventListener (){
    let inputfield = document.getElementById("search")
    inputfield.addEventListener("keyup", setCourseHTML)
}

setEventListener()


// går igenom kurserna som är filtrerade
// returnerar en array genom map som =>
// går sedan igenom DATABASE.students och filtrerar ut dvs returnera en array med de studenter =>
// som stämmer överens med student.courses.find =>
// som sedan stämmer överens med och har samma kurs id som titelns kursid
// 
// functionen returnera en array med så många "celler" som det finns kurser =>
//  i de cellerna är det en array med så många studenter som gått kurserna
function getStudentByCourseID (coursetitle){
    let courses = filterCoursesByTitle(coursetitle) 

    return courses.map(course => {
        return DATABASE.students.filter(student=>{
            return student.courses.find(studentCourse=>{
                return studentCourse.courseId == course.courseId
            })
        })
    })
}