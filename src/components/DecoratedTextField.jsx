import { useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import { Search } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { findQuery } from '../pages/SearchPage'

function DecoratedTextField({ paddingTop = '10px', paddingBottom = '8px', placeholder, label, colorClass, currentQuery, setCurrentQuery, queries, setQueries, setDuplicateQueries, localStorageKey, profileLabel }) {
    const theme = useTheme();

    const [snackBarQueries, setSnackbarQueries] = useState([])

    console.log('queries', queries)

    const handleClose = (_, reason) => {
      if (reason === 'clickaway') {
        return
      }

      setSnackbarQueries([])
    }

    const addToProfile = (queries) => {
      let user = JSON.parse(localStorage.getItem('userData'))
      if (user[localStorageKey]) {
        queries.forEach((query) => {
          if (findQuery(user[localStorageKey], query) === undefined) {
            user[localStorageKey].push(query)
          }
        })
      } else {
        user[localStorageKey] = queries
      }
      localStorage.setItem('userData', JSON.stringify(user))
    }

    const removeFromProfile = () => {
      let user = JSON.parse(localStorage.getItem('userData'))
      user[localStorageKey] = user[localStorageKey].filter((item) => !snackBarQueries.includes(item))
      localStorage.setItem('userData', JSON.stringify(user))
    }
    
    return (
      <>
        {/* TODO: Actually add new queries to profile & add undo button functionality */}
        <Snackbar open={snackBarQueries.length > 0} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            <div>We added {snackBarQueries.map((query) => `"${query}"`).join(', ')} to the {profileLabel} in your profile!</div>
            <Button size="small" color="error" onClick={removeFromProfile}>Undo</Button>
          </Alert>
        </Snackbar>
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

                        // reset duplicate queries
                        setDuplicateQueries([])

                        const items = currentQuery.split(',').map((item) => item.trim())

                        const newQueries = []
                        const duplicateQueries = []

                        for (let item of items) {
                          const duplicateQuery = findQuery(queries, item)
                          if (duplicateQuery) {
                            duplicateQueries.push(duplicateQuery)
                          }
                          // If the search box isn't empty & contains an element that hasn't already been searched, then add it to the list of saved queries
                          else if (item !== '' && findQuery(newQueries, item) === undefined) { // prevent duplicates
                            newQueries.push(item)
                          }
                        }

                        if (duplicateQueries.length > 0) {
                          setDuplicateQueries(duplicateQueries)
                        }
                        
                        if (newQueries.length > 0) {
                          setQueries([...queries, ...newQueries])
                          setSnackbarQueries(newQueries)
                          addToProfile(newQueries)
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