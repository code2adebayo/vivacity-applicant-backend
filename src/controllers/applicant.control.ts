import { Response, Request } from 'express';
import ApplicantModel from '../models/applicants.model';
import { Sequelize } from 'sequelize';
import {Op} from "sequelize";

class ApplicantControl {
    create = async (req: Request, res: Response) => {
        try {     
            const {fullName, ...resBody} = req.body;
            await ApplicantModel.create({...resBody, fullName: fullName.toUpperCase()});
            res.status(200).json({status: 'SUCCESS', message: 'Applicant created successfully'})
        } catch (error: any) {
            console.log(error);
            const errors = {message: error.message}
            res.status(500).json({status: 'ERROR', message: 'Error creating applicant', errors})
        }
    }


    updateOne = async (req: Request, res: Response) => {
        try {     
            const {id, ...resBody} = req.body;                
            const updateRecord: any = await ApplicantModel.findOne({ where:{id}});

            if (!updateRecord) res.status(400).json({ error: { message: 'no match data found' } });
            resBody?.fullName ? updateRecord.set({
                "fullName": req.body.fullName.toUpperCase()
            }): updateRecord.set({
                ...resBody
            });
            
            await updateRecord.save();
            res.status(200).json({status: 'SUCCESS', message: 'Applicant created successfully', data: updateRecord})
            
        } catch (error: any) {
            console.log(error);
            const errors = {message: error.message}
            res.status(500).json({status: 'ERROR', message: 'Error creating qpplicant', errors})
        }
    }

    fetchOne = async (req: Request, res: Response) => {
        try{ 
            const limit = Number(req.query.limit) || 100;
            const offset = Number(req.query.page) || 0;
            const query = {where: {}, limit, offset}
            
            const data = await ApplicantModel.findOne(query);
            // const data = {total_records: count, applicants: rows};
            res.status(200).json({status: 'SUCCESS', message: 'Applicants record fetched successfully', data})
        } catch (error: any) {
            console.log(error);
            const errors = {message: error.message}
            res.status(500).json({status: 'ERROR', message: 'Error fetching applicant detail', errors})
        }
    }

    fetchByName = async (req: Request, res: Response) => {
        try{ 
            let { fullName }:{fullName: string} = req.body;
            if(!fullName)  {
                throw new Error("fullName undefined")
            }
            else{
                fullName = fullName.toUpperCase();
            const data = await ApplicantModel.findAll({ where: { fullName: { [Op.like]: '%' + fullName + '%' } } })
            
            // const data = {total_records: count, applicants: rows};
            res.status(200).json({status: 'SUCCESS', message: 'Applicants record fetched successfully', data})
            }
        } catch (error: any) {
            console.error(error);
            const errors = {message: error?.message ?? "Error: fullName undefined"}
            res.status(500).json({status: 'ERROR', message: 'Error fetching applicant detail', errors})
        }
    }

    deleteOne = async (req: Request, res: Response) => {
        try {                        
            
            let { id }:{id: number} = req.body;
            const data = await ApplicantModel.findOne({ where: { id } });
            
            if (!data?.dataValues) res.status(400).json({ error: { message: 'no match data found' } });
            else {
                
                const res = data.destroy();
            }
            res.status(200).json({status: 'SUCCESS', message: 'Applicant deleted successfully'})
        } catch (error: any) {
            console.log(error);
            const errors = {message: error.message}
            res.status(500).json({status: 'ERROR', message: 'Error delering applicant', errors})
        }
    }

    fetchAll = async (req: Request, res: Response) => {
        try{                        
            const limit = Number(req?.query?.limit) || 100;
            const offset = Number(req?.query?.page) || 0;
            const query = {where: {}, limit, offset}
            const {count, rows} = await ApplicantModel.findAndCountAll(query);
            const data = {count, rows};
            res.status(200).json({status: 'SUCCESS', message: 'Applicants records fetched successfully', data})
        } catch (error: any) {
            console.log(error);
            const errors = {message: error.message}
            res.status(500).json({status: 'ERROR', message: 'Error fetching applicants details', errors})
        }
    }


    

    deleteAll = async (req: Request, res: Response) => {
        try {                        
            await ApplicantModel.truncate();
            res.status(200).json({status: 'SUCCESS', message: 'All Applicants records deleted successfully'})
        } catch (error: any) {
            console.log(error);
            const errors = {message: error.message}
            res.status(500).json({status: 'ERROR', message: 'Error deleting applicants records', errors})
        }
    }
}
export default new ApplicantControl;