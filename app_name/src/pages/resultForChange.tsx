import { useLocation, useNavigate } from 'react-router-dom';
import { ResultPageProps } from '../types/tellMe.types';
import React, { useState } from 'react';
import { PageSubmit } from './pageSubmit';
import { PageMiss } from './pageMiss';
import { Add } from '../services/tellMe.service';

export function ResultPageChange() {
    const location = useLocation();
     const data = location.state?.updatedData; // הנתונים שהעברנו
     const navigate = useNavigate();  // כאן אנו משתמשים ב-useNavigate לצורך ניווט

    // ניצור state מקומי עבור הנתונים כדי לאפשר עריכה
    const [formData, setFormData] = useState(data);

    const handleSubmit = async () => {
        console.log("formData?.date");
        
        console.log(formData?.date);
        
        if(formData?.date&&formData.date!=""&&formData?.age&&formData.age!=""&&formData.doctorType&&formData.doctorType!=""&&formData.hospital&&formData.hospital!=""&&formData.name&&formData.name!=""&&formData.nameFather&&formData.nameFather!=""){
            await Add(formData)
            navigate('/submit');  // ניווט לדף שינוי עם הנתונים
        }
        else
            navigate('/pageMiss', { state: { formData } });  // ניווט לדף שינוי עם הנתונים
    };
    console.log("formmm");
    
    console.log(formData);
    

    // פונקציה לעדכון שדות הטקסט
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData!,
            [name]: value,
        });
    };

     const normalizeDate = (dateString:String) => {
        console.log("dateString");
        
        console.log(dateString);
        
        // החלפת כל המפרידים השונים (/, ., -) בתו -
        if(dateString!=undefined&&dateString!=""&&dateString!=null){
            const cleanedDateString = dateString.replace(/[/.-]/g, '-');
        
            // פיצול התאריך למרכיבים (יום, חודש, שנה)
            const [day, month, year] = cleanedDateString.split('-');
        
            // החזרת התאריך בפורמט YYYY-MM-DD
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

    };

// דוגמה לשימוש
    let isoDate = normalizeDate(formData.date);  // יומר ל-YYYY-MM-DD


    return (
        <div className='warpDiv'>
            <h1 className='h'>Result Page</h1>
            {formData ? (
                <div>
                           <div>
                        <label>Id:</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                        />
                    </div>
                           <div>
                        <label>Date:</label>
                             <input
                                 type="date"
                           name="date"
                          value={isoDate}
                         onChange={handleInputChange}
                                  />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Doctor Type:</label>
                        <input
                            type="text"
                            name="doctorType"
                            value={formData.doctorType}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Hospital:</label>
                        <input
                            type="text"
                            name="hospital"
                            value={formData.hospital}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Father's Name:</label>
                        <input
                            type="text"
                            name="nameFather"
                            value={formData.nameFather}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            ) : (
                <p>No data available</p>
            )}
           <button className='buttonSubmit' onClick={handleSubmit}>אישור </button>

        </div>
    );
}
