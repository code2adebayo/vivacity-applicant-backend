
  

import request from 'supertest';
import express from 'express';
import { routes } from '../src/routes/index.route';// Assuming your main file is named app.ts

const app = express();
routes(app);

describe('Home Route', () => {
  it('should respond with a welcome message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Welcome to Vivacity API');
  });
});
