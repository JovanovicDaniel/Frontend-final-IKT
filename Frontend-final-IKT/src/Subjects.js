import { useLoaderData, useNavigate  } from "react-router-dom";
import SubjectCard from "./SubjectCard";
import { useEffect, useState } from "react";
import { lc_match } from "./tekstAlati";
import { Container, Stack, TextField, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

const Subjects = () => {
    const [subjects] = useLoaderData();
    const [currentSubjects, setCurrentSubjects] = useState([]);
    const [q, setQ] = useState("");
    const nav = useNavigate();
    useEffect(() => {
        setCurrentSubjects(subjects.filter(v => {
            return (lc_match(v.name, q));
        }));
    }, [q, subjects]);
    return <>
        <Stack direction="column">
            <Stack direction="row" sx={{padding: "24px"}}>
                <TextField placeholder="Pretraga..." value={q} onChange={e => setQ(e.target.value)} sx={{flexGrow: 8}}/>
                <IconButton onClick={e => nav('/subjects/new')}>
                    <Add/>
                </IconButton>            
            </Stack>
            <Container sx={{display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gridAutoRows: "auto", gridGap: "20px"}}>
                {currentSubjects.map(b => <SubjectCard key={b.id} subject={b}/>)}
            </Container>
        </Stack>
    </>;
}

export default Subjects;