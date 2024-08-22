document.addEventListener('DOMContentLoaded', function () {
  const signUpLink = document.getElementById('signUpLink');
  const loginForm = document.getElementById('loginForm');

  if (signUpLink) {
    signUpLink.addEventListener('click', function (e) {
      e.preventDefault();
      // Chuyển hướng đến trang đăng ký
      window.location.href = '/register';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Log thông tin đăng nhập
      console.log('Login attempt:', { email, password });

      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        // Log phản hồi từ server
        console.log('Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);

          // Lưu token và email vào localStorage
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user_email', email); 
          
          window.location.href = '/dashboard'; 
        } else {
          const errorData = await response.json();
          console.log('Login failed:', errorData);
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    });
  }
});
