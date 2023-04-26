import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
        pressed: '#33196B',
        main: '#5632A1',
        secondary: '#F9F4FF',
        hover: '#9C55F6',
        border: '#C0BBF4',
        bg: '#E8E7FD',
        focus: '#D7C9FF',
    },
    info: {
        pressed: '#0143A7',
        main: '#0150C8',
        bg: '#E7EDF6',
        focus: '#CCDCF4',
        border: '#9FC2F5',
        hover: '#2B6DD1',
    },
    success: {
        pressed: '#033402',
        main: '#198754',
        bg: '#F1FAF0',
        focus: '#ABC7AA',
        border: '#7CB97A',
        hover: '#568F55',
    },
    warning: {
        pressed: '#EDCA03',
        main: '#FFD900',
        bg: '#FDF8DE',
        focus: '#FFF2AA',
        border: '#FFEC80',
        hover: '#FFE655',
    },
  },
});
