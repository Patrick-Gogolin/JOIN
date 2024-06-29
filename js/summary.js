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

            greetingElement.textContent = greeting;
        }