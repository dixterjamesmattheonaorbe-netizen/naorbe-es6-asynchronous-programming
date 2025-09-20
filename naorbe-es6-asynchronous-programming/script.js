const tableBody = document.getElementById('tableBody');
const reloadBtn = document.getElementById('reload');
const sortBtn = document.getElementById('sort');
const searchInput = document.getElementById('search');

let students = [];

async function loadStudents() {
  const res = await fetch('student.json');
  const data = await res.json();
  students = data.students;
  displayStudents(students);
}

function displayStudents(list) {
  tableBody.innerHTML = list.map(s => `
    <tr>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.age}</td>
      <td>${s.course}</td>
    </tr>
  `).join('');
}

reloadBtn.addEventListener('click', () => loadStudents());

sortBtn.addEventListener('click', () => {
  const sorted = [...students].sort((a, b) => a.age - b.age);
  displayStudents(sorted);
});

searchInput.addEventListener('input', e => {
  const keyword = e.target.value.trim().toLowerCase();
  const filtered = students.filter(s => s.name.toLowerCase().includes(keyword));
  displayStudents(filtered.length ? filtered : students);
});

loadStudents();
