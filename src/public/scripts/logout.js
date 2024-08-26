document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    
    if (token) {
        fetch('/index', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Thêm tiền tố Bearer
            }
        }).then(response => {
            if (!response.ok) {
                window.location.href = '/login';
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        });
    } else {
        window.location.href = '/login';
    }

    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', async function () {
            try {
                const email = localStorage.getItem('user_email');
                if (!email) {
                    alert('Không tìm thấy email trong localStorage. Vui lòng đăng nhập lại.');
                    return;
                }

                console.log('Logging out email:', email);

                const response = await fetch('/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }), 
                });

                // Log phản hồi từ server
                const responseText = await response.text();
          
                if (response.ok) {
                    // Xóa token và email khỏi localStorage
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_email');
                    
                    // Chuyển hướng về trang đăng nhập
                    window.location.href = '/home';
                } else {
                    // Log lỗi từ server
                    const errorData = await response.json();
                    console.error('Logout failed:', errorData);
                    alert('Logout failed!');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Có lỗi xảy ra, vui lòng thử lại.');
            }
        });
    }
});
