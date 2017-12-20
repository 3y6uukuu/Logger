const SERVER = {
    PORT: '8081',
};

const express = require('express');
const fs = require('fs');
const app = express();

const indexPageName = 'index.html';
const indexPagePath = `${__dirname}/${indexPageName}`;

const logFileName = 'logs.txt';
const logFilePath = `${__dirname}/${logFileName}`;

app.get('/', (request, respond) => {
    respond.sendFile(indexPagePath);
});

app.post('/log', (request, respond) => {
    /**
     * Generate structure:
     *
     * {
     *    "timestamp": 1513684344,
     *    "payload": null
     * },
     */

    let body = `{"timestamp": ${Math.floor(Date.now() / 1000)}`;

    request.on('data', (data) => {
        body += `,\n"payload": ${data}`;
    });

    request.on('end', () => {
        body += '},\n';

        fs.appendFile(logFilePath, body, () => respond.end());
    });
});

app.get('/download', (request, respond) => {
    respond.download(logFilePath, logFileName);
});

app.delete('/clear', (request, respond) => {
    fs.writeFile(logFilePath, '', () => {
        respond.send(`${logFileName} file is cleared`);
    });
});

app.listen(SERVER.PORT, () => {
    console.log(`Express app listening on port ${SERVER.PORT}`);
});