document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem('token');
    
    if (token) {
        fetch('/index', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (!response.ok) {
                window.location.href = '/login';
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        });

        // Fetch existing appreciation if it exists
        fetch('/appreciation', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
          .then(data => {
              if (data) {
                  document.getElementById('quality').value = data.quality;
                  document.getElementById('qualityValue').textContent = data.quality;
                  document.getElementById('qualityDescription').textContent = getQualityDescription(data.quality);
                  document.getElementById('Feedback').value = data.Feedback;
              }
          }).catch(error => {
              console.error('Error fetching appreciation:', error);
          });

    } else {
        window.location.href = '/login';
    }

    var modal = document.getElementById("appreciationModal");
    var openModalButton = document.getElementById("openModalButton");
    var closeButton = document.getElementsByClassName("close")[0];
    var qualityInput = document.getElementById("quality");
    var qualityValue = document.getElementById("qualityValue");
    var qualityDescription = document.getElementById("qualityDescription");
    var appreciationForm = document.getElementById('appreciationForm');

    modal.style.display = "none";

    openModalButton.onclick = function() {
        modal.style.display = "flex";
    }

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    qualityInput.oninput = function() {
        const value = qualityInput.value;
        qualityValue.textContent = value;
        qualityDescription.textContent = getQualityDescription(value);
    }

    function getQualityDescription(value) {
        const descriptions = {
            1: 'Very Bad',
            2: 'Bad',
            3: 'Fair',
            4: 'Good',
            5: 'Excellent'
        };
        return descriptions[value];
    }

    appreciationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const quality = qualityInput.value;
        const Feedback = document.getElementById('Feedback').value;

        try {
            const response = await fetch('/appreciation', {
                method: 'POST', // Use 'PUT' for update if needed
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quality, Feedback })
            });

            const responseData = await response.json();
            if (response.ok) {
                alert('Appreciation submitted successfully!');
                modal.style.display = "none";
            } else {
                alert('Error submitting appreciation: ' + responseData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
    });

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

                const responseText = await response.text();
          
                if (response.ok) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_email');
                    window.location.href = '/home';
                } else {
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
