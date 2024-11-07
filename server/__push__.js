window.onload = async function() {
    
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        const city = data.city;
        const ip = data.ip;
        console.log(ip);

        fetch('/save-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city, ip })
        })
        .then(response => response.text())
        .then(data => {
            // Process response if needed
        })
        .catch(error => console.error('Erro:', error));

    } catch (error) {
        console.error('Erro ao obter IP:', error);
    }
};