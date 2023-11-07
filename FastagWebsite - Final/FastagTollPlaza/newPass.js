
document.addEventListener("DOMContentLoaded", function () {
    const updatePassForm = document.getElementById("updatePassForm");
    const updatePassMessageContainer = document.getElementById("updatePassMessageContainer");
    const jwtToken = localStorage.getItem("jwtToken");
    
    updatePassForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const newPass = document.getElementById("newPass").value;
        const ConfirmNewPass = document.getElementById("ConfirmNewPass").value;
    
        const data = {
            newPass: newPass, 
            confirmNewPass: ConfirmNewPass,
        };
    
        const jsonData = JSON.stringify(data);
    
        const apiUrl = "http://localhost:8080/fastag/forgotPasswordUpdatePass";
    
    
        // Display "Updating Password" message
        updatePassMessageContainer.innerHTML = "<p>Updating Password</p>";
    
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
            },
            body: jsonData
        })
        .then((response) => response.text())
        .then((responseText) => {
            // Display the response message as a success message
            updatePassMessageContainer.innerHTML = "<p class='success'>" + responseText + "</p>";
        })
        .catch((error) => {
            console.error("Error:", error); // Handle any errors
            // Display the error message
            updatePassMessageContainer.innerHTML = "<p class='error'>Error: An error occurred while processing your request.</p>";
        });
    });
    


const logout = document.getElementById('logout');
logout.addEventListener('click', function() {


    localStorage.removeItem("state");
    localStorage.removeItem("tollPlaza");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
    };

    fetch('http://localhost:8080/fastag/logout', {
    method: 'DELETE',
    headers: headers
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(data => {
    console.log('Response:', data); 
    const dataMessage = encodeURIComponent(data);
    localStorage.removeItem("jwtToken");
    window.location.href = `login.html`;
})
.catch(error => {
    console.error('Error:', error); 
    const errorMessage = encodeURIComponent(error);
    localStorage.removeItem("jwtToken");
    window.location.href = `login.html`;
});

});
});