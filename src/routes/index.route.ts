// import * as express from "express";
import express, { Application, Request, Response } from "express";
import ApplicantRoute from './applicant.route';



export const routes = (app: Application) => {
    const router = express.Router();
    console.log('Loading Applicant routes')
    ApplicantRoute.ApplicantLoadRoutes('/awesome/applicant', router);
    ApplicantRoute.ApplicantSearchLoadRoutes('/awesome/applicant/search', router);
    ApplicantRoute.ApplicantsLoadRoutes('/awesome/applicants', router);
    router.get('/', (req: Request, res:Response) => res.send('Welcome to Vivacity API'))

    

    //use router middleware
    app.use(router);
    /* app.all('*', (req: Request, res:Response)=> {
        const error = `Route not found: ${req.url}`;
        console.log(error);
        return res.status(404).json({ status: 404, error});
    }); */

}

// applicantController.test.ts