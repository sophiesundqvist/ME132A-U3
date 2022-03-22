
function filterByLastName (lastname){
    let filterdStudents = []

    for (let i = 0; i < DATABASE.students.length; i++){

        if (DATABASE.students[i].lastName == lastname){
            filterdStudents.push(DATABASE.students[i])
        }
    }

    return filterdStudents
}




