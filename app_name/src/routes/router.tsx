import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { PATHS } from './paths';
import { ResultPageChange } from '../pages/resultForChange';
import { TellMe } from '../pages/TellMe';
import { PageSubmit } from '../pages/pageSubmit';
import { PageMiss } from '../pages/pageMiss';
import { ResultPageCheck } from '../pages/dataForCheck';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div>
                <header></header>
                <Outlet /> {/* זהו המקום שבו ייטען התוכן של הילדים */}
            </div>
        ),
        children: [
            {
                path: '',
                element: <TellMe />, // דף הבית
            },
            {
                path: PATHS.result,
                element: <ResultPageChange/>, // דף התוצאות
            },
            {
                path: PATHS.submit,
                element: <PageSubmit />, // דף התוצאות
            },
            {
                path: PATHS.miss,
                element: <PageMiss />, // דף התוצאות
            },
            {
                path: PATHS.check,
                element: <ResultPageCheck/>, // דף התוצאות
            }
        ],
    },
    {
        path: '/',
        element: <Navigate to={PATHS.home} />, // ניתוב לנתיב הבית כאשר מגיעים לשורש
        index: true
    },
    {
        path: '*',
        element: <h1>404</h1> // דף 404 עבור ניתוב לא תקין
    },
]);
