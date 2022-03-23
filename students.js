function filterByLastName (lastname){
    return DATABASE.students.filter(student =>{
     return student.lastName.toLowerCase().includes(lastname)    
    })
}


function createDivWithStudent (firstname, lastname){
    let div = document.createElement("div")
    div.classList.add("box")

    div.innerHTML = `
        <h3> ${firstname} ${lastname}</h3>
        <h4> Courses </h4>
        <div class ="course-result> </div> `
    
    let divWithResult = document.getElementById("result")
    divWithResult.appendChild(div)
}



function setFilterStudent (){
    let lastname = document.getElementById("search").value
    let students = filterByLastName(lastname)

    let result = document.getElementById("result")
    result.innerHTML = ""
    students.forEach(student => {
        return createDivWithStudent(student.firstName, student.lastName)
    })
}


function serEventListener (){
    let form = document.getElementById("search-box")


    form.addEventListener("keyup", setFilterStudent)
}

serEventListener()