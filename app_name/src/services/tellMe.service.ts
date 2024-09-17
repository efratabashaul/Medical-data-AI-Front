import axios from 'axios';
import { TellMeType } from '../types/tellMe.types';
import axiosInstance from '../utils/axios';

export const AITellMe = async (story: string): Promise<TellMeType> => {
    try {
        const response = await axiosInstance.get<TellMeType>(`/process_text`, {
            params: {
                text: story
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Server Error:', error.response.data);
            alert('שגיאה בשרת: ' + error.response.data.message);
        } else {
            console.error('Network or Other Error:', error);
            alert('אירעה שגיאה ברשת או שגיאה אחרת.');
        }
        throw error; 
    }
};


export const Add = async (injuri: TellMeType): Promise<TellMeType> => {
    try {
        const response = await axiosInstance.post<TellMeType>(`/process_text`, injuri);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('לא הזנת מספיק נתונים!')
        throw error;
    }
};

