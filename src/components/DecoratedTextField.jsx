import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Search } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function DecoratedTextField({ paddingTop = '10px', paddingBottom = '8px', label, colorClass, currentQuery, setCurrentQuery, queries, setQueries }) {
    const theme = useTheme();
    
    return (
        <>
            <Grid container sx={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}>
                <Grid item>
                    <Typography variant="h6">{label}</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ width: '100%' }}>
                <Grid item>
                    <TextField 
                      variant="outlined"
                      sx={{ 
                        backgroundColor: theme.palette.customColors[colorClass].bg, 
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.customColors[colorClass].hover,
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.customColors[colorClass].hover,
                        },
                        width: "100%",
                      }}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                {/* sx={{ "&:hover": { color: theme.palette.customColors.info.hover }, "&:active": { color: theme.palette.customColors.info.hover } }} */}
                                <Search />
                            </InputAdornment>
                        )
                      }}
                      value={currentQuery}
                      onChange={(event) => {
                        setCurrentQuery(event.target.value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()

                            const trimmed = currentQuery.trim()
                            
                            // If the search box isn't empty & contains an element that hasn't already been searched, then add it to the list of saved queries
                            if (trimmed !== '' && !(queries.includes(trimmed))) { // prevent duplicates
                                setQueries([...queries, trimmed])
                            }
                            // Clear the search box
                            setCurrentQuery("")
                        }
                      }}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default DecoratedTextField