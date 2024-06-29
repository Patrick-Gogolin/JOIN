        function updateGreeting() {
            const greetingElement = document.getElementById('greeting-text');
            const now = new Date();
            const hours = now.getHours();

            let greeting = 'Good morning,';

            if (hours >= 12 && hours < 18) {
                greeting = 'Good afternoon,';
            } else if (hours >= 18) {
                greeting = 'Good evening,';
            }
            initUserName();

            greetingElement.textContent = greeting;
        }

        function loadUserName() {
            let userAsText = localStorage.getItem('user');
            if (userAsText) {
                let user = JSON.parse(userAsText);
                console.log(user);
                return user; // User zurückgeben
            } else {
                console.log("user not found");
                return null; // Null zurückgeben, wenn kein Benutzer gefunden wird
            }
        }

        function initUserName() {
            let userName = document.getElementById('greeting-name');
            let user = load(); // Benutzer aus der Load-Funktion abrufen
            if (user) {
                let name = user['name'];
                let surname = user['surname'];
                userName.innerHTML = showUserName(name, surname); // Initialen anzeigen
            }
            else{
                userName.innerHTML = "Guest";
            }
        }


        function showUserName(name, surname) {
            return `${name} ${surname}`; // Initialen zurückgeben
        }