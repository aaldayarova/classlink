import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import { InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { Link } from 'react-router-dom'

const EMPTY_QUERY = { name: '', categoryId: -1 }

// TODO: Add actual categories
const categories = [
    { id: 1, label: 'Food' },
    { id: 2, label: 'Sports' },
    { id: 3, label: 'Performing Arts' },
    { id: 4, label: 'Technology' },
]

// TODO: Create actual storage for profiles
const profiles = [
    {
        name: 'Aika Aldayarova',
        pronouns: 'she/her',
        house: 'Eliot',
        year: '2024',
        interests: {
            4: ['Blockchain']
        }
    },
    {
        name: 'Olivia Wenzel',
        pronouns: 'she/her',
        house: 'Eliot',
        year: '2024',
        interests: {
            1: ['Chicken', 'Tacos'],
            2: ['Basketball'],
        }
    },
]

function SearchPage() {
    const [selectedCategory, setSelectedCategory] = useState()
    const [currentQuery, setCurrentQuery] = useState(EMPTY_QUERY)
    const [queries, setQueries] = useState([])

    // This computes on every render, which is very inefficient.
    // TODO: Consider when/how to compute more efficiently...
    const matchingProfiles = profiles.filter((profile) => {
        for (let query of queries) {
            const { name, categoryId } = query;
            let profileCategory = profile.interests[categoryId];

            if (profileCategory) {
                if (profileCategory.includes(name)) {
                    continue;
                }
            }
            return false;
        }
        return true;
    })

    return (
        <>
            {/* TODO: Add profile photo */}
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to='/profile' style={{ textDecoration: 'none' }}>
                        <Avatar alt="Your Profile">P</Avatar>
                    </Link>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">"I want to find people by </Typography>
                </Grid>
                <Grid item>
                    {/*
                    TODO: Consider adding categories for the dropdown, like the "With categories" example here: https://mui.com/material-ui/react-autocomplete/
                    */}
                    <Autocomplete
                      defaultValue={null}
                      isOptionEqualToValue={(option, value) => option.id === value.id && option.name === value.name}
                      value={selectedCategory || null}
                      onChange={(_, newValue) => {
                          setSelectedCategory(newValue)
                      }}
                      disablePortal
                      id="combo-box-demo"
                      options={categories}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h3"> ..."</Typography>
                </Grid>
            </Grid>
            <Grid container>
                {queries.map((query, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip
                                label={query.name}
                                onDelete={() => {
                                    setQueries(queries.filter((q) => !(q.name === query.name && q.categoryId === query.categoryId)))
                                }}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            {/* It might be jarring to completely remove the search box when a category isn't selected.
            Alternatively, we can disable the text field when a category isn't selected. We'll need to play around
            with styling though. */}
            {selectedCategory && <Grid container>
                <Grid item>
                    <TextField 
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                      }}
                      value={currentQuery.name}
                      onChange={(event) => {
                        setCurrentQuery({
                            name: event.target.value,
                            categoryId: selectedCategory.id
                        })
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                            
                            // If the search box isn't empty & contains an element that hasn't already been searched, then add it to the list of saved queries
                            if (currentQuery.name.trim() !== '' && !(queries.find((query) => query.name === currentQuery.name && query.categoryId === currentQuery.categoryId))) { // prevent duplicates
                                setQueries([...queries, currentQuery])
                            }
                            // Clear the search box
                            setCurrentQuery(EMPTY_QUERY)
                        }
                      }}
                    />
                </Grid>
            </Grid>}
            <hr />
            {queries.length > 0 && 
            <>
                <Box sx={{ display: 'inline-block', transform: 'scale(0.8)' }}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">
                                Found {matchingProfiles.length} {matchingProfiles.length === 1 ? 'person' : 'people'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Grid container spacing={2}>
                    {matchingProfiles.map((profile, index) => {
                        return (
                            <Grid item key={index}>
                                {/* TODO: Add more of profile to card */}
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {profile.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </>}
        </>
    )
  }
  
  export default SearchPage
