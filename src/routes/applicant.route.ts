import { Router } from "express";
import ApplicantControl from '../controllers/applicant.control';

class ApplicantRoute {
    ApplicantLoadRoutes(prefix: string, router: Router) {
        this.create(prefix, router);
        this.fetchOne(prefix, router);
        this.updateOne(prefix, router);
        this.deleteOne(prefix, router);
    }
    ApplicantsLoadRoutes(prefix: string, router: Router) {
        this.fetchAll(prefix, router);
        this.deleteAll(prefix, router);
    }

    ApplicantSearchLoadRoutes(prefix: string, router: Router) {
        this.fetchByName(prefix, router);
    }

    private create(prefix: string, router: Router) {
        router.post(`${prefix}`, ApplicantControl.create)
    }
    /* private fetchAll(prefix: string, router: Router) {
        router.get(`${prefix}`, ApplicantControl.fetchAll)
    } */

    private fetchOne(prefix: string, router: Router) {
        router.get(`${prefix}`, ApplicantControl.fetchOne)
    }

    private updateOne(prefix: string, router: Router) {
        router.put(`${prefix}`, ApplicantControl.updateOne)
    }

    private deleteOne(prefix: string, router: Router) {
        router.delete(`${prefix}`, ApplicantControl.deleteOne)
    }

    private fetchAll(prefix: string, router: Router) {
        router.get(`${prefix}`, ApplicantControl.fetchAll)
    }

    

    private deleteAll(prefix: string, router: Router) {
        router.delete(`${prefix}`, ApplicantControl.deleteAll)
    }

    private fetchByName(prefix: string, router: Router) {
        router.post(`${prefix}`, ApplicantControl.fetchByName)
    }
    
}
export default new ApplicantRoute;