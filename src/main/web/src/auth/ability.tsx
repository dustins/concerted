import { Ability, AbilityBuilder } from 'casl';

/**
 * Defines how to detect object's type: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
 */
function subjectName(item: any) {
    if (!item || typeof item === 'string') {
        return item;
    }

    return item.__type;
}

function admin(can: Function) {
    can('crate', 'all');
    can('read', 'all');
    can('update', 'all');
    can('delete', 'all');
}

function user(can: Function) {
    can('read', 'all');
}

export default function (principal: any): Ability {
    return AbilityBuilder.define({subjectName}, (can: Function, cannot: Function) => {
        if (principal == null) {
            return;
        }

        if (principal.roles.findIndex((value: String) => value === 'ROLE_ADMIN')) {
            admin(can);
        }

        if (principal.roles.findIndex((value: String) => value === 'ROLE_USER')) {
            user(can);
        }
    });
}