import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ResultPageProps, TellMeType } from '../types/tellMe.types';
import { Add } from '../services/tellMe.service';
import { log } from 'console';


export function ResultPageCheck() {
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const data = location.state?.result; 
    console.log(data);
    console.log(data.date);
    
    const date = new Date(data.date); 

    const day = date.getUTCDate();   
    const month = date.getUTCMonth() + 1; 
    const year = date.getUTCFullYear();  
    const formattedDate=day+"/"+month+"/"+year
    console.log("fffffff");
    
    console.log(formattedDate);
    
    const updatedData :TellMeType= {
        ...data,
        date: formattedDate
    };
    console.log("updddd");
    
    console.log(updatedData);
    console.log(updatedData.date);
    
    
    const handleChange = async () => {
        navigate('/resultChange', { state: { updatedData } }); 
    };    

    console.log(updatedData);
    console.log(updatedData.date);
    console.log("ageeee");
        
    console.log(updatedData.id);
    const handleSubmit = async () => {
 
        if(updatedData?.id&&String(updatedData.id)!=""&&updatedData?.date&&updatedData.date!=""&&updatedData?.age&&String( updatedData.age)!=""&&updatedData.doctorType&&updatedData.doctorType!=""&&updatedData.hospital&&updatedData.hospital!=""&&updatedData.name&&updatedData.name!=""&&updatedData.nameFather&&updatedData.nameFather!=""){
            console.log("date:  "+updatedData?.date);
            await Add(updatedData)
            navigate('/submit')
        }
        else
            navigate('/pageMiss', { state: { updatedData } }); 
        
    };
    return (
        <div className='warpDiv'>
            <h1 className='h'>בדיקת נתונים</h1>
            {updatedData ? (
                <div className='text'>
                  {updatedData.id&&(<p>ת.ז.: {updatedData.id}</p>)}
                    {updatedData.age&&(<p>גיל: {updatedData.age}</p>)}
                   {updatedData.date&&( <p>תאריך: {updatedData.date ? updatedData.date: 'No date available'}</p>)}
                 {updatedData.doctorType&&( <p>סוג רופא: {updatedData.doctorType}</p>)}
                   {updatedData.hospital&&( <p>בית חולים: {updatedData.hospital}</p>)}
                    {updatedData.name&&(<p>שם: {updatedData.name}</p>)}
                   {updatedData.nameFather&&( <p>שם האבא: {updatedData.nameFather}</p>)}
                </div>
            ) : (
                <p>No data available</p>
            )}
            <button className='buttonSubmit' onClick={handleSubmit }>לחץ לאישור</button>
            <button className='buttonSubmit' onClick={handleChange}>לחץ לשינוי</button>
        </div>
    );
}