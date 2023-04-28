import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Search } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function DecoratedTextField({ paddingTop = '10px', paddingBottom = '8px', placeholder, label, colorClass, currentQuery, setCurrentQuery, queries, setQueries }) {
    const theme = useTheme();
    
    return (
        <>
            <Grid container sx={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}>
                <Grid item>
                    <Typography variant="h6">{label}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <TextField 
                      placeholder={placeholder}
                      variant="outlined"
                      sx={{ 
                        backgroundColor: theme.palette.customColors[colorClass].bg, 
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.customColors[colorClass].hover,
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.customColors[colorClass].hover,
                        },
                        width: "930px",
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
                            const items = trimmed.split(',')

                            const newQueries = []

                            for (let item of items) {
                              // If the search box isn't empty & contains an element that hasn't already been searched, then add it to the list of saved queries
                              if (item !== '' && !(queries.includes(item))) { // prevent duplicates
                                newQueries.push(item)
                              }
                            }
                            
                            if (newQueries.length > 0) {
                              setQueries([...queries, ...newQueries])
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