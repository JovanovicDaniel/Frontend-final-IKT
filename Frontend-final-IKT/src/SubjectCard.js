import { Link } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";

const SubjectCard = ({subject}) => {
    return <Card sx={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <CardContent>
            <Stack spacing={1}>
                <Typography align='center' fontWeight={700}>{subject.name}</Typography>
                <Typography align='center'>{subject.subtitle}</Typography>
                <Typography align='center'>{subject.description}</Typography>
            </Stack>
        </CardContent>
        <CardActions sx={{justifyContent: "flex-end"}}>
            <Button component={Link} to={`/subjects/${subject.id}`}>Detalji...</Button>
        </CardActions>
    </Card>
}

export default SubjectCard;