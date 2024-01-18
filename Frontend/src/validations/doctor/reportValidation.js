import * as yup from 'yup';

export const reportSchema = yup.object().shape({
    // patientName: yup
    //     .string()
    //     .matches(/^\S*$/, 'Spaces are not allowed')
    //     .required('Name is required'),
    history: yup
        .string()
        // .matches(/^\S*$/, 'Spaces are not allowed')
        .required('Medical history is required  / if there is no details add NONE'),
    investigation: yup
        .string()
        // .matches(/^\S*( \S*)?$/, 'Spaces are not allowed')
        .required('Investigation history is required / if there is no details add NONE'),
    age: yup
        .number()
        .typeError('Age must be a number')
        .integer('Age must be an integer')
        .positive('Age must be a positive number')
        .required('Age is required'),
    weight: yup
        .number()
        .typeError('Weight must be a number')
        .integer('Weight must be an integer')
        .positive('Weight must be a positive number')
        .required('Weight is required'),
    gender: yup.string().required('Gender is required'),
    complaint: yup
        .string()
        // .matches(/^\S*$/, 'Spaces are not allowed')
        .required('Please add complaints'),
    diagnosis: yup.string().required('Please add diagnosis')
    ,
    additionalInfo: yup.string().required('Additional Information is required')
    ,
});
