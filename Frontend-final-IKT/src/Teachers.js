import { useState, useEffect } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { lc_match } from "./tekstAlati";
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

const Teachers = () => {
    const teachers = useLoaderData();
    const [currentTeachers, setCurrentTeachers] = useState([]);
    const [q, setQ] = useState("");
    const nav = useNavigate();
    const fetcher = useFetcher();
    useEffect(() => {
        setCurrentTeachers(teachers.filter(v => {
            return lc_match(v.name, q);
        }));
    }, [q, teachers]);
    return <>
        <Stack direction="column" spacing={1} sx={{padding: '40px'}}>
            <Stack direction="row" spacing={1}>
                <TextField placeholder="Pretraga..." value={q} onChange={e => setQ(e.target.value)} sx={{flexGrow: 1}}/>
                <IconButton onClick={e => nav('/teachers/new')}>
                    <Add/>
                </IconButton>
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Ime</TableCell>
                            <TableCell>Komande</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentTeachers.map(a => <TableRow>
                            <TableCell>{a.id}</TableCell>
                            <TableCell>{a.name}</TableCell>
                            <TableCell>
                                <Stack direction='row'>
                                    <IconButton onClick={async (e) => {
                                        fetcher.submit({}, {
                                            method: 'delete',
                                            action: `/teachers/${a.id}`
                                        });
                                    }}>
                                        <Delete/>
                                    </IconButton>
                                    <IconButton onClick={e => {
                                        nav(`/teachers/${a.id}`);
                                    }}>
                                        <Edit/>
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    </>
}

export default Teachers;