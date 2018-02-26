export function reducer(state: any = [], action: any): any {
    switch (action.type) {
        case 'AUTHENTICATION_CHANGE':
            return {authenticated: action.authenticated};
        default:
            return state;
    }
}