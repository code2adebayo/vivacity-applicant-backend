import { IApplicants } from './../typings/typings.d';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './_config';

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type ApplicantCreationAttributes = Optional<IApplicants, 'id'>;

class ApplicantModel extends Model<IApplicants, ApplicantCreationAttributes> {
  declare id: number;
  declare fullName: string;
  declare jobTitle: string;
  declare experienceSummary: string;
  declare skills: string[];
       
}

ApplicantModel.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    experienceSummary: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  }, { sequelize, modelName: 'Applicants' });

export default ApplicantModel;