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
    <h4>Courses</h4>`

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