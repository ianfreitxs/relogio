document.addEventListener('DOMContentLoaded', () => {
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    const digitalTime = document.getElementById('digital-time');
    const currentDate = document.getElementById('current-date');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const lightModeBtn = document.getElementById('light-mode-btn');
    const body = document.body;
    const timezoneSelect = document.getElementById('timezone-select');

    let selectedTimeZone = 'America/Sao_Paulo';

    const timeZones = [
        { name: 'São Paulo (Brasil)', value: 'America/Sao_Paulo' },
        { name: 'Nova York (EUA)', value: 'America/New_York' },
        { name: 'Londres (Reino Unido)', value: 'Europe/London' },
        { name: 'Paris (França)', value: 'Europe/Paris' },
        { name: 'Tóquio (Japão)', value: 'Asia/Tokyo' },
        { name: 'Sydney (Austrália)', value: 'Australia/Sydney' },
        { name: 'UTC', value: 'UTC' }
    ];

    timeZones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.value;
        option.textContent = tz.name;
        timezoneSelect.appendChild(option);
    });

    const savedTimeZone = localStorage.getItem('selectedTimeZone');
    if (savedTimeZone) {
        selectedTimeZone = savedTimeZone;
        timezoneSelect.value = savedTimeZone;
    }

    function updateClock() {
        const now = new Date();
        const options = {
            timeZone: selectedTimeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const timeString = now.toLocaleTimeString('pt-BR', options);
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        const displayHours = hours > 12 ? hours - 12 : hours;
        const finalHours = displayHours === 0 ? 12 : displayHours;

        const secondsDegrees = seconds * 6;
        const minutesDegrees = (minutes * 6) + (seconds * 0.1);
        const hoursDegrees = (finalHours * 30) + (minutes * 0.5) + (seconds * (0.5 / 60));

        secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;

        digitalTime.textContent = timeString.substring(0, 5);

        const dateOptions = {
            timeZone: selectedTimeZone,
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        currentDate.textContent = now.toLocaleDateString('pt-BR', dateOptions);
    }

    function setLightTheme() {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }

    function setDarkMode() {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    darkModeBtn.addEventListener('click', setDarkMode);
    lightModeBtn.addEventListener('click', setLightTheme);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setDarkMode();
    } else {
        setLightTheme();
    }

    timezoneSelect.addEventListener('change', (event) => {
        selectedTimeZone = event.target.value;
        localStorage.setItem('selectedTimeZone', selectedTimeZone);
        updateClock();
    });

    setInterval(updateClock, 1000);
    updateClock();
});