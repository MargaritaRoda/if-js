class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
export class Student extends User {
  constructor(firstName, lastName, admissionYear, courseName) {
    super(firstName, lastName);
    this.admissionYear = admissionYear;
    this.courseName = courseName;
  }
  get course() {
    const now = new Date();
    const year = now.getFullYear();
    return year - this.admissionYear;
  }
}

export class Students {
  constructor(students) {
    this.students = students;
  }
  getInfo() {
    const sortedStudents = [...this.students];
    return sortedStudents
      .sort((student1, student2) => {
        return student1.course - student2.course;
      })
      .map((student) => `${student.fullName} ${student.course}`);
  }
}

const studentsData = [
  {
    firstName: 'Василий',
    lastName: 'Петров',
    admissionYear: 2019,
    courseName: 'Java',
  },
  {
    firstName: 'Иван',
    lastName: 'Иванов',
    admissionYear: 2018,
    courseName: 'JavaScript',
  },
  {
    firstName: 'Александр',
    lastName: 'Федоров',
    admissionYear: 2017,
    courseName: 'Python',
  },
  {
    firstName: 'Николай',
    lastName: 'Петров',
    admissionYear: 2019,
    courseName: 'Android',
  },
];

const studentsArr = studentsData.map(
  (studentData) =>
    new Student(
      studentData.firstName,
      studentData.lastName,
      studentData.admissionYear,
      studentData.courseName,
    ),
);

const studentsX = new Students(studentsArr);
console.log(studentsX.getInfo());
