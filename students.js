function filterByLastName (lastname){
    return DATABASE.students.filter(student =>{
     return student.lastName.toLowerCase().includes(lastname)    
    })
}


function createDivWithStudent (firstname, lastname, credits, courses ){
    let div = document.createElement("div")
    div.classList.add("box")

    div.innerHTML = `
        <h3> ${firstname} ${lastname}  ( credtis ${credits} )</h3>
        <h4> Courses </h4>
        <div class= courses-result> ${courses}</div>`

    let result = document.getElementById("result")
    result.appendChild(div)
}





function setFilterdStudent (){
    let lastname = document.getElementById("search").value
    let students = filterByLastName(lastname)

    let result = document.getElementById("result")
    // empty result of divs before every keyup
    result.innerHTML = ""

    
    for(let student of students){
        
        let  studentTotalCredits = 0
        
        studentCourses = getCoursesById(student.courses)
        
        let hej = studentCourses.map(course =>{
            return course.title + course.totalCredits + course.courseId
        })

        // for each student the total passed credit is counted
        credits = student.courses.forEach(course => {
            studentTotalCredits += course.passedCredits
        })
        createDivWithStudent(student.firstName, student.lastName, studentTotalCredits, hej)
    }
}





function setEventListener (){
    let form = document.getElementById("search-box")


    form.addEventListener("keyup", setFilterdStudent)
}

setEventListener()



function getCoursesById (courses){
    return courses.map(studentCourse =>{
        return DATABASE.courses.find(course =>{
            return course.courseId == studentCourse.courseId
        })
    })
}


function createDivWithCourseInfo(title, startdate, passedcredits, totalcredits){

    let div = document.createElement("div")
    div.innerHTML = `
    <p> ${title}</p>
    <p> ${startdate} ( ${passedcredits} / ${totalcredits}</p>
    `
}


// function setDivWithCourseInfo (lastname){
//     let students = filterByLastName(lastname)

//     for (let student of students){
//         studentCourses = getCoursesById(student.courses)
//         console.log(studentCourses)

//         let hej = studentCourses.map(course =>{
//             return course.title
//         })

//         hej.forEach(cours =>{
//             createDivWithCourseInfo(cours, cours , cours, cours)
//         })

//         console.log(hej)

    
//     }
// }




