import * as jwt_decode from 'jwt-decode';

export class TokenManager {
    getDecoded()  {
        const token = localStorage.getItem('token');
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    getName() {
        const token = localStorage.getItem('token');
        try {
            return jwt_decode(token).name;
        } catch (Error) {
            return null;
        }
    }

      getId() {
        const token = localStorage.getItem('token');
        try {
            return jwt_decode(token)._id;
        } catch (Error) {
            return null;
        }
    }
}
