import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { profiles } from '../constants/profiles'
// import { ReactComponent as XIcon } from '../assets/icons/X.svg'
import ChipGrid from '../components/ChipGrid'
import DecoratedTextField from '../components/DecoratedTextField'
import { STUDY_BUDDY_ID, COFOUNDER_ID, categories } from '../constants/ids'
import ProfileCard from '../components/ProfileCard'

import './SearchPage.css';

export function toLowerCaseNoSpaces(str) {
    return str.toLowerCase().replace(' ', '')
}

export function findQuery(strings, query) {
    return strings.map((str) => toLowerCaseNoSpaces(str)).find((str) => str == toLowerCaseNoSpaces(query))
}

function SearchPage() {
    const [selectedCategory, setSelectedCategory] = useState()

    const [currentStudyBuddyQuery, setCurrentStudyBuddyQuery] = useState("")
    const [currentCofounderInterestQuery, setCurrentCofounderInterestQuery] = useState("")
    const [currentCofounderSkillQuery, setCurrentCofounderSkillQuery] = useState("")

    const [studyBuddyQueries, setStudyBuddyQueries] = useState([])
    const [cofounderInterestQueries, setCofounderInterestQueries] = useState([])
    const [cofounderSkillQueries, setCofounderSkillQueries] = useState([])

    const [duplicateStudyBuddyQueries, setDuplicateStudyBuddyQueries] = useState([])
    const [duplicateCofounderInterestQueries, setDuplicateCofounderInterestQueries] = useState([])
    const [duplicateCofounderSkillQueries, setDuplicateCofounderSkillQueries] = useState([])

    const theme = useTheme();

    // This computes on every render, which is very inefficient.
    // TODO: Consider when/how to compute more efficiently...

    const matchingProfiles = selectedCategory ? profiles.filter((profile) => {
        if (selectedCategory.id === STUDY_BUDDY_ID) {
            for (let query of studyBuddyQueries) {
                if (findQuery(profile.studyBuddy.subjects, query)) {
                    continue
                }
                return false
            }
            return true
        } else {
            for (let query of cofounderInterestQueries) {
                if (findQuery(profile.cofounder.interests, query)) {
                    continue
                }
                return false
            }
            for (let query of cofounderSkillQueries) {
                if (findQuery(profile.cofounder.skills, query)) {
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
        <div style={{ width: '950px', margin: 'auto' }}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography sx={{ fontSize: "28px" }}>"I want to search for a </Typography>
                </Grid>
                <Grid item>
                    <Autocomplete
                      sx={{ width: '610px' }}
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
                      renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ fontSize: "28px" }}> "</Typography>
                </Grid>
            </Grid>
            {selectedCategory && <Grid container spacing={1} sx={{ paddingTop: '10px' }}>
                {selectedCategory.id == STUDY_BUDDY_ID && <ChipGrid queries={studyBuddyQueries} duplicateQueries={duplicateStudyBuddyQueries} colorClass={'info'} setQueries={setStudyBuddyQueries} />}
                {selectedCategory.id == COFOUNDER_ID && <ChipGrid queries={cofounderInterestQueries} duplicateQueries={duplicateCofounderInterestQueries} colorClass={'primary'} setQueries={setCofounderInterestQueries} />}
                {selectedCategory.id == COFOUNDER_ID && <ChipGrid queries={cofounderSkillQueries} duplicateQueries={duplicateCofounderSkillQueries} colorClass={'warning'} setQueries={setCofounderSkillQueries} />}
            </Grid>}
            {selectedCategory && selectedCategory.id == STUDY_BUDDY_ID && <DecoratedTextField label={'To work on...'} placeholder={"CS 178, Parallel Processing, English Literature"} setDuplicateQueries={setDuplicateStudyBuddyQueries} colorClass={'info'} currentQuery={currentStudyBuddyQuery} setCurrentQuery={setCurrentStudyBuddyQuery} queries={studyBuddyQueries} setQueries={setStudyBuddyQueries}/>}
            {selectedCategory && selectedCategory.id == COFOUNDER_ID &&
            <>
                <DecoratedTextField label={'Who is interested in...'} placeholder={"Science, Therapeutics, Alzheimer's Disease"} setDuplicateQueries={setDuplicateCofounderSkillQueries} colorClass={'primary'} currentQuery={currentCofounderInterestQuery} setCurrentQuery={setCurrentCofounderInterestQuery} queries={cofounderInterestQueries} setQueries={setCofounderInterestQueries}/>
                <DecoratedTextField paddingTop='10px' label={'Who is skilled in...'} placeholder={"Robotics, Volunteer Management, Python, Sketching"} setDuplicateQueries={setDuplicateCofounderInterestQueries} colorClass={'warning'} currentQuery={currentCofounderSkillQuery} setCurrentQuery={setCurrentCofounderSkillQuery} queries={cofounderSkillQueries} setQueries={setCofounderSkillQueries}/>
            </>
            }
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
                        return <ProfileCard key={index} selectedCategory={selectedCategory} profile={profile}/>
                    })}
                </Grid>
            </>}
        </div>
        </>
    )
  }
  
  export default SearchPage
