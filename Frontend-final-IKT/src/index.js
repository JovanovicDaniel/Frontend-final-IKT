 import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Navigate, RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import Subjects from './Subjects';
import Teachers from './Teachers';
import Teacher from './Teacher';
import NewTeacher from './NewTeacher';
import NewSubject from './NewSubject';
import Subject from './Subject';
import { check_login} from './login_logic';
import {Box, Container, Icon, Stack, Typography } from '@mui/material';
import { Error } from '@mui/icons-material';

const ErrorDisplay = ({entity}) => {
  const error = useRouteError();
  if(error.cause === 'login'){
    return <Navigate to="/"/>;
  }else if(error.cause === 'security'){
    return <Container><Stack direction={'row'}>
      <Icon><Error/></Icon>
      <Typography variant='h4'>Niste ovlašćeni za taj zahtev.</Typography>
      <Icon><Error/></Icon>
    </Stack></Container>
  }
  return <Container>
    <Stack direction={'column'} spacing={1}>
      <Typography variant='h4'>Desila se greška u učitavanju {entity}</Typography>
      <Typography>
      Jako nam je žao. Možda niste pokrenuli back-end server? 
      </Typography>
      <Typography variant='h6'>Interna greška je: </Typography>
      <Box>
        <pre>
          {error.message}          
        </pre>
      </Box>
    </Stack>
  </Container>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "subjects",
        element: <Subjects/>,
        loader: async () => {
          const user = check_login(['admin', 'user']);
          let b = await fetch("http://localhost:8080/api/v1/subjects");
          let bb = await b.json();
          return [bb];
        },
        errorElement: <ErrorDisplay entity="predmeta"/>
      },
      {
        path: "teachers",
        element: <Teachers/>,
        errorElement: <ErrorDisplay entity="nastavnika"/>,
        loader: async () => {
          const user = check_login(['admin', 'user']);
          return fetch("http://localhost:8080/api/v1/teachers");
        }
      },
      {
        path: "teachers/:id",
        element: <Teacher/>,
        errorElement: <ErrorDisplay entity="nastavnika"/>,
        loader: async ({params}) => {
          const user = check_login(['admin']);
          return fetch(`http://localhost:8080/api/v1/teachers/${params.id}`);
        },
        action: async ({params, request}) => {
          const user = check_login(['admin']);
          if(request.method === 'DELETE'){
            return fetch(`http://localhost:8080/api/v1/teachers/${params.id}`, {
              method: 'DELETE'
            });
          }else if(request.method === 'PUT'){
            const user = check_login(['admin']);
            const data = Object.fromEntries(await request.formData());
            return fetch(`http://localhost:8080/api/v1/teachers/${params.id}`, {
              method: 'PUT',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            });
          }
        }
      },
      {
        path: "teachers/new",
        element: <NewTeacher/>,
        errorElement: <ErrorDisplay entity="nastavnika"/>,
        loader: () => {
          const u = check_login(['admin']);
          return u;
        },
        action: async ({request}) => {
          const user = check_login(['admin']);
          if(request.method === 'POST'){
            const data = Object.fromEntries(await request.formData());
            return fetch(`http://localhost:8080/api/v1/teachers`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            });
          }
        }
      },
      {
        path: "subjects/new",
        element: <NewSubject/>,
        errorElement: <ErrorDisplay entity="predmeta"/>,
        loader: () => {
          const u = check_login(['admin']);
          return u;
        },
        action: async ({request}) => {
          const user = check_login(['admin']);
          if(request.method === 'POST'){
            const data = Object.fromEntries(await request.formData());
            return fetch(`http://localhost:8080/api/v1/subjects`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            });
          }
        }
      },
      {
        path: "subjects/:id",
        element: <Subject></Subject>,
        errorElement: <ErrorDisplay entity="predmeta"/>,
        loader: async ({params}) => {
          const user = check_login(['admin']);
          let b = await fetch(`http://localhost:8080/api/v1/subjects/${params.id}`);
          let bb = await b.json();
          return [bb];
        },
        action: async ({params, request}) => {
          const user = check_login(['admin']);
          if(request.method === 'DELETE'){
            return fetch(`http://localhost:8080/api/v1/subjects/${params.id}`, {
              method: 'DELETE'
            });
          }else if(request.method === 'PUT'){
            const user = check_login(['admin']);
            const data = Object.fromEntries(await request.formData());
            return fetch(`http://localhost:8080/api/v1/subjects/${params.id}`, {
              method: 'PUT',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            });
          }     
      },
    }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);