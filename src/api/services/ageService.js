const Data = require("../models/ageModel");
const {getPostData, pool} = require("../utils");

/**
 * @desc Gets All Data
 * @route GET /api/data
 */
async function getAllAges(req, res) {
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
async function getOneAge(req, res, id) {
    try {
        const data = await Data.findById(id);

        if (!data) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Data Not Found"}));
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(data));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @desc Create One Data
 * @route POST /api/data
 */
async function createAge(req, res) {
    try {
        const body = await getPostData(req);

        const {
            total_unemployed,
            under_25,
            between_25_29, between_30_39, between_40_49, between_50_55,
            over_55,
            month
        } = JSON.parse(body);

        const data = {
            total_unemployed,
            under_25,
            between_25_29, between_30_39, between_40_49, between_50_55,
            over_55,
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
async function updateAge(req, res, id) {
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
                under_25,
                between_25_29, between_30_39, between_40_49, between_50_55,
                over_55,
                month
            } = JSON.parse(body);

            const dataInfo = {
                total_unemployed: total_unemployed,
                under_25: under_25,
                between_25_29: between_25_29,
                between_30_39: between_30_39,
                between_40_49: between_40_49,
                between_50_55: between_50_55,
                over_55: over_55,
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
async function deleteAge(req, res, id) {
    try {
        const data = await Data.findById(id);

        if (!data) {
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

async function getByIdAndMonth(req, res, id, month) {
    try {
        const data = await Data.findByIdAndMonth(id, month);

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllAges,
    getOneAge,
    createAge,
    updateAge,
    deleteAge,
    getByIdAndMonth
}