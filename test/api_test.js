const chai = require("chai");
const supertest = require("supertest");
const baseURL = "https://reqres.in/api"
const chaiJsonSchema = require('chai-json-schema')
const readJsonSchema = require("../helper/helper");
chai.use(chaiJsonSchema)
const expect = chai.expect;
const fs = require('fs');
const { assert } = require("console");




describe('RESREQ-API.IN API TEST', () => {
        var createdId;

    it("T1 - GET LIST USER", async () => {

        const schema = readJsonSchema('get_list_user_schema.json')
        
        const response = await supertest(baseURL).get("/users?page=2");
        // assert.equal(response.status, 200)
        // should(response.status === 200);
        expect(response.status).to.equal(200)
        expect(response.body.page).to.equal(2)
        expect(response.body).to.be.jsonSchema(schema)
        console.log(response.status)

    });

    it("T2 - Post Create ", async () => {
        const requestdata = {
            "name": "morpheus",
            "job": "leader"
        };
        const schema = readJsonSchema('post_create.json')
        // const schema = JSON.parse(fs.readFileSync("resource/schema/post_create.json", 'utf8'));
        const response = await supertest(baseURL)
            .post("/users")
            .send(requestdata);
        console.log(response.body)
        expect(response.status).to.equal(201);
        expect(response.body).to.be.jsonSchema(schema);
        createdId =response.body.id
        console.log(response.status)
    });
    
    it("T3 - DELETE user RESREQ.IN", async () => {
        console.log(createdId)
        const response = await supertest(baseURL).delete("users/2");
        console.log(response.body)
    });

    it("T4 - Put Update User", async () => {
        const Updatedata = {
            "name": "morpheus",
            "job": "zion resident"
        };
        const schema = readJsonSchema('put_user.json')
        // const schema = JSON.parse(fs.readFileSync("resource/schema/put_user.json", 'utf8'));
        const response = await supertest(baseURL)
            .put("/users/2")
            .send(Updatedata);
        console.log(response.body)
        console.log(response.status)
        expect(response.status).to.equal(200);
        expect(response.body).to.be.jsonSchema(schema);
    });
});
