import { extend, configure } from 'vee-validate';
import { required, numeric, max_value } from 'vee-validate/dist/rules';

//config css error status
configure({
    classes: {
        valid: 'input-valid',
        invalid: 'input-invalid',
    },
});

extend('required', {
    ...required,
    message: '{_field_} is required' as string,
});

extend('numeric', {
    ...numeric,
    message: '{_field_} must be number' as string,
});

extend('max_value', {
    ...max_value,
    message: 'Max sale is {max}' as string,
});

extend('validate_date', {
    validate(value: string): boolean {
        const date_value = new Date(value);
        const today = new Date();
        return date_value <= today;
    },
    message: '{_field_} must be before today',
});
