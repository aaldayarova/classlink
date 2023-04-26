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
import { useTheme } from '@mui/material/styles'
import { profiles } from '../constants/profiles'
// import { ReactComponent as XIcon } from '../assets/icons/X.svg'

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
            {/* justifyContent={'center'} */}
            <Grid container spacing={2} >
                <Grid item>
                    <Typography variant="h4">"I want to search for a </Typography>
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
                    <Typography variant="h4"> "</Typography>
                </Grid>
            </Grid>
            {selectedCategory && <Grid container spacing={1} sx={{ paddingTop: '10px' }}>
                {selectedCategory.id == STUDY_BUDDY_ID && studyBuddyQueries.map((query, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip
                                sx={{ 
                                    backgroundColor: theme.palette.customColors.info.bg, 
                                    border: `1px solid ${theme.palette.customColors.info.hover}`, 
                                    borderRadius: "50px", 
                                    color: theme.palette.customColors.info.hover, 
                                    "& .MuiChip-deleteIcon": {
                                        color: theme.palette.customColors.info.hover,
                                    },
                                }}
                                label={query}
                                // deleteIcon={<XIcon style={{ fontSize: "0.5rem", color: theme.palette.customColors.info.hover, }} />}
                                onDelete={() => {
                                    setStudyBuddyQueries(studyBuddyQueries.filter((q) => q !== query))
                                }}
                            />
                        </Grid>
                    )
                })}
                {selectedCategory.id == COFOUNDER_ID && cofounderInterestQueries.map((query, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip
                                sx={{ 
                                    backgroundColor: theme.palette.customColors.primary.bg, 
                                    border: `1px solid ${theme.palette.customColors.primary.hover}`, 
                                    borderRadius: "50px", 
                                    color: theme.palette.customColors.primary.hover, 
                                    "& .MuiChip-deleteIcon": {
                                        color: theme.palette.customColors.primary.hover,
                                    },
                                }}
                                label={query}
                                onDelete={() => {
                                    setCofounderInterestQueries(cofounderInterestQueries.filter((q) => q !== query))
                                }}
                            />
                        </Grid>
                    )
                })}
                {selectedCategory.id == COFOUNDER_ID && cofounderSkillQueries.map((query, index) => {
                    return (
                        <Grid item key={index}>
                            <Chip
                                sx={{ 
                                    backgroundColor: theme.palette.customColors.warning.bg, 
                                    border: `1px solid ${theme.palette.customColors.warning.border}`, 
                                    borderRadius: "50px", 
                                    color: theme.palette.customColors.warning.border, 
                                    "& .MuiChip-deleteIcon": {
                                        color: theme.palette.customColors.warning.border,
                                    },
                                }}
                                label={query}
                                onDelete={() => {
                                    setCofounderSkillQueries(cofounderSkillQueries.filter((q) => q !== query))
                                }}
                            />
                        </Grid>
                    )
                })}
            </Grid>}
            {selectedCategory && selectedCategory.id == STUDY_BUDDY_ID &&
            <>
            <Grid container sx={{ paddingTop: '10px', paddingBottom: '8px' }}>
                <Grid item>
                    <Typography variant="h6">To work on...</Typography>
                </Grid>
            </Grid>
            <Grid container>
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
                        // "& .MuiSvgIcon-root.MuiIconButton-root:hover": {
                        //     color: theme.palette.customColors.info.hover,
                        // },
                        //   "& .MuiSvgIcon-root.MuiIconButton-root:active": {
                        //     color: theme.palette.customColors.info.hover,
                        // }
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
            <Grid container sx={{ paddingBottom: '8px' }}>
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
            {(studyBuddyQueries.length > 0 || cofounderSkillQueries.length > 0 || cofounderInterestQueries.length > 0) && 
            <>
                <div style={{ 
                    border: "2px solid #7CB97A", 
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)", 
                    borderRadius: "4px", 
                    background: "#F1FAF0",
                    display: "inline-block",
                    padding: "6px",
                    marginTop: "8px",
                    marginBottom: "8px",
                    color: "grey"
                }}>
                    <Typography variant="subtitle2" component="div"> Found {matchingProfiles.length} {matchingProfiles.length === 1 ? 'person' : 'people'}</Typography>
                </div>
                <Grid container spacing={2}>
                    {matchingProfiles.map((profile, index) => {
                        const { name, pronouns, house, year, concentration, studyBuddyInterests, cofounderInterests, cofounderSkills } = profile;

                        return (
                            <Grid item key={index}>
                                <Card sx={{ width: '300px' }}>
                                    <CardContent>
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
                                            Is interested in working on...
                                        </Typography>
                                        <Grid container spacing={1}>
                                            {selectedCategory.id == STUDY_BUDDY_ID && studyBuddyInterests.map((interest, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip
                                                            label={interest}
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                            {selectedCategory.id == COFOUNDER_ID && cofounderInterests.map((interest, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip
                                                            label={interest}
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                            {selectedCategory.id == COFOUNDER_ID && cofounderSkills.map((skill, index) => {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip
                                                            label={skill}
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
