import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

function ProfilePage() {
  return (
    <>
      <Grid container direction="row" justifyContent="flex-end">
        <Grid item xs> 
          <Grid container justifyContent="flex-start">
            <Avatar sx={{height: 150, width: 150}}></Avatar>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction="row" justifyContent="flex-end">
            <Grid item xs>
              <TextField
                  id="standard-helperText"
                  label="Full Name"
                  defaultValue="Heya what's your name?"
                  variant="standard"
                />
            </Grid>
            <Grid item xs>
              <TextField
                  id="standard-helperText"
                  label="Concentration"
                  defaultValue="Whatcha studying?"
                  variant="standard"
                />
            </Grid>
            <Grid item xs>
              <TextField
                  id="standard-helperText"
                  label="Email"
                  defaultValue="@college"
                  variant="standard"
                />
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="flex-end">
            <Grid item xs>
              <TextField
                  id="standard-helperText"
                  label="Pronouns"
                  defaultValue="e.g., she/they"
                  variant="standard"
                />
            </Grid>
            <Grid item xs>
              <TextField
                  id="standard-helperText"
                  label="Year"
                  defaultValue="When are you leaving Hahvahd?"
                  variant="standard"
                />
            </Grid>
            <Grid item xs>
              <TextField
                  id="standard-helperText"
                  label="Phone Number"
                  defaultValue="What's your #?"
                  variant="standard"
                />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider></Divider>

      <Grid container direction="row">
        <FormGroup>
          <Grid item>
          <FormControlLabel control={<Checkbox />} label="Cofounders" />
          <FormControlLabel control={<Checkbox />} label="Study buddies" />
          </Grid>
        </FormGroup>
      </Grid>
    </>
  )
}

export default ProfilePage
