import "babel-polyfill";
import app from '../server';
import supertest from 'supertest';

const request = supertest(app);

//it's recommended to run tests after you run seeders
describe('test endpoints', () => {

    it('should get all makes', async (done) => {
        const res = await request.get('/api/get-makes');
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');

        done();
    });

    it('should get all models', async (done) => {
        const res = await request.get('/api/get-models');
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');

        done();
    });

    it('should return cities which name contains \"szerencs\"', async (done) => {
        const res = await request.get('/api/get-cities?name=szerencs');

        let found = false;

        for (let city of res.body) {
            if(city.postalCode === 3900){
                found = true;
                break;
            }
        }

        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(found).toBe(true);

        done();
    });

});