const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const should = chai.should();

const usersController = require('../controllers').users;
const Users = require('../models').Users;


describe('create user', () =>{
  beforeEach(() => {
    //
  })

  it('should be able to create new user', () => {
    return usersController.findOrCreate({firstName:'Jimmy', lastName:'Twotwo', image:'url', passportId:4})
      .should.be.fulfilled;
  })
});

describe('nearby users', () => {
  before(() => {
  })

  it('should return nearby seeded users', () => {
    const lat = 43.644625
    const lng = -79.395197
    const latMin =  lat-0.0001;
    const latMax = lat+0.0001;
    const lngMin = lng-0.0001;
    const lngMax = lng+0.0001;
    return usersController.findUsersNearby({latMin , latMax, lngMin, lngMax, id:5})
      .should.be.fulfilled;
  })

  it('should not return user if seeded data far from test case', () => {
    const lat = 43.643625
    const lng = -79.394197
    const latMin =  lat-0.0001;
    const latMax = lat+0.0001;
    const lngMin = lng-0.0001;
    const lngMax = lng+0.0001;
    return usersController.findUsersNearby({latMin , latMax, lngMin, lngMax, id:5})
      .should.eventually.deep.equal([]);
  })

})

