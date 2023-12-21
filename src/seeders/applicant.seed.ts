import axios from 'axios';
import ApplicantModel from '../models/applicants.model';

const ApplicantSeeder = async () => {
    try {
       
        console.log(`Applicants Seeded successfully`);
        
        const applicant: any = {fullName: 'SHINA ADEBAYO', skills: ['Typescript', 'Javascript', 'HTML5', 'CSS', 'React', 'TailwindCSS', 'Nodejs', 'Seque;ize.js'], jobTitle: ' Full Stack Engineer', experienceSummary: 
        `I have 8 years experience developing easy-to-use websites and applications with
        very good user experience with React, Angular, Javascript, Jquery, Typescript,
        HTML and CSS. I have worked as a full stack developer and have good
        knowledge of REST APIs development with Node.js.
        I have developed a strong organizational, communication and project
        management skill which allows me to be a self-starter with proficiency in
        problem solving, decision making, and customer service` }
        await ApplicantModel.destroy({truncate: true});
        await ApplicantModel.sync({force: true})
        await ApplicantModel.create(applicant)
    } catch (error) {
        console.log(error);
    }
}

(async () => {
    try {
        await ApplicantSeeder();
    } catch (error) {
        console.log(error);
    }
})()