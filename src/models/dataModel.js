let allData = require('../static/data')
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile} = require('../api/utils')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432, // default PostgresSQL port
});

function findAll() {
    return new Promise( (resolve,reject) =>{
        resolve(allData)

    })
}
function findById(id) {
    return new Promise( (resolve,reject) => {
        const oneData = allData.find((d) => d.id === id)
        resolve(oneData)
    })
}
function create(data) {
    return new Promise((resolve, reject) => {
        const newData = {...data, id: uuidv4()}
        allData.push(newData)
        writeDataToFile('../static/data.json', allData);
        resolve(newData)
    })
}
function update(id, data){
    return new Promise((resolve, reject) =>{
       const index = allData.findIndex( (p) => p.id === id)
        allData[index] = {...data, id}
        writeDataToFile('../static/data.json', allData)
        resolve(allData[index])
    })
}
function remove(id){
    return new Promise((resolve, reject) =>{
        allData = allData.filter((d) => d.id!== id)
        writeDataToFile('../static/data.json', allData)
        resolve()
    })
}
module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}