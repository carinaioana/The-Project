const Data = require("../models/mapModel");
const {getPostData, pool} = require("../utils");

/**
 * @desc Gets All Data
 * @route GET /api/data
 */
async function getAllCounties(req, res) {
    try {
        const allData = await Data.findAll();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(allData));
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc Gets Single Data
 * @route GET /api/data/:id
 */
async function getOneCounty(req, res, id) {
    try {
        const oneData = await Data.findById(id);

        if (!oneData) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Data Not Found"}));
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(oneData));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc Create One Data
 * @route POST /api/data
 */
async function createCounty(req, res) {
    try {
        const body = await getPostData(req);

        const {
            total_unemployed,
            female_unemployed,
            male_unemployed,
            paid_unemployed,
            not_paid_unemployed,
            rate,
            female_rate,
            male_rate,
            month
        } = JSON.parse(body);

        const data = {
            total_unemployed,
            female_unemployed,
            male_unemployed,
            paid_unemployed,
            not_paid_unemployed,
            rate,
            female_rate,
            male_rate,
            month
        };
        const newData = await Data.create(data);

        res.writeHead(200, {"Content-Type": "application/json"});
        return res.end(JSON.stringify(newData));
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc Update One Data
 * @route PUT /api/data/:id
 */
async function updateCounty(req, res, id) {
    try {
        const data = await Data.findById(id);

        if (!data) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Data Not Found"}));
        } else {
            console.log(req);
            const body = await getPostData(req);

            const {
                total_unemployed,
                female_unemployed,
                male_unemployed,
                paid_unemployed,
                not_paid_unemployed,
                rate,
                female_rate,
                male_rate,
                month
            } = JSON.parse(body);

            const dataInfo = {
                total_unemployed: total_unemployed,
                female_unemployed: female_unemployed,
                male_unemployed: male_unemployed,
                paid_unemployed: paid_unemployed,
                not_paid_unemployed: not_paid_unemployed,
                rate: rate,
                female_rate: female_rate,
                male_rate: male_rate,
                month: month
            };

            const updData = await Data.update(id, dataInfo);

            res.writeHead(200, {"Content-Type": "application/json"});
            return res.end(JSON.stringify(updData));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc Deletes Single Data
 * @route DELETE /api/data/:id
 */
async function deleteCounty(req, res, id) {
    try {
        const oneData = await Data.findById(id);

        if (!oneData) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Data Not Found"}));
        } else {
            await Data.remove(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: `Data ${id} removed`}));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCounties,
    getOneCounty,
    createCounty,
    updateCounty,
    deleteCounty
}