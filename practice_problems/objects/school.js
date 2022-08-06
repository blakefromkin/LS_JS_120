// Create a school object. The school object uses the student object from the previous exercise:
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(code, note) {
      let course = this.courses.find(course => course.code === code);
      if (!course) return 'course not found';
      course.note = course.note ? course.note + '; ' + note : note;
    },

    updateNote(code, note) {
      let course = this.courses.find(course => course.code === code);
      if (!course) return 'course not found';
      course.note = note;
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    }
  };
}

// addStudent: Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".
// enrollStudent: Enrolls a student in a course.
// addGrade: Adds the grade of a student for a course.
// getReportCard: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
// courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report.
let school = {
  students: [],

  addStudent(name, year) {
    let validYears = '1st 2nd 3rd 4th 5th';
    if (!validYears.includes(year)) {
      console.log('Invalid Year');
      return;
    }
    let student = createStudent(name, year);
    this.students.push(student);
    return student;
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode})
  },

  addGrade(student, courseName, grade) {
    let course = student.courses.find(course => course.name === courseName);

    if (course) {
      course.grade = grade;
    }
  },

  getReportCard(student) {
    student.courses.forEach(course => {
      if (!course.grade) {
        console.log('In progress');
      } else {
        console.log(course.grade);
      }
    });
  },

  courseReport(courseName) {
    let studentGrades = [];
    this.students.forEach(stud => {
      let course = stud.courses.find(course => course.name === courseName);
      if (course.grade) studentGrades.push([stud.name, course.grade]);
    });
    if (!studentGrades.length) {
      console.log(undefined);
      return;
    }

    console.log(`=${courseName} Grades=`);
    studentGrades.forEach(arr => {
      console.log(`${arr[0]}: ${arr[1]}`);
    });
    console.log('---');

    let gradeSum = studentGrades.reduce((sum, subArr) => sum + subArr[1], 0);
    console.log(`Course Average: ${Math.ceil(gradeSum / studentGrades.length)}`);
  }
};




// To test your code, use the three student objects listed below. Using the three student objects, produce the following values from the getReportCard and courseReport methods respectively.

// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects
foo;
{
  name: 'foo',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}

bar;
{
  name: 'bar',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}

qux;
{
  name: 'qux',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
   ],
}
