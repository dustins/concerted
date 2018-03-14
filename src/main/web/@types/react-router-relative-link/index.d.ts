declare module "react-router-relative-link" {
    import { Link, NavLink } from 'react-router-dom';

    export class RelativeLink extends Link {}
    export class RelativeNavLink extends NavLink {}
}