const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"


async function postData(path = "", data={}) {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');
    let name = document.getElementById('first-name');
    let surname = document.getElementById('last-name');
    let phoneNumber = "";
    let id = "";

    if(password.value === confirmPassword.value ) {

    data = {
        id: id,
        email: email.value,
        password: password.value,
        name: name.value,
        surname: surname.value,
        phone: phoneNumber
    };

    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    document.getElementById('confirm-password').classList.remove('password-not-the-same');
    document.getElementById('not-same-password-container').classList.add('d-none');
    successfullLogin();
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 2000);
    return responseToJson = await response.json();

}
else{
    document.getElementById('confirm-password').classList.add('password-not-the-same');
    document.getElementById('not-same-password-container').classList.remove('d-none');
}
}

function successfullLogin() {
    document.getElementById('overlayer-successful-login').classList.remove('d-none');
}

document.addEventListener('DOMContentLoaded', function() {
    // Set default mobile width and height thresholds
    const mobileWidthPortrait = 768;  // Width threshold for mobile portrait mode
    const mobileHeightPortrait = 1024; // Height threshold for mobile portrait mode
  
    const mobileWidthLandscape = 1024; // Width threshold for mobile landscape mode
    const mobileHeightLandscape = 768; // Height threshold for mobile landscape mode
  
    // Define a maximum width to distinguish between mobile and desktop
    const maxMobileWidth = 932;  // This should be the upper limit for mobile devices
  
    // Function to check orientation and display the warning if needed
    function checkOrientation() {
      const isLandscape = window.innerWidth > window.innerHeight;
  
      // Check if the screen width is less than or equal to the maxMobileWidth
      const isMobile = window.innerWidth <= maxMobileWidth;
  
      // Conditions for showing the warning
      const isMobilePortrait = isMobile && window.innerWidth <= mobileWidthPortrait && window.innerHeight <= mobileHeightPortrait;
      const isMobileLandscape = isMobile && window.innerWidth <= mobileWidthLandscape && window.innerHeight <= mobileHeightLandscape;
  
      // Show the warning if the device is in landscape mode and fits mobile dimensions
      if (isLandscape && (isMobilePortrait || isMobileLandscape)) {
        document.getElementById('landscape-warning').classList.add('visible');
      } else {
        document.getElementById('landscape-warning').classList.remove('visible');
      }
    }
  
    // Initial check
    checkOrientation();
  
    // Check orientation on resize/orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
  });