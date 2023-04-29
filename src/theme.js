import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
  },
  palette: {
    customColors: {
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
          // border: '#F8D825',
          border: '#FFEC80',
          hover: '#FFE655',
        },
        neutral: {
          10: '#FFFFFF',
          20: '#F5F5F5',
          30: '#EDEDED',
          40: '#E0E0E0',
          50: '#C2C2C2',
          60: '#9E9E9E',
          70: '#757575',
          80: '#616161',
          90: '#424242',
          100: '#0A0A0A',
        },
        danger: {
          pressed: '#B90209',
          main: '#DC3545',
          bg: '#FEEDEE',
          focus: '#F0B3B6',
          border: '#E88D91',
          hover: '#E1676C',
        },
      },
    },
});
