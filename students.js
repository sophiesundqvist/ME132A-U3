function filterByLastName(lastname){
    return DATABASE.students.filter(student =>{
        return student.lastName.toLowerCase().includes(lastname)
    })
}



function cretaDiv (firstname, lastname, credits){

        let studentDiv = document.createElement("div")
        studentDiv.classList.add("box")
        studentDiv.innerHTML = `
        <h2>${firstname} ${lastname} (Credits ${credits})</h2>
        <h3> Courses </h3>`

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
    let lastname = document.getElementById("search").value.toLowerCase()
    let students = filterByLastName(lastname)
    let wrapper = document.getElementById("result")

    // sorterar studenter efter efternamn
    students.sort(function(a,b){
        if (a.lastName > b.lastName){
            return 1
        }
        if (a.lastName < b.lastName){
            return -1
        }
            return 0
    }) 

    wrapper.innerHTML = ""
    for (let student of students){

        let totalCredit = getTotalCredits(student.courses)
        let studentDiv = cretaDiv(student.firstName, student.lastName, totalCredit)
        wrapper.appendChild(studentDiv)

         
        
        let divWithCourses = creatCourseDivs(student.courses)
        studentDiv.appendChild(divWithCourses)

        studentDiv.addEventListener("click", function(){
            divWithCourses.classList.toggle("course-result")
        })

    }

}

// ge studentdiv ett klickevent
// när man klickar så ska man kalla på en fun

function setEventListener (){
    let form = document.getElementById("search-box")
    form.addEventListener("keyup", setHTML)
}

setEventListener()



// skapar en div som  tillsammans innerhåller paragrafer med alla courses 
// behöver blir kallad students[i].courses
function creatCourseDivs(courses){
    let courseContainer = document.createElement("div")
    courseContainer.classList.add("hidden-course-result")
   

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


function changeTheme(){
    let selector = document.getElementById("select")
    localStorage.setItem("theme", selector.value)

    let body = document.querySelector("body")

    if (selector.value == "dark"){
        body.className = "dark"
    } else {
        body.className = ""
    }
}

function setTheme(){
    let theme = localStorage.getItem("theme")
    let body = document.querySelector("body")

    if (theme == "dark"){
        body.className = "dark"
    } else {
        body.className = ""
    }
}

setTheme()

function addEventListenerToSelector(){
    let selector = document.getElementById("select")

    selector.addEventListener("change", changeTheme)

}

addEventListenerToSelector()