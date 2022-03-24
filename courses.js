function filterCoursesByTitle(coursetitle){
    return DATABASE.courses.filter(course=>{
        return course.title.toLowerCase().includes(coursetitle)
    })

    return courses
}