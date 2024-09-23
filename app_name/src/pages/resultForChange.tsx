import { useLocation, useNavigate } from 'react-router-dom';
import { ResultPageProps } from '../types/tellMe.types';
import React, { useState } from 'react';
import { PageSubmit } from './pageSubmit';
import { PageMiss } from './pageMiss';
import { Add } from '../services/tellMe.service';

export function ResultPageChange() {
    const location = useLocation();
     const data = location.state?.updatedData;
     const navigate = useNavigate();  
    const [updatedData, setFormData] = useState(data);

    const handleSubmit = async () => {
        console.log("formData?.date");
        
        console.log(updatedData?.date);
        
        if(updatedData?.id&&String(updatedData.id)!=""&&updatedData?.date&&updatedData.date!=""&&updatedData?.age&&updatedData.age!=""&&updatedData.doctorType&&updatedData.doctorType!=""&&updatedData.hospital&&updatedData.hospital!=""&&updatedData.name&&updatedData.name!=""&&updatedData.nameFather&&updatedData.nameFather!=""){
            await Add(updatedData)
            navigate('/submit');  
        }
        else
            navigate('/pageMiss', { state: {  updatedData } }); 
    };
    console.log("formmm");
    
    console.log(updatedData);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...updatedData!,
            [name]: value,
        });
    };

     const normalizeDate = (dateString:String) => {        
        
        if(dateString!=undefined&&dateString!=""&&dateString!=null){
            const cleanedDateString = dateString.replace(/[/.-]/g, '-');
        
            const [day, month, year] = cleanedDateString.split('-');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

    };
    let isoDate = normalizeDate(updatedData.date); 

    return (
        <div className='warpDiv'>
            <h1 className='h'>שנה את הנתונים..</h1>
            {updatedData ? (
                <div>
                           <div>
                        <label>ת.ז.:</label>
                        <input
                            type="text"
                            name="id"
                            value={updatedData.id}
                            onChange={handleInputChange}
                        />
                    </div>
                           <div>
                        <label>תאריך:</label>
                             <input
                                 type="date"
                           name="date"
                          value={isoDate}
                         onChange={handleInputChange}
                                  />
                    </div>
                    <div>
                        <label>גיל:</label>
                        <input
                            type="text"
                            name="age"
                            value={updatedData.age}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>סוג רופא:</label>
                        <input
                            type="text"
                            name="doctorType"
                            value={updatedData.doctorType}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>בית חולים:</label>
                        <input
                            type="text"
                            name="hospital"
                            value={updatedData.hospital}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>שם:</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>שם האבא:</label>
                        <input
                            type="text"
                            name="nameFather"
                            value={updatedData.nameFather}
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
