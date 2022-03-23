function filterByLastName (lastname){
    return DATABASE.students.filter(student =>{
     return student.lastName.toLowerCase().includes(lastname)    
    })
}


function createDivWithStudent (firstname, lastname, credits){
    let div = document.createElement("div")
    div.classList.add("box")

    div.innerHTML = `
        <h3> ${firstname} ${lastname}  ( credtis ${credits} )</h3>
        <h4> Courses </h4>
        <div class ="course-result> </div> `
    
    let divWithResult = document.getElementById("result")
    divWithResult.appendChild(div)
}


function setFilterdStudent (){
    let lastname = document.getElementById("search").value
    let students = filterByLastName(lastname)

    let result = document.getElementById("result")
    // empty result of divs before every keyup
    result.innerHTML = ""
     
    for(let student of students){
        let  studentTotalCredits = 0

        // for each student the total passed credit is counted
        credits = student.courses.forEach(course => {
            studentTotalCredits += course.passedCredits
        })
    

        createDivWithStudent(student.firstName, student.lastName, studentTotalCredits)
    }
}


function setEventListener (){
    let form = document.getElementById("search-box")


    form.addEventListener("keyup", setFilterdStudent)
}

setEventListener()




