import { FormApi } from 'react-form';

export interface ValidatorResult {
    error: string[] | null;
    warning: string[] | null;
    success: string[] | null;
}

export type Validator<S> = (fieldValue: S, formValues?: any, formApi?: FormApi) => ValidatorResult;

export type ValidatorCreator = (...args: any[]) => Validator<any>;

export interface ValidatorsMapObject {
    [key: string]: Validator<any>;
}

export interface ValidatorsResultObject {
    [key: string]: ValidatorResult;
}

export interface ValidatorsCombination {
    (fieldValue: any, formValues?: any, formApi?: FormApi): ValidatorsResultObject;
}

export function combineValidators(validators: ValidatorsMapObject): ValidatorsCombination {
    let validatorKeys = Object.keys(validators);
    const finalValidators = {};
    for (let key of validatorKeys) {
        if (typeof validators[key] === 'function') {
            finalValidators[key] = validators[key];
        }
    }
    const finalValidatorKeys = Object.keys(finalValidators);

    return (fieldValue: any, formValues?: any, formApi?: FormApi) => {
        const nextValue: ValidatorsResultObject = {};
        for (let key of finalValidatorKeys) {
            nextValue[key] = finalValidators[key](fieldValue[key], fieldValue, formApi);
        }
        return nextValue;
    };
}

export function createValidatorResult(error?: string | null,
                                      warning?: string | null,
                                      success?: string | null): ValidatorResult {
    return {
        error: error ? [error] : null,
        warning: warning ? [warning] : null,
        success: success ? [success] : null
    };
}

export function composeValidators(...validators: Validator<any>[]): Validator<any> {
    return (fieldValue: any, formValues?: any, formApi?: FormApi) => {
        return validators.map(validator => validator(fieldValue))
            .reduce(((previousValue, currentValue, currentIndex, array) => {
            return {
                error: (previousValue.error || []).concat(currentValue.error || []),
                warning: (previousValue.warning || []).concat(currentValue.warning || []),
                success: (previousValue.success || []).concat(currentValue.success || []),
            };
        }));
    };
}