export type Validator<S> = (value: S, state?: any) => S;

export interface ValidatorsMapObject {
    [key: string]: Validator<any>;
}

export function combineValidators(validators: ValidatorsMapObject): Validator<any> {
    let validatorKeys = Object.keys(validators);
    const finalValidators = {};
    for (let key of validatorKeys) {
        if (typeof validators[key] === 'function') {
            finalValidators[key] = validators[key];
        }
    }
    const finalValidatorKeys = Object.keys(finalValidators);

    return function combination(value: any = {}) {
        const nextValue = {};
        for (let key of finalValidatorKeys) {
            nextValue[key] = finalValidators[key](value[key], value);
        }
        return nextValue;
    };
}