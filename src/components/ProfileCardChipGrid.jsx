import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

function ProfileCardChipGrid({ items, colorClass }) {
    const theme = useTheme();
    
    return (
        items.map((item, index) => {
            return (
                <Grid item key={index}>
                    <Chip
                        label={item}
                        sx={{
                            backgroundColor: theme.palette.customColors[colorClass].bg,
                            border: `1px solid ${theme.palette.customColors[colorClass].main}`, 
                            borderRadius: "50px", 
                        }}
                    />
                </Grid>
            )
        })
    )
}

export default ProfileCardChipGrid