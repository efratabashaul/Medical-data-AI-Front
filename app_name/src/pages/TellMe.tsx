import { useState } from "react";
import Stack from '@mui/material/Stack';
import { AITellMe } from '../services/tellMe.service';
import { WaitingPage } from "./waitingPage";
import { TellMeType } from "../types/tellMe.types"; 
import mammoth from 'mammoth';
import { useNavigate } from "react-router-dom";
import pdfToText from 'react-pdftotext'


export function TellMe() {
    const [story, setStory] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); 
    const [result, setResult] = useState<TellMeType | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const navigate=useNavigate()


    const handleButtonClick = async () => {
        setLoading(true); 
        try {
            if(story==""&&fileContent==null)
                alert('נא העלה קובץ או ספר בקצרה את מה שקרה!')
            else{
                const newS = story + fileContent;
                const result: TellMeType = await AITellMe(newS);
                setResult(result); 
                navigate('/check', { state: { result } })
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileg = event.target.files?.[0]
        pdfToText(fileg!)
            .then(text => console.log(text))
            .catch(error => console.error("Failed to extract text from pdf"))

        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);

            if (file.type === 'application/pdf') {
                const text = await readPdf(file);
                setFileContent(text);
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const text = await readWord(file);
                setFileContent(text);
            } else if (file.type === 'text/plain') {
                const text = await readAsText(file);
                setFileContent(text);
            }else{
                alert("יש להעלות קבצי PDF, WORD,TXT !נא נסה שוב!")
            }
        }
    };


    const readPdf = async (file: File): Promise<string> => {
        try {
            const text = await pdfToText(file);
            console.log(text); 
            return text;
        } catch (error) {
            console.error("Failed to extract text from pdf:", error);
            return ''; 
        }
    };
    

    const readWord = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    };

    const readAsText = async (file: File) => {
        const text = await file.text();
        return text;
    };

    if(loading)
        return <WaitingPage></WaitingPage>

    return (
        <Stack alignItems={"center"}>
            <h1 className="h">ספר לי בקצרה מה קרה</h1>
            <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="ספר לי בקצרה מה קרה"
            />
            <div className="text">
                <input className="inputFile" type="file" accept="*/*" onChange={handleFileChange} />
            </div>
            <button className="buttonSubmit" onClick={handleButtonClick}>אישור</button>
        </Stack>
    );
}