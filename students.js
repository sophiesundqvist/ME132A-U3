function filterByLastName(lastname){
    return DATABASE.students.filter(student =>{
        return student.lastName.toLowerCase().includes(lastname)
    })
}



function cretaDiv (firstname, lastname, credits){

        let studentDiv = document.createElement("div")
        studentDiv.classList.add("box")
        studentDiv.innerHTML = `
        <h3>${firstname} ${lastname} (Credits ${credits})</h3>
        <h4>Coruses</h4>`

    return studentDiv
}


// får ut totala antal poäng från  varje studentsCourses, måste kallas i en loop som går igenom varje student för att denna baseras på DATABASE.students[i].courses
function getTotalCredits(courses){

    let studentTotalCredits = 0

        courses.forEach(course =>{
            studentTotalCredits = studentTotalCredits + course.passedCredits
        })

    return studentTotalCredits

}


function setHTML (){
    let lastname = document.getElementById("search").value
    let students = filterByLastName(lastname)
    let wrapper = document.getElementById("result")

    wrapper.innerHTML = ""
    for (let student of students){

        let totalCredit = getTotalCredits(student.courses)
        let studentDiv = cretaDiv(student.firstName, student.lastName, totalCredit)
        wrapper.appendChild(studentDiv)


        let divWithCourses = creatCourseDivs(student.courses)
        studentDiv.appendChild(divWithCourses)


    }

}



function setEventListener (){
    let form = document.getElementById("search-box")
    form.addEventListener("keyup", setHTML)
}

setEventListener()



// skapar en div som  tillsammans innerhåller paragrafer med alla courses 
// behöver blir kallad students[i].courses
function creatCourseDivs(courses){
    let courseContainer = document.createElement("div")
    courseContainer.classList.add("course-result")
    
   
    for (let course of courses){

        let courseTitle = getCourseTitle(course)
        let courseTotalCredit = getCourseTotalCredit(course)

        let courseDiv = document.createElement("div")
        courseDiv.innerHTML = `
        <p> ${courseTitle} </p>
        <p> ${course.started.semester} ${course.started.year} (${course.passedCredits} of ${courseTotalCredit} credits)`

        courseContainer.appendChild(courseDiv)

        changeBackgroundColorPassedCredit(courseDiv, courseTotalCredit, course.passedCredits)

    }

    return courseContainer
}


function getCourseTitle (course){

    for (let databasecourse of DATABASE.courses){
        if (course.courseId == databasecourse.courseId){
            return databasecourse.title
        }
    }
    
}


function getCourseTotalCredit (course){

    for (let databasecourse of DATABASE.courses){
        if (course.courseId == databasecourse.courseId){
            return databasecourse.totalCredits
        }
    }
    
}

function changeBackgroundColorPassedCredit (course, courseTotalCredit, studentPassedCredit){

    if (courseTotalCredit == studentPassedCredit){
        course.classList.add("passed")
    }

}