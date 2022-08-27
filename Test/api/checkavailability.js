const expect = require('chai').expect
const request = require('supertest')

const app = require('../../app.js')
const conn =  require('../../routes/index.js')

describe('POST /checkavailability', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done(err)) 
    })

    it('Yupp, checkavailability works..!!', (done) => {
        request(app).post('/checkavailability')
        .send({meetingwithemail: "niravmendapara786@gmail.com", date: "2022-09-01:10:05:00"})
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('_id')
            expect(body).to.contain.property('userA')
            expect(body).to.contain.property('userB')
            expect(body).to.contain.property('meetingname')
            expect(body).to.contain.property('starttime')
            expect(body).to.contain.property('endtime')
            done()
        })
    })
})