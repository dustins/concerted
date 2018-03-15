import { FormApi } from 'react-form';
import { createValidatorResult, Validator } from './validation';

export function Size(min: number = 0,
                     max: number = Number.MAX_SAFE_INTEGER,
                     fieldName?: string): Validator<string | any[] | { [key: string]: any }> {
    const field = fieldName ? fieldName : 'Field';
    const minMessage = field + ' must be greater than ' + min + '.';
    const maxMessage = field + ' must be less than ' + max + '.';

    return (fieldValue: string | any[] | { [key: string]: any }, formValues?: any, formApi?: FormApi) => {
        if (fieldValue == null) {
            return createValidatorResult(minMessage);
        }

        switch (typeof fieldValue) {
            case 'string':
                return createValidatorResult(stringCheck(fieldValue as string));
            case 'object':
                return createValidatorResult(objectCheck(fieldValue));
            default:
                return createValidatorResult();
        }
    };

    function sizeCheck(value: number): string | null {
        if (value < min) {
            return minMessage;
        }

        if (value > max) {
            return maxMessage;
        }

        return null;
    }

    function stringCheck(value: string): string | null {
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