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
    const [formData, setFormData] = useState(data);

    const handleSubmit = async () => {
        console.log("formData?.date");
        
        console.log(formData?.date);
        
        if(formData?.date&&formData.date!=""&&formData?.age&&formData.age!=""&&formData.doctorType&&formData.doctorType!=""&&formData.hospital&&formData.hospital!=""&&formData.name&&formData.name!=""&&formData.nameFather&&formData.nameFather!=""){
            await Add(formData)
            navigate('/submit');  
        }
        else
            navigate('/pageMiss', { state: { formData } }); 
    };
    console.log("formmm");
    
    console.log(formData);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData!,
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
    let isoDate = normalizeDate(formData.date); 

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
