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
import Avatar from '@mui/material/Avatar'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { profiles } from '../constants/profiles'
// import { ReactComponent as XIcon } from '../assets/icons/X.svg'
import ChipGrid from '../components/ChipGrid/ChipGrid'

import './SearchPage.css';

// Category type ids:
const STUDY_BUDDY_ID = 1;
const COFOUNDER_ID = 2;

const categories = [
    { id: STUDY_BUDDY_ID, label: 'Study buddy' },
    { id: COFOUNDER_ID, label: 'Cofounder' },
]

function SearchPage() {
    const [selectedCategory, setSelectedCategory] = useState()

    const [currentStudyBuddyQuery, setCurrentStudyBuddyQuery] = useState("")
    const [currentCofounderInterestQuery, setCurrentCofounderInterestQuery] = useState("")
    const [currentCofounderSkillQuery, setCurrentCofounderSkillQuery] = useState("")

    const [studyBuddyQueries, setStudyBuddyQueries] = useState([])
    const [cofounderInterestQueries, setCofounderInterestQueries] = useState([])
    const [cofounderSkillQueries, setCofounderSkillQueries] = useState([])

    const theme = useTheme();

    // This computes on every render, which is very inefficient.
    // TODO: Consider when/how to compute more efficiently...

    const matchingProfiles = selectedCategory ? profiles.filter((profile) => {
        if (selectedCategory.id === STUDY_BUDDY_ID) {
            for (let query of studyBuddyQueries) {
                if (profile.studyBuddy.subjects.includes(query)) {
                    continue
                }
                return false
            }
            return true
        } else {
            for (let query of cofounderInterestQueries) {
                if (profile.cofounder.interests.includes(query)) {
                    continue
                }
                return false
            }
            for (let query of cofounderSkillQueries) {
                if (profile.cofounder.skills.includes(query)) {
                    continue
                }
                return false
            }
            return true
        }
    }) : []

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
            <div>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography sx={{ fontSize: "28px" }}>"I want to search for a </Typography>
                </Grid>
                <Grid item>
                    <Autocomplete
                      size={'small'}
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
                    <Typography sx={{ fontSize: "28px" }}> "</Typography>
                </Grid>
            </Grid>
            {selectedCategory && <Grid container spacing={1} sx={{ paddingTop: '10px' }}>
                {selectedCategory.id == STUDY_BUDDY_ID && <ChipGrid queries={studyBuddyQueries} colorClass={'info'} setQueries={setStudyBuddyQueries} />}
                {selectedCategory.id == COFOUNDER_ID && <ChipGrid queries={cofounderInterestQueries} colorClass={'primary'} setQueries={setCofounderInterestQueries} />}
                {selectedCategory.id == COFOUNDER_ID && <ChipGrid queries={cofounderSkillQueries} colorClass={'warning'} setQueries={setCofounderSkillQueries} />}
            </Grid>}
            {selectedCategory && selectedCategory.id == STUDY_BUDDY_ID &&
            <>
            <Grid container sx={{ paddingTop: '10px', paddingBottom: '8px' }}>
                <Grid item>
                    <Typography variant="h6">To work on...</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ width: '100%' }}>
                <Grid item>
                    <TextField 
                      variant="outlined"
                      sx={{ 
                        backgroundColor: theme.palette.customColors.info.bg, 
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.customColors.info.hover,
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.customColors.info.hover,
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
            <Grid container sx={{ paddingTop: '10px', paddingBottom: '8px' }}>
                <Grid item>
                    <Typography variant="h6">Who is interested in...</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ paddingBottom: '10px' }}>
                <Grid item>
                    <TextField 
                      variant="outlined"
                      sx={{ 
                        backgroundColor: theme.palette.customColors.primary.bg, 
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.customColors.primary.hover,
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.customColors.primary.hover,
                        },
                      }}
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
            <Grid container sx={{ paddingBottom: '8px' }}>
                <Grid item>
                    <Typography variant="h6">Who is skilled in...</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <TextField 
                      variant="outlined"
                      sx={{ 
                        backgroundColor: theme.palette.customColors.warning.bg, 
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.customColors.warning.hover,
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.customColors.warning.hover,
                        },
                      }}
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
            </div>
            {(studyBuddyQueries.length > 0 || cofounderSkillQueries.length > 0 || cofounderInterestQueries.length > 0) && 
            <>
                <div style={{ 
                    border: `2px solid ${theme.palette.customColors.success.border}`, 
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", 
                    borderRadius: "4px", 
                    background: theme.palette.customColors.success.bg,
                    display: "inline-block",
                    padding: "6px",
                    marginTop: "20px",
                    marginBottom: "8px",
                    color: theme.palette.customColors.neutral[70],
                }}>
                    <Typography variant="subtitle2" component="div"> Found {matchingProfiles.length} {matchingProfiles.length === 1 ? 'person' : 'people'}</Typography>
                </div>
                <Grid container spacing={2}>
                    {matchingProfiles.map((profile, index) => {
                        const { name, pronouns, house, year, concentration, studyBuddy, cofounder } = profile;

                        return (
                            <Grid item key={index}>
                                <Card sx={{ width: '300px' }}>
                                <CardContent sx={{
                                    position: 'relative',
                                    '&:hover::before': {
                                      content: '""',
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      width: '100%',
                                      height: '100%',
                                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      zIndex: 1,
                                      overflow: 'auto',
                                    },
                                    '.hover-content': {
                                        position: 'absolute',
                                        visibility: 'hidden',
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        zIndex: 2,
                                        textAlign: 'center',
                                        color: 'white',
                                        maxHeight: '80vh',
                                        overflow: 'auto',
                                        width: '90%',
                                        height: '90%',
                                    },
                                    '&:hover > .hover-content': {
                                        visibility: 'visible',
                                        overflowY: 'auto',
                                    }
                                }}>
                                        <div className="hover-content">
                                            {selectedCategory.id == STUDY_BUDDY_ID && ['goals', 'purpose', 'frequency'].map((category, index) => {
                                                return <div key={index}>
                                                    <Typography variant="h6" component="div">
                                                        {category[0].toUpperCase() + category.slice(1)}
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div" sx={{ paddingBottom: '8px' }}>
                                                        {studyBuddy[category]}
                                                    </Typography>
                                                </div>
                                            })}
                                            {selectedCategory.id == COFOUNDER_ID && <div>
                                                    <Typography variant="h6" component="div">
                                                        Timing
                                                    </Typography>
                                                    <Typography variant="subtitle1" component="div">
                                                        {cofounder["timing"]}
                                                    </Typography>
                                                </div>}
                                        </div>
                                        <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
                                            <div style={{ textAlign: 'center', paddingBottom: '6px', justifyContent: 'center', display: 'flex' }}>
                                                <Avatar alt="Your Profile">{name[0]}</Avatar>
                                            </div>
                                            <Typography variant="h6" component="div">
                                                {name}
                                            </Typography>
                                            <Typography variant="caption" component="div">
                                                {pronouns}
                                            </Typography>
                                            <Typography variant="subtitle2" component="div">
                                                {house}, {year}, {concentration}
                                            </Typography>
                                        </div>
                                        <Typography variant="body2" component="div" sx={{ paddingBottom: '10px' }}>
                                            {selectedCategory.id == STUDY_BUDDY_ID && 'Is interested in working on...'}
                                            {selectedCategory.id == COFOUNDER_ID && 'Is interested & skilled in...'}
                                        </Typography>
                                        <Grid container spacing={1}>
                                            {selectedCategory.id == STUDY_BUDDY_ID && studyBuddy.subjects.map((interest, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip
                                                            label={interest}
                                                            sx={{
                                                                backgroundColor: theme.palette.customColors.info.bg,
                                                                border: `1px solid ${theme.palette.customColors.info.main}`, 
                                                                borderRadius: "50px", 
                                                            }}
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                            {selectedCategory.id == COFOUNDER_ID && cofounder.interests.map((interest, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip
                                                            label={interest}
                                                            sx={{ 
                                                                backgroundColor: theme.palette.customColors.primary.bg, 
                                                                border: `1px solid ${theme.palette.customColors.primary.main}`, 
                                                                borderRadius: "50px", 
                                                            }}
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                            {selectedCategory.id == COFOUNDER_ID && cofounder.skills.map((skill, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip
                                                            label={skill}
                                                            sx={{
                                                                backgroundColor: theme.palette.customColors.warning.bg,
                                                                border: `1px solid ${theme.palette.customColors.warning.main}`, 
                                                                borderRadius: "50px", 
                                                            }}
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
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
