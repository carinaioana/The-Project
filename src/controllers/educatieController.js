const Data = require('../models/educatieModel')
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
async function getAllData(req,res) {
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
async function getOneData(req, res, id) {
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
async function createData(req,res) {
    try {
        const body = await getPostData(req)

        const { judet, total_someri, fara_studii, invatamant_primar, invatamant_gimnazial, invatamant_liceal, invatamant_posticeal, invatamant_profesional,invatamant_universitar,luna} = JSON.parse(body)

        const data = {
            judet,
            total_someri,
            fara_studii,
            invatamant_primar,
            invatamant_gimnazial,
            invatamant_liceal,
            invatamant_posticeal,
            invatamant_profesional,
            invatamant_universitar,
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
async function updateData(req, res, id) {
    try {
        const data = await Data.findById(id)

        if(!data){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message:'Data Not Found'}))
        } else {
            console.log(req)
            const body = await getPostData(req)

            const {
                "Total someri": total_someri,
                "fara studii": fara_studii,
                "invatamant primar": invatamant_primar,
                "invatamant gimnazial": invatamant_gimnazial,
                "invatamant liceal": invatamant_liceal,
                "invatamant posticeal": invatamant_posticeal,
                "invatamant profesional/arte si meserii": invatamant_profesional,
                "invatamant universitar": invatamant_universitar,
                luna
            } = JSON.parse(body);

            const dataInfo = {
                total_someri: total_someri || data["Total someri"],
                fara_studii: fara_studii || data["fara studii"],
                invatamant_liceal: invatamant_primar || data["invatamant primar"],
                invatamant_gimnazial: invatamant_gimnazial || data["invatamant gimnazial"],
                invatamant_liceal: invatamant_liceal || data["invatamant liceal"],
                invatamant_posticeal: invatamant_posticeal || data["invatamant posticeal"],
                invatamant_profesional: invatamant_profesional || data["invatamant profesional/arte si meserii"],
                invatamant_universitar: invatamant_universitar || data["invatamant universitar"],
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
async function deleteData(req, res, id) {
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
    getAllData,
    getOneData,
    createData,
    updateData,
    deleteData
}