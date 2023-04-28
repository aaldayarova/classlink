import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ProfileCardChipGrid from './ProfileCardChipGrid'
import { STUDY_BUDDY_ID, COFOUNDER_ID } from '../constants/ids'

function ProfileCard({ selectedCategory, index, profile }) {
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
                        {selectedCategory.id == STUDY_BUDDY_ID && <ProfileCardChipGrid items={studyBuddy.subjects} colorClass={'info'}/>}
                        {selectedCategory.id == COFOUNDER_ID && <ProfileCardChipGrid items={cofounder.interests} colorClass={'primary'}/>}
                        {selectedCategory.id == COFOUNDER_ID && <ProfileCardChipGrid items={cofounder.skills} colorClass={'warning'}/>}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ProfileCard