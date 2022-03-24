function filterByLastName (lastname){
    return DATABASE.students.filter(student =>{
     return student.lastName.toLowerCase().includes(lastname)    
    })
}



function createHTML (){
    
    let lastname = document.getElementById("search").value
    let students = filterByLastName(lastname)
    let wrapper = document.getElementById("result")
    

    wrapper.innerHTML = ""
    for (let student of students){
        
        let studentCourses = getCoursesById(student.courses)
        let studentTotalCredits = 0
        
        credits = student.courses.forEach(course => {
            studentTotalCredits += course.passedCredits
        })


        let studentDiv = document.createElement("div")
        studentDiv.classList.add("box")
        let studentInfo = document.createElement("div")

        studentInfo.textContent = `${student.firstName} ${student.lastName}(credits ${studentTotalCredits} )`


        let courseContainer = document.createElement("div");
        courseContainer.classList.add("courses-result")
        for (let studentCourse of studentCourses){
            let courseTitle = document.createElement("p")
            // let courseCredits = document.createElement("div")
            
            courseTitle.innerHTML = `
            <p>${studentCourse.title}<p/>
             <p> ${studentCourse.totalCredits}</p>`
            // courseCredits.textContent = studentCourse.totalCredits

            courseContainer.append(courseTitle)
                
        }

        studentDiv.append(studentInfo, courseContainer)
        wrapper.append(studentDiv)
    
        }

    }



function setEventListener (){
    let form = document.getElementById("search-box")
    form.addEventListener("keyup", createHTML)
}

setEventListener()



function getCoursesById (courses){
    return courses.map(studentCourse =>{
        return DATABASE.courses.find(course =>{
            return course.courseId == studentCourse.courseId
        })
    })
}




  // let courses = studentCourses.forEach(course =>{
        //     console.log(course.title)
        //     let div = document.createElement("div")
        //     div.innerHTML = `
        //     <p> ${course.title}</p>`

        // })