import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";

const Subject = () => {
    const [subject] = useLoaderData();
    const [currentSubject, setCurrentSubject] = useState(structuredClone(subject));
    const fetcher = useFetcher();
    const generateOnChanged = (t) => {
        return (e) => {
            setCurrentSubject({
                ...currentSubject,
                [t] : e.target.value
            });
        }
    }

    return <>
    <Container maxWidth="sm" sx={{padding: '25px'}}>
        <Paper sx={{padding: '25px'}}>
            <Stack spacing={2}>
            <Typography variant="h6" align="center">Editovanje predmeta</Typography>
            <Typography>Predmet: </Typography>
            <Stack direction={"column"} spacing={2}>
            <TextField  id="name" label="Naziv" value={currentSubject.name} onChange={generateOnChanged('name')}></TextField>
            <TextField  id="subtitle" label="Smisao" value={currentSubject.subtitle} onChange={generateOnChanged('subtitle')}></TextField>
            <TextField  id="description" label="Opis" value={currentSubject.description} onChange={generateOnChanged('description')}></TextField>
            <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button onClick={ e=> {
                    fetcher.submit(currentSubject, {
                    method: 'delete',
                    action: `/subjects/${currentSubject.id}`
                });
                }}>Delete</Button>
                <Button variant="contained" onClick={ e=> {
                    fetcher.submit(currentSubject, {
                    method: 'put',
                    action: `/subjects/${currentSubject.id}`
                });
            }}>Save</Button></Stack>
            </Stack>
            </Stack>
        </Paper>
    </Container> 
    </>
}

export default Subject;