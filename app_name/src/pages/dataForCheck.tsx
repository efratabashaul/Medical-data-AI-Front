import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ResultPageProps, TellMeType } from '../types/tellMe.types';
import { Add } from '../services/tellMe.service';
import { log } from 'console';


export function ResultPageCheck() {
    const navigate = useNavigate();  // כאן אנו משתמשים ב-useNavigate לצורך ניווט
    const location = useLocation(); 
    const data = location.state?.result; // הנתונים שהעברנו
    const date = new Date(data.date); // נניח שיש לך תאריך מסוג 'Date'

    // חילוץ היום, החודש והשנה
    const day = date.getUTCDate();     // מחזיר את היום של החודש
    const month = date.getUTCMonth() + 1;  // מחזיר את החודש (0-11), מוסיפים 1 כדי לקבל את המספר הנכון
    const year = date.getUTCFullYear();   // מחזיר את השנה
    const formattedDate=day+"/"+month+"/"+year
    console.log("fffffff");
    
    console.log(formattedDate);
    
    const updatedData :TellMeType= {
        ...data,
        date: formattedDate// עדכון התאריך לפורמט הרצוי
    };
    console.log("updddd");
    
    console.log(updatedData);
    console.log(updatedData.date);
    
    
    const handleChange = async () => {
        navigate('/resultChange', { state: { updatedData } });  // ניווט לדף שינוי עם הנתונים
    };    

    
    const handleSubmit = async () => {

        if(updatedData?.date&&updatedData.date!=""&&updatedData?.age&&String( updatedData.age)!=""&&updatedData.doctorType&&updatedData.doctorType!=""&&updatedData.hospital&&updatedData.hospital!=""&&updatedData.name&&updatedData.name!=""&&updatedData.nameFather&&updatedData.nameFather!=""){
            console.log("date:  "+updatedData?.date);
            await Add(updatedData)
            navigate('/submit')
        }
        else
            navigate('/pageMiss', { state: { updatedData } });  // ניווט לדף שינוי עם הנתונים
        
    };
    return (
        <div className='warpDiv'>
            <h1 className='h'>Result Page</h1>
            {updatedData ? (
                <div>
                    <p>Age: {updatedData.age}</p>
                    <p>Date: {updatedData.date ? updatedData.date: 'No date available'}</p>
                    <p>Doctor Type: {updatedData.doctorType}</p>
                    <p>Hospital: {updatedData.hospital}</p>
                    <p>Name: {updatedData.name}</p>
                    <p>Father's Name: {updatedData.nameFather}</p>
                </div>
            ) : (
                <p>No data available</p>
            )}
            <button className='buttonSubmit' onClick={handleSubmit }>לחץ לאישור</button>
            <button className='buttonSubmit' onClick={handleChange}>לחץ לשינוי</button>

        </div>
    );
}