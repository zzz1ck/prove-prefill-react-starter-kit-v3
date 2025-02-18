//package import 
import * as yup from 'yup';
import { matchIsValidTel, } from 'mui-tel-input';
//module import 
import { AppEnv } from '../../services/prove-service/(definitions)';

export const createValidationSchema = (appEnv: AppEnv) => yup.object().shape({
    last4SSN: yup
        .string()
        .optional(),
    dob: yup
        .string()
        .optional(),
    phoneNumber: yup
        .string()
        .test('is-valid-phone', 'Invalid phone number', (value: string | undefined) => {
            if (appEnv === AppEnv.SANDBOX) {
                return value?.length === 12;
            } else {
                return matchIsValidTel(value || '');
            }
        })
        .required('Phone number is required')
}).test('either-ssn-or-dob', 'Either Last 4 SSN or DOB is required', function(value) {
        return Boolean(value.last4SSN) || Boolean(value.dob);
    });

export type ChallengePageData = yup.InferType<ReturnType<typeof createValidationSchema>>;
