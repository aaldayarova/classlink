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

// Category type ids:
const STUDY_BUDDY_ID = 1;
const COFOUNDER_ID = 2;

// Query types:
const STUDY_BUDDY_WORK_ON_QUERY_ID = 1;
const COFOUNDER_INTEREST_QUERY_ID = 2;
const COFOUNDER_SKILL_QUERY_ID = 3;

// TODO: Add actual categories
const categories = [
    { id: STUDY_BUDDY_ID, label: 'Study buddy' },
    { id: COFOUNDER_ID, label: 'Cofounder' },
]

// TODO: Create actual storage for profiles
const profiles = [
    {
        name: 'Aika Aldayarova',
        pronouns: 'she/her',
        house: 'Eliot',
        year: '2024',
        concentration: 'Computer Science',
        studyBuddyInterests: ['Science', 'CS 178'],
        cofounderInterests: ['Food', 'Science'],
        cofounderSkills: ['Robotics'],
    },
    {
        name: 'Olivia Wenzel',
        pronouns: 'she/her',
        house: 'Eliot',
        year: '2024',
        concentration: '',
        studyBuddyInterests: ['Science', 'CS 178'],
        cofounderInterests: ['Food', 'Science'],
        cofounderSkills: ['Robotics'],
    },
]

function SearchPage() {
    const [selectedCategory, setSelectedCategory] = useState()

    const [currentStudyBuddyQuery, setCurrentStudyBuddyQuery] = useState("")
    const [currentCofounderInterestQuery, setCurrentCofounderInterestQuery] = useState("")
    const [currentCofounderSkillQuery, setCurrentCofounderSkillQuery] = useState("")

    const [studyBuddyQueries, setStudyBuddyQueries] = useState([])
    const [cofounderInterestQueries, setCofounderInterestQueries] = useState([])
    const [cofounderSkillQueries, setCofounderSkillQueries] = useState([])

    // This computes on every render, which is very inefficient.
    // TODO: Consider when/how to compute more efficiently...

    const matchingProfiles = selectedCategory ? profiles.filter((profile) => {
        if (selectedCategory.id === STUDY_BUDDY_ID) {
            for (let query of studyBuddyQueries) {
                if (profile.studyBuddyInterests.includes(query)) {
                    continue
                }
                return false
            }
            return true
        } else {
            for (let query of cofounderInterestQueries) {
                if (profile.cofounderInterests.includes(query)) {
                    continue
                }
                return false
            }
            for (let query of cofounderSkillQueries) {
                if (profile.cofounderSkills.includes(query)) {
                    continue
                }
                return false
            }
            return true
        }
    }) : []

    // const matchingProfiles = [];

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
                    <Typography variant="h3">"I want to search for a </Typography>
                </Grid>
                <Grid item>
                    <Autocomplete
                      defaultValue={null}
                      isOptionEqualToValue={(option, value) => option.id === value.id && option.name === value.name}
                      value={selectedCategory || null}
                      onChange={(_, newValue) => {
                        // If the category was changed, reset the queries and set a new category
                        if (!selectedCategory || newValue.id !== selectedCategory.id) {
                            setCurrentStudyBuddyQuery("")
                            setCurrentCofounderInterestQuery("")
                            setCurrentCofounderSkillQuery("")

                            setStudyBuddyQueries([])
                            setCofounderInterestQueries([])
                            setCofounderSkillQueries([])

                            setSelectedCategory(newValue)
                        }
                      }}
                      disablePortal
                      disableClearable
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
            {selectedCategory && <Grid container>
                {selectedCategory.id == STUDY_BUDDY_ID && studyBuddyQueries.map((query, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip
                                label={query}
                                onDelete={() => {
                                    setStudyBuddyQueries(studyBuddyQueries.filter((q) => !(q.name === query.name && q.categoryId === query.categoryId)))
                                }}
                            />
                        </Grid>
                    )
                })}
                {selectedCategory.id == COFOUNDER_ID && cofounderInterestQueries.map((query, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip
                                label={query}
                                onDelete={() => {
                                    setCofounderInterestQueries(cofounderInterestQueries.filter((q) => !(q.name === query.name && q.categoryId === query.categoryId)))
                                }}
                            />
                        </Grid>
                    )
                })}
                {selectedCategory.id == COFOUNDER_ID && cofounderSkillQueries.map((query, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip
                                label={query}
                                onDelete={() => {
                                    setCofounderSkillQueries(cofounderSkillQueries.filter((q) => !(q.name === query.name && q.categoryId === query.categoryId)))
                                }}
                            />
                        </Grid>
                    )
                })}
            </Grid>}
            {selectedCategory && selectedCategory.id == STUDY_BUDDY_ID &&
            <>
            <Grid container>
                <Grid item>
                    <Typography variant="h6">To work on...</Typography>
                </Grid>
            </Grid>
            <Grid container>
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
                      value={currentStudyBuddyQuery}
                      onChange={(event) => {
                        setCurrentStudyBuddyQuery(event.target.value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()

                            const trimmed = currentStudyBuddyQuery.trim()
                            
                            // If the search box isn't empty & contains an element that hasn't already been searched, then add it to the list of saved queries
                            if (trimmed !== '' && !(studyBuddyQueries.includes(trimmed))) { // prevent duplicates
                                setStudyBuddyQueries([...studyBuddyQueries, trimmed])
                            }
                            // Clear the search box
                            setCurrentStudyBuddyQuery("")
                        }
                      }}
                    />
                </Grid>
            </Grid>
            </>
            }
            {selectedCategory && selectedCategory.id == COFOUNDER_ID &&
            <>
            <Grid container>
                <Grid item>
                    <Typography variant="h6">Who is interested in...</Typography>
                </Grid>
            </Grid>
            <Grid container>
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
                      value={currentCofounderInterestQuery}
                      onChange={(event) => {
                        setCurrentCofounderInterestQuery(event.target.value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()

                            const trimmed = currentCofounderInterestQuery.trim()
                            
                            // If the search box isn't empty & contains an element that hasn't already been searched, then add it to the list of saved queries
                            if (trimmed !== '' && !(cofounderInterestQueries.includes(trimmed))) { // prevent duplicates
                                setCofounderInterestQueries([...cofounderInterestQueries, trimmed])
                            }
                            // Clear the search box
                            setCurrentCofounderInterestQuery("")
                        }
                      }}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Typography variant="h6">Who is skilled in...</Typography>
                </Grid>
            </Grid>
            <Grid container>
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
                      value={currentCofounderSkillQuery}
                      onChange={(event) => {
                        setCurrentCofounderSkillQuery(event.target.value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()

                            const trimmed = currentCofounderSkillQuery.trim()
                            
                            // If the search box isn't empty & contains an element that hasn't already been searched, then add it to the list of saved queries
                            if (trimmed !== '' && !(cofounderSkillQueries.includes(trimmed))) { // prevent duplicates
                                setCofounderSkillQueries([...cofounderSkillQueries, trimmed])
                            }
                            // Clear the search box
                            setCurrentCofounderSkillQuery("")
                        }
                      }}
                    />
                </Grid>
            </Grid>
            </>
            }
            <hr />
            {(studyBuddyQueries.length > 0 || cofounderSkillQueries.length > 0 || cofounderInterestQueries.length > 0) && 
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
