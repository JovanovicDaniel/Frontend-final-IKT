import { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";

const NewSubject = () => {
    const [n, setN] = useState("");
    const [s, setS] = useState("");
    const [d, setD] = useState("");
    const fetcher = useFetcher();
    const nav = useNavigate();
    useEffect(() => {
        if(fetcher.data){
            nav(-1);
        }
    }, [fetcher, nav]);
    return <>
        <Container maxWidth="sm" sx={{padding: '25px'}}>
            <Paper sx={{padding: '25px'}}>
                <Stack spacing={2}>
                <Typography variant="h6" align="center">Dodavanje predmeta</Typography>
                <Typography>Predmet: </Typography>
                <Stack direction={"column"} spacing={2}>
                    <TextField  id="name" label="Naziv" value={n} onChange={e => setN(e.target.value)}></TextField>
                    <TextField  id="subtitle" label="Smisao" value={s} onChange={e => setS(e.target.value)}></TextField>
                    <TextField  id="description" label="Opis" value={d} onChange={e => setD(e.target.value)}></TextField>
                </Stack>
                    <Stack direction={"row-reverse"}>
                        <Button variant="contained" onClick={e => {
                            let o = { name: n,
                                      subtitle: s,
                                      description: d };
                            fetcher.submit(o, {
                                method: 'post',
                                action: `/subjects/new`
                            });
                        }}>
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    </>;
}

export default NewSubject;