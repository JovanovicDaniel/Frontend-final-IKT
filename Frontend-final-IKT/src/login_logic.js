import { useState } from "react";

export const useLogin = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    return [
        user, 
        (username, password) => {
            if(username === 'admin' && password === 'admin'){
                const nuser = {
                    username: 'admin',
                    name: 'Daniel Jovanović',
                    token: 'deepSecrets',
                    role: 'admin'
                };
                setUser(nuser);
                localStorage.setItem('user', JSON.stringify(nuser));
                return nuser;
            }else if (username === 'user' && password === 'user'){
                const nuser = {
                    username: 'user',
                    name: 'Vuk Jovanović',
                    token: 'deeperSecrets',
                    role: 'user'
                };
                setUser(nuser);
                localStorage.setItem('user', JSON.stringify(nuser));
                return nuser;
            }
            else{
                return null;
            }
        },
        () => {
            setUser(null);
            localStorage.removeItem('user');
        }
    ]
}

export const get_login = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
}

export const check_login = (roles) => {
    const user = get_login();
          if(user === null){
            const err = {
              cause: 'login',
              message: 'Korisnik nije logovan'
            };
            throw err;
          }else if(roles){
            if(!roles.includes(user.role)){
                console.log(user.role);
                const err = {
                    cause: 'security',
                    message: 'Korisnik nema pravo pristupa'
                };
                throw err;
          }
        }
    return user;
}

export const valid_login = (roles) => {
    const user = get_login();
          if(user === null){
            return false;
          }else if(roles){
            if(!roles.includes(user.role)){
                console.log(user.role);
                return false;
          }
        }
    return true;
}