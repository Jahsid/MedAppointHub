import * as yup from 'yup';

// const positiveIntegerRule = /^[1-9]\d*$/;

export const editSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(20)
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Only alphabets and one space are allowed')
        .required('Required'),

    mobile: yup
        .string()
        .matches(/^\d{10}$/, 'Phone number should be a 10-digit number')
        .required('Phone number is required'),

    age: yup
        .number('Invalid age')
        .positive('Age must be a positive number')
        .integer('Age must be an integer')
        .required('Age is required'),

    gender: yup
        .string()
        .oneOf(['male', 'female', 'other'], 'Invalid gender')
        .required('Gender is required'),
});
