const Data = require("../models/educationModel");
const {getPostData, pool} = require("../utils");
const {findByMonthAndId} = require("../models/educationModel");

/**
 * @desc Gets All Data
 * @route GET /api/education
 */
async function getAllEdu(req, res) {
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
 * @route GET /api/education/:id
 */
async function getOneEdu(req, res, id) {
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
 * @route POST /api/education
 */
async function createEdu(req, res) {
    try {
        const body = await getPostData(req);

        const {
            county,
            total_unemployed,
            no_studies,
            primary,
            secondary,
            highschool,
            post_secondary,
            professional,
            university,
            month
        } = JSON.parse(body);

        const data = {
            county,
            total_unemployed,
            no_studies,
            primary,
            secondary,
            highschool,
            post_secondary,
            professional,
            university,
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
 * @route PUT /api/education/:id
 */
async function updateEdu(req, res, id) {
    try {
        const data = await Data.findById(id);

        if (!data) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Data Not Found"}));
        } else {
            console.log(req);
            const body = await getPostData(req);

            const {
                county,
                total_unemployed,
                no_studies,
                primary,
                secondary,
                highschool,
                post_secondary,
                professional,
                university,
                month
            } = JSON.parse(body);

            const dataInfo = {
                county: county,
                total_unemployed: total_unemployed,
                no_studies: no_studies,
                primary: primary,
                secondary: secondary,
                highschool: highschool,
                post_secondary: post_secondary,
                professional: professional,
                university: university,
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
 * @route DELETE /api/education/:id
 */
async function deleteEdu(req, res, id) {
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

async function getByMonth(req, res, month) {
    try {
        const column = await Data.findByMonth(month);

        if (!column) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Data Not Found"}));
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(column));
        }
    } catch (error) {
        console.log(error);
    }
}

async function getByMonthAndId(req, res, month, county, column) {
    try {
        const data = await Data.findByMonthAndId(month, county, column);

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

module.exports = {
    getAllEdu,
    getOneEdu,
    createEdu,
    updateEdu,
    deleteEdu,
    getByMonth,
    getByMonthAndId
}