import Data from "../dataHelper/data"
import Params from "../dataHelper/params";

describe('Pet Tests', () => {

  const data = new Data();
  const params = new Params();
  var url = params.url();

  it('POST Pet Info', () => {
    cy.request({
      method: 'POST',
      url: url + '/v2/pet',
      body: data.bodyPayload()
    })
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  it('404 - POST Not Found Pet Url', () => {
    cy.request({
      method: 'POST',
      url: url + '/v2/invalid-endpoint',
      body: data.bodyPayload(),
      headers: data.headerPayload(),
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(404);
      });
  });

  it('400 - POST Bad Request Content-Type', () => {
    cy.request({
      method: 'POST',
      url: url + '/v2/pet',
      body: data.invalidBodyPayload(),
      headers: data.headerPayload(),
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(400);
      });
  });

  it('GET valid Pet ID', () => {
    cy.request({
      method: 'GET',
      url: url + '/v2/pet/3',
      headers: data.headerPayload(),
    })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('GET invalid Pet ID', () => {
    const petId = "1998";
    cy.request({
      method: 'GET',
      url: url + '/v2/pet/+petId',
      headers: data.headerPayload(),
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(404);
      });
  });

  it('GET Pet ID is empty', () => {
    cy.request({
      method: 'GET',
      url: url + '/v2/pet/',
      headers: data.headerPayload(),
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(405);
      });
  });

  it('PUT valid Pet Name', () => {
    cy.request({
      method: 'PUT',
      url: url + '/v2/pet/',
      headers: data.headerPayload(),
      body: data.updatePayload()
    })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('PUT Invalid ID', () => {
    const nonePetId = 999999;
    cy.request({
      method: 'PUT',
      url: url + '/v2/pet/+nonePetId',
      headers: data.headerPayload(),
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(405);
      });
  });

  it('PUT Empty Body', () => {
    cy.request({
      method: 'PUT',
      url: url + '/v2/pet/',
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(415);
      });
  });

  it('DELETE Pet ApiKey', () => {
    cy.request({
      method: 'DELETE',
      url: url + '/v2/pet/1',
      headers: data.headerPayload()
    })
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  it('DELETE Invalid ID', () => {
    const invalidId = 'invalid_id';
    cy.request({
      method: 'DELETE',
      url: url + '/v2/pet/' + invalidId,
      headers: data.headerPayload(),
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(404);
      });
  });

  it('DELETE Empty ID', () => {
    cy.request({
      method: 'DELETE',
      url: url + '/v2/pet/',
      headers: data.headerPayload(),
      failOnStatusCode: false
    })
      .then((response) => {
        expect(response.status).to.eq(405);
      });
  });

})