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
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

function ProfilePage() {
  const theme = useTheme();

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded1(isExpanded ? panel : false);
  };

  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
  };

  const handleConnectSpotify = () => {
    // Handle Spotify connection logic here
  };

  return (
    <>
      <Grid container direction="row" justifyContent="flex-end">
        <Grid item xs> 
          <Grid container justifyContent="flex-start">
            <Avatar sx={{height: 150, width: 150}}></Avatar>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container spacing={3} rowSpacing={3} direction="row" justifyContent="flex-end">
            <Grid item xs={4}>
              <TextField
                  id="standard-helperText"
                  label="Full Name"
                  defaultValue="Heya what's your name?"
                  variant="standard"
                  sx={{width: 256, height: 56}}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                  id="standard-helperText"
                  label="Concentration"
                  defaultValue="Whatcha studying?"
                  variant="standard"
                  sx={{width: 256, height: 56}}
                />
            </Grid>
            <Grid item xs={4}>
              <TextField
                  id="standard-helperText"
                  label="Email"
                  defaultValue="@college"
                  variant="standard"
                  sx={{width: 256, height: 56}}
                />
            </Grid>
          </Grid>
          <Grid container spacing={3} rowSpacing={3} direction="row" justifyContent="flex-end">
            <Grid item xs={4}>
              <TextField
                  id="standard-helperText"
                  label="Pronouns"
                  defaultValue="e.g., she/they"
                  variant="standard"
                  sx={{width: 256, height: 56}}
                />
            </Grid>
            <Grid item xs={4}>
              <TextField
                  id="standard-helperText"
                  label="Year"
                  defaultValue="When are you leaving Hahvahd?"
                  variant="standard"
                  sx={{width: 256, height: 56}}
                />
            </Grid>
            <Grid item xs={4}>
              <TextField
                  id="standard-helperText"
                  label="Phone Number"
                  defaultValue="What's your #?"
                  variant="standard"
                  sx={{width: 256, height: 56}}
                />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider></Divider>

      <Grid container direction="row">
        <Typography sx={{ fontSize: "18px" }}>I am looking for: </Typography>
        <FormGroup>
          <Grid item>
          <FormControlLabel control={<Checkbox />} label="Cofounders" />
          <FormControlLabel control={<Checkbox />} label="Study buddies" />
          </Grid>
        </FormGroup>
      </Grid>

      <Accordion expanded={expanded1 === 'panel1'} onChange={handleChange1('panel1')}>
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
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select your preference...</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Timing for launching"
          >
            <MenuItem value={1}>ASAP</MenuItem>
            <MenuItem value={2}>In the next few months</MenuItem>
            <MenuItem value={3}>In the next year</MenuItem>
            <MenuItem value={4}>In the next few years</MenuItem>
          </Select>
        </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded2 === 'panel2'} onChange={handleChange2('panel2')}>
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
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Divider></Divider>

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
    </>
  )
}

export default ProfilePage
