import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { AITellMe } from '../services/tellMe.service';
import { WaitingPage } from "./waitingPage"; // עדכן את הנתיב בהתאם
import { TellMeType } from "../types/tellMe.types";
import * as pdfjsLib from 'pdfjs-dist';



export function TellMe() {
    const [story, setStory] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); // מצב טוען
    const [result, setResult] = useState<TellMeType | null>(null); // הנתונים שיתקבלו.
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const navigate = useNavigate();  // כאן אנו משתמשים ב-useNavigate לצורך ניווט

    // הוספת useEffect לצורך ניווט לאחר קבלת התוצאה
    useEffect(() => {
        if (result) {
            console.log("result"+result.age);
            
            // ניווט לדף התוצאה כאשר יש נתונים
            navigate('/check', { state: { result } });
        }
    }, [result, navigate]);

    const handleButtonClick = async () => {
        setLoading(true); // הצגת דף הביניים
        try {
            const newS=story+fileContent
            const result: TellMeType = await AITellMe(newS);
            // console.log(result);
            setResult(result); // שמירת התוצאה
        } catch (error) {
            console.error('Error:', error);
            // ניתן להוסיף טיפול בשגיאות או העברת המשתמש לדף שגיאה
        } finally {
            setLoading(false); // החזרת מצב הטוען
        }
    };

    if (loading) {
        return <WaitingPage />;
    }


console.log("contebttt");
console.log(fileContent);


const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setFileName(file.name);

        if (file.type === 'application/pdf') {
            const text = await readPdf(file);
            setFileContent(text);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const text = await readWord(file);
            setFileContent(text);
        } else {
            const text = await readAsText(file);
            setFileContent(text);
        }
    }
};



    const readPdf = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let text = '';
        for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(' ');
        }
        return text;
    };

    const readWord = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();
        const doc = new Document(arrayBuffer);
        let text = '';
        doc.paragraphs.forEach(paragraph => {
            text += paragraph.text + '\n';
        });
        return text;
    };

    const readAsText = async (file: File) => {
        const text = await file.text();
        return text;
    };


    const handleSubmit = async () => {
        if (!fileContent) {
            alert("Please upload a file.");
            return;
        }

        // שליחה לשרת Python
        // try {
        //     const response = await 

        //     const result = await response.json();
        //     console.log('Response from server:', result);
        // } catch (error) {
        //     console.error('Error uploading file:', error);
        // }
    };



    return (
        <Stack alignItems={"center"}>
            <h1 className="h">ספר לי בקצרה מה קרה</h1>
            <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="ספר לי בקצרה מה קרה"
            />
                          <div>
            <input type="file" accept="*/*" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
            <button className="buttonSubmit" onClick={handleButtonClick}>אישור</button>
        </Stack>
    );
}
