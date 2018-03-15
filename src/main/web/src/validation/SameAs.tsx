import { createValidatorResult, Validator } from './validation';
import { FormApi } from 'react-form';

export function SameAs(matchKey: string, matchFieldName?: string | null, fieldName?: string): Validator<any> {
    return (fieldValue: any, formValues?: any, formApi?: FormApi)  => {
        if (formValues[matchKey] !== fieldValue) {
            const field = fieldName ? fieldName : 'Field';
            const matchField = typeof matchFieldName === 'string' ? (' ' + matchFieldName) : '';

            return createValidatorResult( field + 'doesn\'t match' + matchField + '.');
        }

        return createValidatorResult();
    };
}