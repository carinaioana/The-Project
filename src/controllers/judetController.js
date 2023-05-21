const Data = require('../models/judetModel')
const { Pool } = require('pg');
const {getPostData} = require('../api/utils')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432, // default PostgresSQL port
});

/**
 * @desc Gets All Data
 * @route GET /api/data
 */
async function getAllCounties(req, res) {
    try {
        const allData = await Data.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(allData))
    } catch (error){
        console.log(error)
    }
}
/**
 * @desc Gets Single Data
 * @route GET /api/data/:id
 */
async function getOneCounty(req, res, id) {
    try {
        const oneData = await Data.findById(id)

        if(!oneData){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message:'Data Not Found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(oneData))
        }
    } catch (error){
        console.log(error)
    }
}


/**
 * @desc Create One Data
 * @route POST /api/data
 */
async function createCounty(req, res) {
    try {
        const body = await getPostData(req)

        const { judet, total, total_femei, total_barbati, indemnizati, neindemnizati, rata_somajului, rata_feminina,rata_masculina,luna} = JSON.parse(body)

        const data = {
            judet,
            total,
            total_femei,
            total_barbati,
            indemnizati,
            neindemnizati,
            rata_somajului,
            rata_feminina,
            rata_masculina,
            luna
        }
        const newData = await Data.create(data)

        res.writeHead(200, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newData))
    } catch (error){
        console.log(error)
    }
}
/**
 * @desc Update One Data
 * @route PUT /api/data/:id
 */
async function updateCounty(req, res, id) {
    try {
        const data = await Data.findById(id)

        if(!data){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message:'Data Not Found'}))
        } else {
            console.log(req)
            const body = await getPostData(req)

            const {
                "Numar total someri": total,
                "Numar total someri femei": total_femei,
                "Numar total someri barbati": total_barbati,
                "Numar someri indemnizati": indemnizati,
                "Numar someri neindemnizati": neindemnizati,
                "Rata somajului (%)": rata_somajului,
                "Rata somajului Feminina (%)": rata_somajului_feminina,
                "Rata somajului Masculina (%)": rata_somajului_masculina,
                luna
            } = JSON.parse(body);

            const dataInfo = {
                total: total || data["Numar total someri"],
                total_femei: total_femei || data["Numar total someri femei"],
                total_barbati: total_barbati || data["Numar total someri barbati"],
                indemnizati: indemnizati || data["Numar someri indemnizati"],
                neindemnizati: neindemnizati || data["Numar someri neindemnizati"],
                rata_somajului: rata_somajului || data["Rata somajului (%)"],
                rata_somajului_feminina: rata_somajului_feminina || data["Rata somajului Feminina (%)"],
                rata_somajului_masculina: rata_somajului_masculina || data["Rata somajului Masculina (%)"],
                luna: luna || data.luna
            };

            const updData = await Data.update(id, dataInfo)

            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updData))
        }
    } catch (error){
        console.log(error)
    }
}
/**
 * @desc Deletes Single Data
 * @route DELETE /api/data/:id
 */
async function deleteCounty(req, res, id) {
    try {
        const oneData = await Data.findById(id)

        if(!oneData){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message:'Data Not Found'}))
        } else {
            await Data.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Data ${id} removed`}))
        }
    } catch (error){
        console.log(error)
    }
}

module.exports = {
    getAllCounties,
    getOneCounty,
    createCounty,
    updateCounty,
    deleteCounty
}