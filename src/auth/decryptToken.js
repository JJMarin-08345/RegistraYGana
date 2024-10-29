import {jwtDecode} from 'jwt-decode';

export const decryptToken = (token) => {
    return jwtDecode(token);
};