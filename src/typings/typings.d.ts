export interface IApplicants  {
    id:number,
    fullName?: string,
    jobTitle?: string,
    experienceSummary?: string,
    skills?: string[],
}

export interface IFakeApplicant  {
    dataValues: IApplicants
    isNewRecord: boolean,
    destroy: ()=> {}
}

export interface IUpdateFakeApplicant  {
    dataValues: IApplicants
    isNewRecord: boolean,
    destroy: ()=> {},
    set: (data:any)=> {},
    save: (data:any)=> {}
}
