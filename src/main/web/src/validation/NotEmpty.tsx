import { createValidatorResult, Validator } from './validation';
import { FormApi } from 'react-form';

export function NotEmpty(fieldName?: string): Validator<string> {
    return (fieldValue: string, formValues?: any, formApi?: FormApi) => {
        if (fieldValue == null || fieldValue === '') {
            const field = fieldName ? fieldName : 'Field';
            return createValidatorResult(field + ' must have a value.');
        }

        return createValidatorResult();
    };
}