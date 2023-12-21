import { sequelize } from './_config';
import ApplicantModel from './applicants.model';

(async () => {
    await sequelize.authenticate();
    sequelize.models.Applicant = ApplicantModel;
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Synced DB successfully');
    sequelize.connectionManager.close().then(res => console.log('close connection'))
})();