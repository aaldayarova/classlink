import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

function ChipGrid({ queries, colorClass, setQueries }) {
    const theme = useTheme();
    
    return (
        queries.map((query, index) => {
            return (
                <Grid item key={index}>
                    <Chip
                        sx={{ 
                            backgroundColor: theme.palette.customColors[colorClass].bg, 
                            border: `1px solid ${theme.palette.customColors[colorClass].main}`, 
                            borderRadius: "50px", 
                            "& .MuiChip-deleteIcon": {
                                color: theme.palette.customColors[colorClass].main,
                                "&:hover": {
                                    color: theme.palette.customColors[colorClass].hover // Change this value to adjust the color when hovering over the delete icon
                                },
                                "&:active": {
                                    color: theme.palette.customColors[colorClass].pressed // Change this value to adjust the color when clicking on the delete icon
                                }
                            },
                        }}
                        label={query}
                        onDelete={() => {
                            setQueries(queries.filter((q) => q !== query))
                        }}
                    />
                </Grid>
            )
        })
    )
}

export default ChipGrid