
function filterByLastName (lastname){
    let filterdStudents = []

    for (let i = 0; i < DATABASE.students.length; i++){

        if (DATABASE.students[i].lastName == lastname){
            filterdStudents.push(DATABASE.students[i])
        }
    }

    return filterdStudents
}



// create div with student
function createDivWithStudent (name, lastname){
    let div = document.createElement("div")
    div.classList.add("box")
    document.getElementById("result").appendChild(div)

    div.innerHTML = 
    `<h3> ${name} ${lastname} (total: credits)</h3>
    <h4> Courses </h4>
    <div class = "courses-result"></div>`
}


// creates div based on array of filterd students
function setFilterdstudent(){
    let lastname = document.getElementById("search").value
    let students = filterByLastName(lastname)

    for(let i = 0; i < students.length; i++){
        createDivWithStudent(students[i].firstName, students[i].lastName, students[i].courses )
    }
}

setFilterdstudent()


