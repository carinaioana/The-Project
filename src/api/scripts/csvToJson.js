const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = '../../static/file.csv';
const jsonFilePath = '../../static/file.json';

const jsonData = [];

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        jsonData.push(row);
    })
    .on('end', () => {
        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (error) => {
            if (error) {
                console.error('Error writing JSON file:', error);
            } else {
                console.log('JSON file created successfully!');
            }
        });
    });
