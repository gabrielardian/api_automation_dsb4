const fs = require('fs');


function readJsonSchema(schemaname){
    const schemaFolder ="resource/schema"
    return JSON.parse(fs.readFileSync(`${schemaFolder}/${schemaname}`,'utf8'))
}
module.exports = readJsonSchema;
