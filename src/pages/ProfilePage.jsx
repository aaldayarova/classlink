import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useState, useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import TextFieldCustom from '../components/TextFieldCustom'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'

function ProfilePage() {
  const theme = useTheme();

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const [isAccordionDisabled1, setIsAccordionDisabled1] = useState(false);
  const [isAccordionDisabled2, setIsAccordionDisabled2] = useState(false);

  const [cofounderCheckbox, setCofounderCheckbox] = useState(false);
  const [studyBuddyCheckbox, setStudyBuddyCheckbox] = useState(false);

  const [userData, setUserData] = useState({});

  const [launchStage, setLaunchStage] = useState('');
  const [ideaStage, setIdeaStage] = useState('');
  const [purpose, setPurpose] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded1(isExpanded ? panel : false);
  };

  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
  };

  const handleCheckboxChange1 = (event) => {
    setIsAccordionDisabled1(event.target.checked)
    setCofounderCheckbox(event.target.checked);
  };

  const handleCheckboxChange2 = (event) => {
    setIsAccordionDisabled2(event.target.checked)
    setStudyBuddyCheckbox(event.target.checked);
  };

  const saveUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData))
  };

  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
    saveUserData({
      ...userData,
      [name]: value
    });
  };

  const handleUserListDataChange = (event) => {
    const { name, value } = event.target;

    let list = value.split(',')

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: list
    }));
    saveUserData({
      ...userData,
      [name]: list
    });
  };

  // Preserving user input in basic information section of the profile page
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Preserving Checkbox selection
  useEffect(() => {
    const storedCofounderCheckbox = localStorage.getItem('cofounderCheckbox');
    const storedStudyBuddyCheckbox = localStorage.getItem('studyBuddyCheckbox');

    setCofounderCheckbox(storedCofounderCheckbox === 'true');
    setStudyBuddyCheckbox(storedStudyBuddyCheckbox === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('cofounderCheckbox', cofounderCheckbox);
    localStorage.setItem('studyBuddyCheckbox', studyBuddyCheckbox);
  }, [cofounderCheckbox, studyBuddyCheckbox]);

  // Preserving user input in Select components inside Accordions
  useEffect(() => {
    const storedLaunchStage = localStorage.getItem('launchStage');
    const storedIdeaStage = localStorage.getItem('ideaStage');
    const storedPurpose = localStorage.getItem('purpose');
    const storedFrequency = localStorage.getItem('frequency');

    setLaunchStage(storedLaunchStage || '');
    setIdeaStage(storedIdeaStage || '');
    setPurpose(storedPurpose || '');
    setFrequency(storedFrequency || '');
  }, []);

  useEffect(() => {
    localStorage.setItem('launchStage', launchStage);
    localStorage.setItem('ideaStage', ideaStage);
    localStorage.setItem('purpose', purpose);
    localStorage.setItem('frequency', frequency);
  }, [launchStage, ideaStage, purpose, frequency]);

  // Preserving Accordion enabling/disabling according to Checkbox selection
  useEffect(() => {
    if (cofounderCheckbox) {
      setIsAccordionDisabled1(false);
    }
  }, [cofounderCheckbox]);

  useEffect(() => {
    if (studyBuddyCheckbox) {
      setIsAccordionDisabled2(false);
    }
  }, [studyBuddyCheckbox]);

  return (
    <>
    {/* CONCEPT: Profile, STATE: Incomplete */}
    <div style={{ margin: '100px' }}>
    <IconButton color="primary" component="label">
      <Link to='/' style={{ textDecoration: 'none' }}>
        <ArrowBackIcon />    
      </Link>
    </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Grid container justifyContent="center">
            <Avatar sx={{ height: 150, width: 150 }} />
          </Grid>
        </Grid>
        {/* CONCEPT: Profile, STATE: Partially complete, ACTION: completeBasicInformation */}
        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextFieldCustom name="fullName" onChange={handleUserDataChange} value={userData.fullName} label="Full Name" placeholder="Heya what's your name?" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextFieldCustom name="concentration" onChange={handleUserDataChange} value={userData.concentration} label="Concentration" placeholder="Whatcha studying?" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextFieldCustom name="email" onChange={handleUserDataChange} value={userData.email} label="Email" placeholder="@college" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextFieldCustom name="pronouns" onChange={handleUserDataChange} value={userData.pronouns} label="Pronouns" placeholder="e.g., she/they" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextFieldCustom name="year" onChange={handleUserDataChange} value={userData.year} label="Year" placeholder="When are you leaving Hahvahd?" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextFieldCustom name="phoneNumber" onChange={handleUserDataChange} value={userData.phoneNumber} label="Phone Number" placeholder="What's your #?" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div style={{ marginTop: '40px' }}>
        <Divider></Divider>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center'}}>
        <Typography sx={{ fontSize: '18px', marginRight: '20px' }}>I am looking for:</Typography>
        <FormGroup style={{ flex: 1 }}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
            <Grid item>
              <FormControlLabel name="cofounderCheckbox" onChange={handleCheckboxChange1} checked={cofounderCheckbox} control={<Checkbox />} label="Cofounders" />
            </Grid>
            <Grid item>
              <FormControlLabel name="studyBuddyCheckbox" onChange={handleCheckboxChange2} checked={studyBuddyCheckbox} control={<Checkbox />} label="Study buddies" />
            </Grid>
          </Grid>
        </FormGroup>
      </div>

      {/* CONCEPT: Profile, ACTION: completeCofounderPreferences */}
      <div style={{ marginTop: '20px'}}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs>
            <Accordion disabled={isAccordionDisabled1} expanded={expanded1 === 'panel1'} onChange={handleChange1('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Cofounder preferences
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} md={6}>
                    <div style={{ margin: '10px' }}>
                      <TextField
                        name="skills"
                        onChange={handleUserListDataChange}
                        value={userData.skills}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Skills"
                        multiline
                        rows={4}
                        placeholder="Coding, drawing, prototyping, ..."
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  
                              </InputAdornment>
                          ),
                        }} />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ margin: '10px' }}>
                      <TextField
                        name="interests"
                        onChange={handleUserListDataChange}
                        value={userData.interests}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Interests"
                        multiline
                        rows={4}
                        placeholder="Crypto, blockchain, Naruto, ..."
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  
                              </InputAdornment>
                          ),
                        }} 
                      />
                    </div>
                  </Grid>
                </Grid>
                <div style={{ margin: '10px'}}> 
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Launch stage </InputLabel>
                    <Select
                      name="launchStage"
                      onChange={(event) => setLaunchStage(event.target.value)}
                      value={launchStage}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Launch stage"
                    >
                      <MenuItem value={'ASAP'}>ASAP</MenuItem>
                      <MenuItem value={'Soon'}>In the next few months</MenuItem>
                      <MenuItem value={'Later'}>In the next year</MenuItem>
                      <MenuItem value={'Not soon'}>In the next few years</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ margin: '10px'}}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Idea stage </InputLabel>
                    <Select
                      name="ideaStage"
                      onChange={(event) => setIdeaStage(event.target.value)}
                      value={ideaStage}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Idea stage"
                    >
                      <MenuItem value={'Working'}>Working on an idea</MenuItem>
                      <MenuItem value={'No idea'}>Don't have an idea yet</MenuItem>
                      <MenuItem value={'Joining'}>Want to join someone with an idea</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>
          
          {/* CONCEPT: Profile, ACTION: completeStudyBuddyPreferences */}
          <Grid item xs>
            <Accordion disabled={isAccordionDisabled2} expanded={expanded2 === 'panel2'} onChange={handleChange2('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Study buddy preferences
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} md={12}>
                    <div style={{ margin: '10px' }}>
                      <TextField
                        name="subjects"
                        onChange={handleUserListDataChange}
                        value={userData.subjects}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Subjects"
                        multiline
                        rows={4}
                        placeholder="CS 178, Computer Networks, ..."
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  
                              </InputAdornment>
                          ),
                        }} 
                      />
                    </div>
                  </Grid>
                </Grid>
                <div style={{ margin: '10px'}}> 
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Purpose </InputLabel>
                    <Select
                      name="purpose"
                      onChange={(event) => setPurpose(event.target.value)}
                      value={purpose}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Purpose"
                      // multiple
                      // value={selectedOptions}
                      // onChange={handleOptions}
                    >
                      <MenuItem value={'Studying'}>Studying</MenuItem>
                      <MenuItem value={'Research'}>Research</MenuItem>
                      <MenuItem value={'Discussion'}>Discussion</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ margin: '10px'}}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Frequency </InputLabel>
                    <Select
                      name="frequency"
                      onChange={(event) => setFrequency(event.target.value)}
                      value={frequency}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Frequency"
                    >
                      <MenuItem value={'Daily'}>Daily</MenuItem>
                      <MenuItem value={'Weekly'}>Weekly</MenuItem>
                      <MenuItem value={'Monthly'}>Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Divider></Divider>
      </div>

      {/* CONCEPT: Profile, STATE: Complete */}

      {/* <div style={{ marginTop: '40px'}}>
        <Button sx={{ 
            backgroundColor: theme.palette.customColors.success.bg,
            borderRadius: theme.spacing(3),
            border: `1px solid ${theme.palette.customColors.success.hover}`,
            color: theme.palette.customColors.success.hover,
            fontFamily: theme.typography.fontFamily}}
            variant="contained"
          >
          Connect your Spotify
          </Button>
      </div> */}
    </div>
    </>
  )
}

export default ProfilePage
