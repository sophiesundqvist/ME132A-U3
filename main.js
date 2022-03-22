
function filterByLastName (lastname){
    let filterdStudents = []

    for (let i = 0; i < DATABASE.students.length; i++){

        if (DATABASE.students[i].lastName == lastname){
            filterdStudents.push(DATABASE.students[i])
        }
    }

    return filterdStudents
}



function getArrayOfSumOfPoint(){
    let lastname = document.getElementById("search").value
    let students = filterByLastName(lastname)
    let sumOfPoints = []

    for(let i = 0; i < students.length; i++){
        let arrayCourses = students[i].courses
        let sum = 0

            for(let i = 0; i < arrayCourses.length; i++){
                let points = arrayCourses[0].passedCredits

                sum = sum + points
            }

        sumOfPoints.push(sum)
    }
    
    return sumOfPoints
}


// function getSumOfPointsBasedOnLastname (lastname){
//     let sumOfPoints = []

//     for (let i = 0; i < DATABASE.students.length; i++){

//         if (DATABASE.students[i].lastName == lastname){
//             let arrayCourses = DATABASE.students[i].courses
//             console.log(arrayCourses)
//             let sum = 0

//             for (let i = 0; i < arrayCourses.length; i++){
//                 let points = arrayCourses[0].passedCredits

//                 sum = sum + points
//             }
//             sumOfPoints.push(sum)
//         }
//     }
//     return sumOfPoints

// }




// create div with student
function createDivWithStudent (name, lastname, credit){
    let div = document.createElement("div")
    div.classList.add("box")
    document.getElementById("result").appendChild(div)

    div.innerHTML = 
    `<h3> ${name} ${lastname} (total: (${credit}credits)</h3>
    <h4> Courses </h4>
    <div class = "courses-result"></div>`
}


// creates div based on array of filterd students
function setFilterdstudent(){
    let lastname = document.getElementById("search").value
    let students = filterByLastName(lastname)
    let points = getArrayOfSumOfPoint()

    for(let i = 0; i < students.length; i++){
        createDivWithStudent(students[i].firstName, students[i].lastName, points[i]  )
    }
}

setFilterdstudent()


