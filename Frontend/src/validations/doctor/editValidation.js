import * as yup from 'yup';

export const drEditSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(20)
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Only alphabets and one space are allowed')
        .required('Required'),
    mobile: yup
        .string()
        .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    experience: yup
        .string()
        .matches(/^\d+$/, 'Experience must be a number')
        .required('Experience is required'),
    // Add validation for other fields as needed
    speciality: yup.string().required('Speciality is required'),
    bio: yup.string(),
    // Add validation for the 'photo' field if needed
});

