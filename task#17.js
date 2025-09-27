
import express from "express";
const app = express();
app.use(express.json());

//  Sample student data
let students = [
  { id: 1, name: "Insha", age: 21, email: "insha@gmail.com" },
  { id: 2, name: "Emaan", age: 22, email: "emaan@gmail.com" },
];

//  Helper function for validation
function validateStudent({ name, age, email }) {
  if (!name || !email || !age) return "All fields are required";
  if (!email.includes("@")) return "Email must include @";
  if (age <= 0) return "Age must be greater than 0";
  return null;
}

//  1. Show all students (with optional search by ?name= )
app.get("/students", (req, res) => {
  const { name } = req.query;
  if (name) {
    const result = students.filter(s =>
      s.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(result);
  }
  res.json(students);
});

// ✅ 2. Show single student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// ✅ 3. Add new student
app.post("/students", (req, res) => {
  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ error });

  const newStudent = {
    id: students.length + 1,
    ...req.body,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// ✅ 4. Update student
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  const { name, age, email } = req.body;
  if (name) student.name = name;
  if (email && email.includes("@")) student.email = email;
  if (age > 0) student.age = age;

  res.json(student);
});

// ✅ 5. Delete student
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  students.splice(index, 1);
  res.json({ message: "Student deleted" });
});

// 🚀 Start server
app.listen(4000, () => {
  console.log("Server is running on port no 4000");
});