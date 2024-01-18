import * as yup from 'yup';

export const rescheduleSchema = yup.object().shape({
    date: yup
        .date()
        .typeError('Please enter a valid date')
        .required('Date is required')
        .min(new Date(), 'Selected date must be equal to or later than the current date'),

    startTime: yup
        .string()
        .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time')
        .required('Start time is required'),

    endTime: yup
        .string()
        .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time')
        .required('End time is required')
        .when('startTime', (startTime, schema) => {
            return schema.test({
                test: endTime => !endTime || endTime > startTime,
                message: 'End time must be later than start time',
            });
        }),
});
