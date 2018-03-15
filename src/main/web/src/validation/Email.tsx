import { createValidatorResult, Validator } from './validation';
import { FormApi } from 'react-form';

export function Email(fieldName?: string): Validator<string> {
    return (fieldValue: string, formValues?: any, formApi?: FormApi) => {
        fieldValue = fieldValue || '';

        /* tslint:disable-next-line */
        if (fieldValue.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) {
            const field = fieldName ? fieldName : 'Field';

            return createValidatorResult(field + ' must be a valid email.');
        }

        return createValidatorResult();
    };
}
