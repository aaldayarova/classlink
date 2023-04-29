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

function ProfilePage() {
  const theme = useTheme();

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const [isAccordionDisabled1, setIsAccordionDisabled1] = useState(false);
  const [isAccordionDisabled2, setIsAccordionDisabled2] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [userData, setUserData] = useState({});

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded1(isExpanded ? panel : false);
  };

  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
  };

  const handleCheckboxChange1 = (event) => {
    setIsAccordionDisabled1(event.target.checked)
  };

  const handleCheckboxChange2 = (event) => {
    setIsAccordionDisabled2(event.target.checked)
  };

  const handleOptions = (event) => {
    const { value } = event.target
    setSelectedOptions(value)
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

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleConnectSpotify = () => {
    // Handle Spotify connection logic here
  };

  return (
    <>
    <div style={{ margin: '100px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Grid container justifyContent="center">
            <Avatar sx={{ height: 150, width: 150 }} />
          </Grid>
        </Grid>
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
              <FormControlLabel name="cofounderCheckbox" onChange={handleUserDataChange} value={userData.cofounderCheckbox} control={<Checkbox onChange={handleCheckboxChange1} />} label="Cofounders" />
            </Grid>
            <Grid item>
              <FormControlLabel name="studyBuddyCheckbox" onChange={handleUserDataChange} value={userData.studyBuddyCheckbox} control={<Checkbox onChange={handleCheckboxChange2} />} label="Study buddies" />
            </Grid>
          </Grid>
        </FormGroup>
      </div>

      <div style={{ marginTop: '20px'}}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs>
            <Accordion expanded={expanded1 === 'panel1'} onChange={handleChange1('panel1')} disabled={!isAccordionDisabled1}>
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
                        onChange={handleUserDataChange}
                        value={userData.skills}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Skills"
                        multiline
                        rows={4}
                        placeholder="Coding, drawing, prototyping, ..."
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ margin: '10px' }}>
                      <TextField
                        name="interests"
                        onChange={handleUserDataChange}
                        value={userData.interests}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Interests"
                        multiline
                        rows={4}
                        placeholder="Crypto, blockchain, Naruto, ..."
                      />
                    </div>
                  </Grid>
                </Grid>
                <div style={{ margin: '10px'}}> 
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Launch stage </InputLabel>
                    <Select
                      name="launchStage"
                      onChange={handleUserDataChange}
                      value={userData.launchStage}
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
                      onChange={handleUserDataChange}
                      value={userData.ideaStage}
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
          <Grid item xs>
            <Accordion expanded={expanded2 === 'panel2'} onChange={handleChange2('panel2')} disabled={!isAccordionDisabled2}>
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
                        onChange={handleUserDataChange}
                        value={userData.subjects}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Subjects"
                        multiline
                        rows={4}
                        placeholder="CS 178, Computer Networks, ..."
                      />
                    </div>
                  </Grid>
                </Grid>
                <div style={{ margin: '10px'}}> 
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Purpose </InputLabel>
                    <Select
                      name="purpose"
                      onChange={handleUserDataChange}
                      value={userData.purpose}
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
                      onChange={handleUserDataChange}
                      value={userData.frequency}
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

      <div style={{ marginTop: '40px'}}>
        <Button sx={{ 
            backgroundColor: theme.palette.customColors.success.bg,
            borderRadius: theme.spacing(3),
            border: `1px solid ${theme.palette.customColors.success.hover}`,
            color: theme.palette.customColors.success.hover,
            fontFamily: theme.typography.fontFamily}}
            variant="contained"
            onClick={handleConnectSpotify}
          >
          Connect your Spotify
          </Button>
      </div>
    </div>
    </>
  )
}

export default ProfilePage
