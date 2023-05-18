const allData = require('../static/data')
const { writeDataToFile} = require('../api/utils')

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
/*function create(data){
}
 */
function update(id, data){
    return new Promise((resolve, reject) =>{
       const index = allData.findIndex( (p) => p.id === id)
        allData[index] = {...data, id}
        writeDataToFile('../static/data.json',data)
        resolve(allData[index])
    })
}
module.exports = {
    findAll,
    findById,
    update
}