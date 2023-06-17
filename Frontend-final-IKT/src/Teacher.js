import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";

const Teacher = () => {
    const a = useLoaderData();
    const [n, setN] = useState(a.name);
    const fetcher = useFetcher();
    //const nav = useNavigate();
    return <>
        <Stack direction={"column"} spacing={1} sx={{paddingLeft: '160px', paddingRight: '160px', paddingTop: '40px'}}>
            <Typography>Id: {a.id}</Typography>
            <TextField label="Ime" value={n} onChange={e => setN(e.target.value)}/>
            <Stack direction={"row-reverse"}>
                <Button variant="contained" onClick={e => {
                    let o = {name: n};
                    fetcher.submit(o, {
                        method: 'put',
                        action: `/teachers/${a.id}`
                    });
                    //nav(-1);
                }}>
                    Save
                </Button>
            </Stack>
        </Stack>
    </>;
}

export default Teacher;