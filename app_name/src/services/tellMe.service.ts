import { TellMeType } from '../types/tellMe.types';
import axiosInstance from '../utils/axios';

// הגדרה של הפונקציה AITellMe עם טיפוס ההחזרה הנכון TellMeType
export const AITellMe = async (story: string): Promise<TellMeType> => {
    try {
        // קריאת AXIOS מסוג GET עם פרמטרים ב-URL
        const response = await axiosInstance.get<TellMeType>(`/process_text`, {
            params: {
                text: story  // שימוש בפרמטרים במקום body
            }
        });

        // מחזיר את הנתונים מהשרת, שכבר אמורים להיות מסוג TellMeType
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // טיפול בשגיאה, כדי שהפונקציה לא תחזיר undefined במקרה של כשל
    }
};

export const Add = async (injuri: TellMeType): Promise<TellMeType> => {
    try {
        // קריאת AXIOS מסוג POST עם פרמטרים ב-body ישירות
        const response = await axiosInstance.post<TellMeType>(`/process_text`, injuri);

        // מחזיר את הנתונים מהשרת, שכבר אמורים להיות מסוג TellMeType
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // טיפול בשגיאה, כדי שהפונקציה לא תחזיר undefined במקרה של כשל
    }
};

