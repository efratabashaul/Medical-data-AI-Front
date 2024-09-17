import { useLocation, useNavigate } from 'react-router-dom';
import { ResultPageProps } from '../types/tellMe.types';
import React, { useState } from 'react';
import { Add } from '../services/tellMe.service';

export function PageMiss() {
    const location = useLocation();
    const data = location.state?.formData; // הנתונים שהעברנו
    const navigate = useNavigate();  // כאן אנו משתמשים ב-useNavigate לצורך ניווט       
    // ניצור state מקומי עבור הנתונים כדי לאפשר עריכה
    const [formData, setFormData] = useState(data);
    console.log(location.state.formData);
    

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

    let isoDate = normalizeDate(formData.date);  // יומר ל-YYYY-MM-DD


    // פונקציה לעדכון שדות הטקסט
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData!,
            [name]: value,
        });
    };
    console.log("new ageee miss"+formData);
    
    const handleSubmit = async () => {
        if(formData?.date&&formData.date!=""&&formData?.age&&formData.age!=""&&formData.doctorType&&formData.doctorType!=""&&formData.hospital&&formData.hospital!=""&&formData.name&&formData.name!=""&&formData.nameFather&&formData.nameFather!="")
        {
            await Add(formData)
            navigate('/submit')
        }
        else
            alert('נא מלא את פרטיך!')
    };

    return (
        <div>
            <h1 className='h'>מעולה חסרים לנו ממש מספר פרטים כדי לסיים את התהליך</h1>
            {formData ? (
                <div>

                    {data.id == null || data.id == undefined ||data.id==""&& (
                        <div>
                        <label>Id:</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                        />
                       </div>
                     )}  

                    {data.date == null || data.date == undefined ||data.date==""&& (
                        <div>
                        <label>Date:</label>
                        <input
                                 type="date"
                           name="date"
                          value={isoDate}
                         onChange={handleInputChange}
                                  />
                    </div>
                     )}  
                        
                    {data.age == null || data.age == undefined ||data.age==""&& (      
                    <div>
                        <label>Age:</label>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                        />
                    </div>  
                    )}  
                         {data.doctorType == null|| data.doctorType == undefined||data.doctorType=="" && (
                    <div>
                        <label>Doctor Type:</label>
                        <input
                            type="text"
                            name="doctorType"
                            value={formData.doctorType}
                            onChange={handleInputChange}
                        />
                    </div> 
                     )}  
                        {data.hospital == null || data.hospital == undefined ||data.hospital==""&& ( 
                    <div>
                        <label>Hospital:</label>
                        <input
                            type="text"
                            name="hospital"
                            value={formData.hospital}
                            onChange={handleInputChange}
                        />
                    </div>  )}  
                    {data.name == null ||data.name == undefined ||data.name==""&& (
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>  )}  
                    {data.nameFather == null ||data.nameFather== undefined ||data.nameFather==""&& ( 
                    <div>
                        <label>Father's Name:</label>
                        <input
                            type="text"
                            name="nameFather"
                            value={formData.nameFather}
                            onChange={handleInputChange}
                        />
                    </div>  )}  
                        
                </div>
            ) : (
                <p>No data available</p>
            )}
           <button onClick={handleSubmit}>לחץ לאישור</button>

        </div>
    );
}
