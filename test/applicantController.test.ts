import { IApplicants, IFakeApplicant, IUpdateFakeApplicant } from './../src/typings/typings.d';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ApplicantModel from '../src/models/applicants.model';
import ApplicantControl from '../src/controllers/applicant.control';




jest.mock('../src/models/applicants.model');

  const record: IApplicants = { id: 1, fullName: 'JOHN DOE',  skills: ['CSS', 'React', 'TailwindCSS'], jobTitle: ' Full Stack Engineer', experienceSummary:  
  `I have 8 years experience developing easy-to-use websites and applications with` } ;
  const fakeApplicant: IFakeApplicant = {dataValues:record, isNewRecord: false, destroy: jest.fn()};
  const updateFakeApplicant: IUpdateFakeApplicant = {...fakeApplicant, 
  dataValues: {...fakeApplicant.dataValues,fullName: 'Updated Name'},
  set: jest.fn(),
  save: jest.fn()}
  const {id, ...resRecord}: {id: number} = record
  let req: Partial<Request>;
  let res: Partial<Response>;

  describe('ApplicantControl Create Applicant', () => {
   
  
    beforeEach(() => {
      req = {} as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
    });
  
    it('should create an applicant', async () => {
      req.body = { ...resRecord  };
  
      await ApplicantControl.create(req as Request, res as Response);
  
      expect(ApplicantModel.create).toHaveBeenCalledWith({
        ...req.body
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'SUCCESS',
        message: 'Applicant created successfully',
      });
    });
  
    // Add more test cases for other methods...
  
    // Remember to reset mocks after each test
    afterEach(() => {
      jest.clearAllMocks();
    });
  });


  describe('ApplicantControl fetchAll', () => {
    let req: Request, res: Response;
    let axiosMock: MockAdapter;
  
    beforeEach(() => {
      req = {} as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
  
      axiosMock = new MockAdapter(axios);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
      axiosMock.restore();
    });
  
    it('should fetch all applicants successfully', async () => {
      const rows = [{ ...record }];
      const mockResponse = { rows, count: 1 };
      // Mock findAndCountAll method
      (ApplicantModel.findAndCountAll as jest.Mock).mockResolvedValue(mockResponse);
  
      // Mock axios get method
      axiosMock.onGet('/awesome/applicants').reply(200, mockResponse);
  
      await ApplicantControl.fetchAll(req, res);
  
      expect(ApplicantModel.findAndCountAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'SUCCESS',
        message: 'Applicants records fetched successfully',
        data: mockResponse
      });
    });
  
    it('should handle errors during fetch all', async () => {
      // Mock findAndCountAll method to throw an error
      (ApplicantModel.findAndCountAll as jest.Mock).mockRejectedValue(new Error('Sample error'));
  
      await ApplicantControl.fetchAll(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'ERROR',
        message: 'Error fetching applicants details',
        errors: { message: 'Sample error' },
      });
    });

  });



describe('ApplicantControl deleteAll Method', () => {
  let res: Response;
  let req: Request;
  let axiosMock: MockAdapter;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    axiosMock = new MockAdapter(axios);
  });

  // Delete all Applicants
  it('should delete all applicants', async () => {
    // Mock the truncate method
      (ApplicantModel.truncate as jest.Mock).mockResolvedValue(undefined);
  
      // Mock axios delete method
      axiosMock.onDelete('/awesome/applicants').reply(200, undefined);

    await ApplicantControl.deleteAll(req, res);

    expect(ApplicantModel.truncate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'SUCCESS',
      message: 'All Applicants records deleted successfully',
    });
  });

  it('should handle errors during delete all', async () => {
    // Mock the truncate method to throw an error
    (ApplicantModel.truncate as jest.Mock).mockRejectedValue(new Error('Sample error'));

    await ApplicantControl.deleteAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'ERROR',
      message: 'Error deleting applicants records',
      errors: { message: 'Sample error' },
    });
  });

  

});




describe('ApplicantControl DeleteOne', () => {
  /* let req: Partial<Request>;
  let res: Partial<Response>; */

  beforeEach(() => {
    req = { body: { id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should delete an applicant', async () => {
    // Mock the data returned by deleteOne
      const fakeApplicant = {dataValues:record, isNewRecord: false, destroy: jest.fn()} as any;
    const mockFindOne = jest.spyOn(ApplicantModel, 'findOne');
    mockFindOne.mockResolvedValue(fakeApplicant);

    // Mock the data returned by destroy
    const mockDestroy = jest.spyOn(ApplicantModel.prototype, 'destroy') as any;
    mockDestroy.mockResolvedValue([]);

    await ApplicantControl.deleteOne(req as Request, res as Response);

    expect(mockFindOne).toHaveBeenCalledWith({ where: { id: req.body.id } });
    // expect(mockDestroy).toHaveBeenCalledWi(undefined);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: 'SUCCESS', message: 'Applicant deleted successfully' });
  });

  it('should handle no match data found', async () => {
    const fakeApplicant = null;

    // Mock the data returned by findOne when there's no match
    jest.spyOn(ApplicantModel, 'findOne').mockResolvedValue(fakeApplicant);

    // Execute the deleteOne method
    await ApplicantControl.deleteOne(req as Request, res as Response);

    // Assert that findOne and destroy methods were not called
    expect(ApplicantModel.findOne).toHaveBeenCalled();
    expect(ApplicantModel.prototype.destroy).not.toHaveBeenCalled();

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: 'no match data found' },
    });
  });

  it('should handle errors during deletion', async () => {
    // Mock the data returned by findOne
    const mockFindOne = jest.spyOn(ApplicantModel, 'findOne');
    mockFindOne.mockResolvedValue(null);

    await ApplicantControl.deleteOne(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: { message: 'no match data found' } });
  });

  

  afterEach(() => {
    jest.clearAllMocks();
  });
});



