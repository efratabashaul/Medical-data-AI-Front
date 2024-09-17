import { CircularProgress, Stack, Typography } from '@mui/material';

export function WaitingPage() {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            style={{ height: '100vh' }}
        >
            <CircularProgress />
            <Typography variant="h6" style={{ marginTop: 20}}>
                ממתין לבדיקת מערכת
            </Typography>
        </Stack>
    );
}
