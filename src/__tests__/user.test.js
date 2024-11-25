import supertest from "supertest";
import {app} from "../apps/app.js";
import {prismaClient} from "../apps/databases.js";

describe('POST /api/users', () => {
    afterEach(async ()=>{
        await prismaClient.user.deleteMany({
            where: {
                username: "admin"
            }
        })
    })

    it('should can register new user', async () => {
        const result= await  supertest(app)
            .post('/api/users')
            .send({
                username: 'admin',
                password: 'admin',
                name: 'admin name',
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('admin');
        expect(result.body.data.name).toBe('admin name');
        expect(result.body.data.password).toBeUndefined();
    })
})