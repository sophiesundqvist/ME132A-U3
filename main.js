



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



