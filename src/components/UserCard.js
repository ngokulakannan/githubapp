import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
function User(props) {
    const { userId, userName, avatar } = props
    const navigete = useNavigate()
    const openLink = () => {
        return navigete("user/" + userName)

    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={avatar}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    User Id for this user is {userId}. Couldnt able to get first name and last name as its not available from user list api. Click below options to know more about this user.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={openLink}>Show User Details</Button>

            </CardActions>
        </Card>


    )
}

export default User