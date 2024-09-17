export type TellMeType={
    name:string ,
    nameFather :string,
    age :number,
    id :number,
    hospital:string,
    medicalForm:string,
    doctorType:string,
    date:String
}
export interface ResultPageProps {
    data: TellMeType|null;
}