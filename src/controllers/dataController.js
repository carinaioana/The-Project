const Data = require('../models/dataModel')

const {getPostData} = require('../api/utils')
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
/*async function createData(req,res) {
    try {
        const data = {
            "county": "Alba",
            "rate": "8",
            "total": 8100,
            "females": 4400,
            "males": 3700,
            "paid": 2500,
            "not-paid": 5600,
        }
    } catch (error){
        console.log(error)
    }
}*/
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

            const {  county, rate, total, females, males, paid, notpaid} = JSON.parse(body)

            const dataInfo = {
                county: county || data.county ,
                rate: rate || data.rate,
                total: total || data.total,
                females: females || data.females,
                males: males || data.males,
                paid: paid || data.paid,
                notpaid: notpaid || data.notpaid
            }
            const updData = await Data.update(id, dataInfo)

            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updData))
        }
    } catch (error){
        console.log(error)
    }
}
module.exports = {
    getAllData,
    getOneData,
    updateData
}