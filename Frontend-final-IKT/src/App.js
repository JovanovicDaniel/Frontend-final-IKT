import { NavLink, Outlet } from "react-router-dom";
import { AppBar, Box, Divider, Drawer, IconButton, Stack, Toolbar, Typography, Button, createTheme, ThemeProvider, CssBaseline, FormGroup, FormControlLabel, Switch} from "@mui/material";
import { ChevronLeft, Menu, School } from "@mui/icons-material";
import { createContext, useMemo, useState } from "react";
import { prvo_veliko } from "./tekstAlati";
import { useLogin } from "./login_logic";
import LoginControl from "./LoginControl";

const create_palette = (mode) => {
  let r = {};
  if(mode === 'light'){
    r = {
      mode: mode,
      primary: {
        main: "#009127"
      },
      divider: "#00300d",
      text: {
        primary: "#00000",
        secondary: "#424242"
      }
    }
  }else{
    r = {
      mode: mode,
      primary: {
        main: "#e68e00"
      },
      divider: "#663f00",
      text: {
        primary: "#EEEEEE",
        secondary: "#A0A0A0"
      }
    }
  }
  return {
    palette: r
  }
}

export const UserContext = createContext(null);

function App() {
  const [otvoreno, setOtvoreno] = useState(false);
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => createTheme(create_palette(mode)), [mode]);
  const [user, login, logout] = useLogin();
  return <>
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{user, login, logout}}>
      <CssBaseline/>
      <Stack direction="column">
        <AppBar sx={{ height: "60px", flexDirection: "row" }}>
          <Toolbar>
            <IconButton
              onClick={e => {
                setOtvoreno(!otvoreno);
              }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', lineHeight: 2.5 }}>Škola <School /> </Typography>
          <Typography sx={{lineHeight: 2.5, paddingRight: "30px"}}>{(user) ? `Korisnik: ${user.name}` : "Ulogujte se u meniju."}</Typography>
        </AppBar>
        <Drawer
          anchor="left"
          open={otvoreno}
          onClose={e => setOtvoreno(false)}
        >
          <Box>
            <IconButton onClick={e => setOtvoreno(false)}>
              <ChevronLeft />
            </IconButton>
          </Box>
          <Divider />
              <LoginControl safePath="/" defaultPath="/subjects"/>
          <Divider />
              <Box>
                <FormGroup>
                  <FormControlLabel 
                    label={prvo_veliko(mode)} 
                    control={<Switch checked={mode === 'dark'} onChange={e => {
                      if(e.target.checked){
                        setMode('dark');
                      }else{
                        setMode('light');
                      }
                    }}/>}
                  />
                </FormGroup>
              </Box>
          <Divider />
          <Stack direction="column" spacing={1}>
            <Button component={NavLink} to={'subjects'}>Predmeti</Button>
            <Button component={NavLink} to={'teachers'}>Nastavnici</Button>
          </Stack>
        </Drawer>
        <Box sx={{ paddingTop: "60px" }}>
          <Outlet />
        </Box>
      </Stack>
      </UserContext.Provider>
    </ThemeProvider>
  </>;
}

export default App;
