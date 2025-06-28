const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const dobInput = document.querySelector('#dob').value;

  if (!name || !dobInput) {
    alert('Please enter all fields.');
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age <= 10) {
    alert('You must be older than 10.');
    return;
  }

  localStorage.setItem('user', JSON.stringify({ name, dob: dobInput }));
  window.location.href = 'app.html';
});

window.onload = () => {
  if (localStorage.getItem('user')) {
    window.location.href = 'app.html';
  }
};
