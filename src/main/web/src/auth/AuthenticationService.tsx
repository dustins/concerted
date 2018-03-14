import Cookie from 'js-cookie';

export interface AuthenticationToken {
    username: string;
    password: string;
}

export interface Authentication {
    failure: string | null;
    isRequesting: boolean;
    principal: {
        username: String | null;
        roles: Array<String>;
    } | null;
}

export class AuthenticationService {
    static async authenticate(token: AuthenticationToken): Promise<Authentication> {
        return await fetch('/login', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(token),
            headers: {
                'content-type': 'application/json',
                'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN') || ''
            },
            redirect: 'follow'
        }).then(response => {
            if (!response.ok) {
                throw 'Bad Credentials';
            }

            return response.json();
        });
    }

    static async logout(): Promise<boolean> {
        return await fetch('/logout', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN') || ''
            },
            redirect: 'follow'
        }).then(response => {
            return response.ok;
        });
    }

    static async refresh(): Promise<Authentication> {
        return await fetch('/auth/authenticated', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN') || ''
            },
            redirect: 'follow'
        }).then(response => {
            return response.json();
        });
    }
}