describe('ApplicantControl fetchByName', () => {
  /* let req: Partial<Request>;
  let res: Partial<Response>; */

  beforeEach(() => {
    req = {
      body: {},
    } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it('should handle errors during fetch when wrong parameter is passed', async () => {
    req.body = { jobTitle: null };

    // Mock findOne to throw an error
    const ErrorMSG ="fullName undefined" ;
    (ApplicantModel.findAll as jest.Mock).mockResolvedValue(new Error(ErrorMSG));
    await ApplicantControl.fetchByName(req as Request, res as Response);

    expect(ApplicantModel.findAll).not.toHaveBeenCalledWith({
      where: {
        fullName: {
          [Op.like]: `%${req.body.jobTitle}%`,
        },
      },
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'ERROR',
         "errors": {
             "message": ErrorMSG,
            },
           "message": 'Error fetching applicant detail',
    });
  });

  it('should return empty list when no data was passed', async () => {
    req.body = { fullName: "NN" };

    // Mock findOne to throw an error
    // ApplicantModel.findOne.mockRejectedValue(new Error('Sample error'));
    const data = [];
    (ApplicantModel.findAll as jest.Mock).mockResolvedValue(data);
    await ApplicantControl.fetchByName(req as Request, res as Response);

    expect(ApplicantModel.findAll).toHaveBeenCalledWith({
      where: {
        fullName: {
          [Op.like]: `%${req.body.fullName}%`,
        },
      },
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'SUCCESS',
      message: 'Applicants record fetched successfully',
      data
    });
  });

  it('should fetch applicants by name', async () => {
    req.body = { fullName: 'JOHN' };

    // Mock findOne to return a sample record
    // ApplicantModel.findOne.mockResolvedValue(fakeApplicant);
    (ApplicantModel.findAll as jest.Mock).mockResolvedValue(fakeApplicant);

    await ApplicantControl.fetchByName(req as Request, res as Response);

    expect(ApplicantModel.findAll).toHaveBeenCalledWith({
      where: {
        fullName: {
          [Op.like]: '%JOHN%',
        },
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'SUCCESS',
      message: 'Applicants record fetched successfully',
      data: fakeApplicant,
    });
  });

  
  

  

  // Remember to reset mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});


 describe('ApplicantControl FetchOne', () => {
     /*    let req: Partial<Request>;
  let res: Partial<Response>; */
      
        beforeEach(() => {
          req = {
            query: {},
          } as Request;
          res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
        });
      
        it('should fetch one applicant', async () => {
          // Mock findOne to return a sample record
          (ApplicantModel.findOne as jest.Mock).mockResolvedValue(fakeApplicant);
          await ApplicantControl.fetchOne(req as Request, res as Response);
      
          expect(ApplicantModel.findOne).toHaveBeenCalledWith({
            where: {},
            limit: 100,
            offset: 0,
          });
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            status: 'SUCCESS',
            message: 'Applicants record fetched successfully',
            data: fakeApplicant,
          });
        });
      
        // it('should handle errors during fetch', async () => {
        //   // Mock findOne to throw an error
        //   (ApplicantModel.findOne as jest.Mock).mockResolvedValue(new Error('error encounter'));
        //   await ApplicantControl.fetchOne(req as Request, res as Response);
      
        //   expect(res.status).toHaveBeenCalledWith(500);
        //   expect(res.json).toHaveBeenCalledWith({
        //     status: 'ERROR',
        //     message: 'Error fetching applicant detail',
        //     errors: { message: 'error encounter' },
        //   });
        // });
      
      
        // Remember to reset mocks after each test
        afterEach(() => {
          jest.clearAllMocks();
        });
      });



      describe('ApplicantControl updateOne', () => {
       /*  let req: Partial<Request>;
        let res: Partial<Response>; */
      
        beforeEach(() => {
          req = {} as Request;
          res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          } as unknown as Response;
        });
      
        it('should update an applicant', async () => {
          req.body = { id: 1, fullName: 'Updated Name', otherField: 'value' };
      
          
          // Mock findOne to return a sample record
          (ApplicantModel.findOne as jest.Mock).mockResolvedValue(updateFakeApplicant);
          await ApplicantControl.updateOne(req as Request, res as Response);
      
          expect(ApplicantModel.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            status: 'SUCCESS',
            message: 'Applicant created successfully',
            data: updateFakeApplicant
          });
        });
      
        it('should handle no match data found', async () => {
          req.body = { id: 5, fullName: 'Updated Name', otherField: 'value' };
      
          // Mock findOne to return null, simulating no match data found
          (ApplicantModel.findOne as jest.Mock).mockResolvedValue(null);
      
          await ApplicantControl.updateOne(req as Request, res as Response);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({
            error: { message: 'no match data found' },
          });
        });
      
        
      
        // Remember to reset mocks after each test
        afterEach(() => {
          jest.clearAllMocks();
        });
      });