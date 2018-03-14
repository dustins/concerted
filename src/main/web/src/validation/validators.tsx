export function NotEmpty(value: string): string | null {
    if (value == null || value === '') {
        return 'Field must have a value.';
    }

    return null;
}

export function Email(value: string): string | null {
    if (value == null) {
        return null;
    }

    /* tslint:disable-next-line */
    if (value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) {
        return 'Field must be a valid email.';
    }

    return null;
}

export function Size(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): (value: string) => string | null {
    const minMessage = 'Field must be greater than ' + min + '.';
    const maxMessage = 'Field must be lessthan than ' + max + '.';
    return (value: string) => {
        if (value == null) {
            return minMessage;
        }

        switch (typeof value) {
            case 'string':
                return stringCheck(value);
            case 'object':
                return objectCheck(value);
            default:
                return null;
        }
    };

    function sizeCheck(value: number) {
        if (value < min) {
            return minMessage;
        }

        if (value > max) {
            return maxMessage;
        }

        return null;
    }

    function stringCheck(value: string) {
        return sizeCheck(value.trim().length);
    }

    function checkArray(value: Array<any>) {
        return sizeCheck(value.length);
    }

    function objectCheck(value: any) {
        if (Array.isArray(value)) {
            return checkArray(value);
        }

        if (value.hasOwnProperty('size')) {
            return sizeCheck(value.size());
        }

        return null;
    }
}

export function SameAs(key: string, name: string | null = null): (value: string, state: any) => string | null {
    return (value: string, state: any) => {
        if (state[key] !== value) {
            if (name) {
                return 'Field must match ' + name + '.';
            } else {
                return 'Field doesn\'t match.';
            }
        }

        return null;
    };
}