



// function getArrayOfSumOfPoint(){
//     let lastname = document.getElementById("search").value
//     let students = filterByLastName(lastname)
//     let sumOfPoints = []

//     for(let i = 0; i < students.length; i++){
//         let arrayCourses = students[i].courses
//         let sum = 0

//             for(let i = 0; i < arrayCourses.length; i++){
//                 let points = arrayCourses[0].passedCredits

//                 sum = sum + points
//             }

//         sumOfPoints.push(sum)
//     }

//     return sumOfPoints
// }


// function getArraysOfCourseId (){
//     let lastname = document.getElementById("search").value
//     let students = filterByLastName(lastname)
//     let arrayOfCoursId = []
    
//     for(let i = 0; i < students.length; i++){
//         let arrayCourses = students[i].courses
//         let coursIds = [] 

//             for(let i = 0; i < arrayCourses.length; i++){
//                 let courseId = arrayCourses[0].courseId
//                 coursIds.push(courseId)
            
//             }
        
//        arrayOfCoursId.push(coursIds)
//     }

//     return arrayOfCoursId
// }



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