function filterCoursesByTitle(coursetitle){
    return DATABASE.courses.filter(course=>{
        return course.title.toLowerCase().includes(coursetitle)
    })

}


function cretaDiv (title, credits){

    let courseDiv = document.createElement("div")
    courseDiv.classList.add("box")
    courseDiv.innerHTML = `
    <h3>${title} ( ${credits} Credits )</h3>`

    return courseDiv
}



function setCourseHTML (){
    let courseTitle = document.getElementById("search").value.toLowerCase()
    let courses = filterCoursesByTitle(courseTitle)
    let wrapper = document.getElementById("result")
    
    // sorterar den filtrerade arrayen i bokastavsordning
    courses.sort(function(a,b){
        if (a.title > b.title){
            return 1
        }
        if (a.title < b.title){
            return -1
        }
            return 0
    })  

    
    // tömmer wrapper på divar innan loopen körs
    wrapper.innerHTML=""
    for (let course of courses){
        // får fram diven med kursen
        let courseDiv = cretaDiv(course.title, course.totalCredits)
        wrapper.appendChild(courseDiv)
        
        let button = createButton()
        courseDiv.appendChild(button)

        let buttonHide = hideInfoButton()
        courseDiv.appendChild(buttonHide)
        buttonHide.classList.add("hidden")

        let teacherWrapper = createTeacherWrapper()
        courseDiv.appendChild(teacherWrapper)
        teacherWrapper.classList.add("hidden")

        // får fram diven med ansvarig lärare
        let courseResponsible = getResponsiblieTeacher(course.courseResponsible)
        let responsibleTeacherDiv = createHtmlForResponsibleTeacher(courseResponsible)
        teacherWrapper.appendChild(responsibleTeacherDiv)


        // får fram div med lärare och och rubrik skapa exrea div för att kunna styla bättre i css
        let teachersContainer = document.createElement("div")
        teachersContainer.innerHTML= `<h3>Teachers:</h3>`
        
        let teachers = getCourseTeachers(course.teachers)
        let teachersDivs = createHtmlForTeachers(teachers)
        teacherWrapper.appendChild(teachersContainer)
        
        teachersContainer.appendChild(teachersDivs)


        // får fram divarna med studenterna
        let studentsDivsContainer = document.createElement("div")
        studentsDivsContainer.classList.add("hidden")
        studentsDivsContainer.innerHTML = "<h3> Students: </h3>" 
        courseDiv.appendChild(studentsDivsContainer)

        let students = getStudents(course.courseId)

        let studentDiv = createHtmlWithStudentInfo(students, course.totalCredits)
        studentsDivsContainer.appendChild(studentDiv)

        // knappar för att visa och gömma info
        button.addEventListener("click", function(){
            studentsDivsContainer.classList.toggle("hidden")
            teacherWrapper.classList.toggle("hidden")
            buttonHide.classList.toggle("hidden")
            button.classList.add("hidden")

        })

        buttonHide.addEventListener("click", function(){
            studentsDivsContainer.classList.toggle("hidden")
            teacherWrapper.classList.toggle("hidden")
            buttonHide.classList.toggle("hidden")
            button.classList.toggle("hidden")
        })

    }
}


// lystnar på knapptryck i sökrutan
function setEventListener (){
    let inputfield = document.getElementById("search")
    inputfield.addEventListener("keyup", setCourseHTML)
}

setEventListener()


// fåt fram array med studenter som gått kurs med samma kursID
function getStudents(courseId){
    let students = []

    // gör så studenterna sorteras efter efternamn
    DATABASE.students.sort(function(a,b){
        if (a.lastName > b.lastName){
            return 1
        }
        if (a.lastName < b.lastName){
            return -1
        }
            return 0
    })  

    for (let student of DATABASE.students){
        for (let studentcourse of student.courses){
            if (studentcourse.courseId == courseId){
                let studentInfoPerCourse = {
                    name: student.firstName + " " + student.lastName,
                    passedCredits: studentcourse.passedCredits,
                    startedTermin: studentcourse.started.semester,
                    startedYear: studentcourse.started.year
                    }
                students.push(studentInfoPerCourse)
            }
        }
    }

    return students
}



// skapa html med studentinfon

function createHtmlWithStudentInfo (students , coursecredits){

    let studentDivContainer = document.createElement("div")
    studentDivContainer.classList.add("student-result")

    for (let student of students){
        let studentDiv = document.createElement("div")

        studentDiv.innerHTML = `
        <p> ${student.name} (${student.passedCredits} Credits)</p>
        <p> ${student.startedTermin + " " + student.startedYear}</p>`

        studentDivContainer.appendChild(studentDiv)

        if (student.passedCredits == coursecredits){
            studentDiv.classList.add("passed")
        }
    }
    return studentDivContainer
}



// find teacher responsblie for course based on course id
function getResponsiblieTeacher(courseResponsible){
    return DATABASE.teachers.find(teacher=>{
        return teacher.teacherId === courseResponsible
    })
}



function createHtmlForResponsibleTeacher (teacher){
    let teacherDiv = document.createElement("div")
    teacherDiv.innerHTML = 
    `<h3>Courseresponsible:</h3>
    <p>${teacher.firstName + " " + teacher.lastName} (${teacher.post})</p>`

    return teacherDiv
}



function getCourseTeachers (courseTeaachers){

    return courseTeaachers.map(teacherid =>{
        return DATABASE.teachers.find(teacher=>{
            return teacher.teacherId == teacherid
        })
    })
}


function createHtmlForTeachers (teachers){
    let allTeachersDiv = document.createElement("div")

    for (let teacher of teachers){
        let teacherDiv = document.createElement("div")

        teacherDiv.innerHTML = `
        <p>${teacher.firstName} ${teacher.lastName} ( ${teacher.post})`

        allTeachersDiv.appendChild(teacherDiv)
    }
    return allTeachersDiv
}


function createTeacherWrapper(){
    let teacherWrapper = document.createElement("div")
    teacherWrapper.classList.add("teacher-wrapper")

    return teacherWrapper
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


function createButton(){
    let button = document.createElement("button")
    button.innerHTML = ` Click to view more info`

    return button
}


function hideInfoButton (){
    let button = document.createElement("button")
    button.innerHTML = "Hide info ^"

    return button
}


