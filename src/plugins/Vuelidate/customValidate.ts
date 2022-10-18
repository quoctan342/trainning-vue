import { helpers } from 'vuelidate/lib/validators';

export const validateDateBefore = (value: string) => {
    const date_value = new Date(value);
    const today = new Date();
    return !helpers.req(value) || date_value <= today;
};
