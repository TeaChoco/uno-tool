//-Path: "uno-tool/src/App.tsx"
import Theme from './theme/Theme';
import Display from './content/display/Display';
import Background from './components/Background';
import { Box, ThemeProvider } from '@mui/material';

export default function App() {
    const theme = Theme();

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    zIndex: 10,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    position: 'fixed',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: theme.palette.background.default,
                }}>
                <Background />
                <Display />
            </Box>
        </ThemeProvider>
    );
}
