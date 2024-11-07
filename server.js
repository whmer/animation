//const session = require("express-session");
const express = require('express');
const { createConnection } = require('net');
const path = require('path');
const bodyParser = require('body-parser')
const http = require('http');
const fs = require('fs');
const { Session } = require('inspector/promises');
const app = express();
const port = "8080";

const server = http.createServer(app)
app.use(bodyParser.json());
app.use(express.static('server'));

app.post('/save-data', (req, res) => {
    const {city, ip } = req.body;

    // Lê o conteúdo existente do arquivo
    let data = {};
    if (fs.existsSync('userData.json')) {
        const rawData = fs.readFileSync('userData.json', 'utf8');
        data = JSON.parse(rawData);
    }

    // Adiciona ou substitui o conteúdo
    data[ip] = { city, ip };

    // Salva o conteúdo atualizado no arquivo
    fs.writeFileSync('userData.json', JSON.stringify(data, null, 2));
    res.send('Dados salvos com sucesso!');
});

app.get('/get-data', (req, res) => {
    fs.readFile('userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao ler os dados do usuário');
        }
        res.json(JSON.parse(data)); // Envia o JSON com os dados do usuário
    });
});

app.use(express.static(path.join(__dirname, 'server')));

server.listen(port, () => {
    console.log(`server runing port ${port} host => http://localhost:${port}`)
})