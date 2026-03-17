// Simple mock authentication using users.json

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');

  // INTENTIONAL BUG: loader never hidden
  // Students must hide it after any async work.

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const isValid = await validateLogin(email, password);
      if (isValid) {
        errorEl.hidden = true;
        // In a real app, you'd set a session or token here.
        alert('Login successful (mock)!');
        window.location.href = 'my-courses.html';
      } else {
        errorEl.hidden = false;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  });
});

async function validateLogin(email, password) {
  // INTENTIONAL BUG: wrong file name
  const response = await fetch('data/user.json');
  if (!response.ok) {
    throw new Error('Failed to load users');
  }
  const users = await response.json();

  // Simple validation: find first matching email/password
  const match = users.find(
    (user) => user.email === email && user.password === password
  );

  return match != null;
}

