document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const firstName = document.getElementById('first_name').value;
      const lastName = document.getElementById('last_name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
          const response = await fetch('/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
          });

          if (response.ok) {
              alert('Registration successful!');
              window.location.href = '/login';
          } else {
              const errorData = await response.json();
              alert(errorData.message);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
  });
});
