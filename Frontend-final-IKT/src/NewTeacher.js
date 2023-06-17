import { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { Button, Container, Stack, TextField } from "@mui/material";

const NewTeacher = () => {
    const [n, setN] = useState("");
    const fetcher = useFetcher();
    const nav = useNavigate();
    useEffect(() => {
        if(fetcher.data){
            nav(-1);
        }
    }, [fetcher, nav]);
    return <>
        <Container maxWidth="sm">
            <Stack direction={"column"} spacing={1} sx={{ paddingTop: '40px'}}>
                <TextField label="Ime" value={n} onChange={e => setN(e.target.value)} />
                <Stack direction={"row-reverse"}>
                    <Button variant="contained" onClick={e => {
                        let o = { name: n };
                        fetcher.submit(o, {
                            method: 'post',
                            action: `/teachers/new`
                        });
                    }}>
                        Add
                    </Button>
                </Stack>
            </Stack>
        </Container>
    </>;
}

export default NewTeacher;