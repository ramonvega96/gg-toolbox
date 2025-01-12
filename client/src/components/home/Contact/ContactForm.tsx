/**
 * The ContactForm component is a form that allows users to send an email with a
 * subject and message.
 */
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import FormInput from './FormInput';
import { FormErrors } from './FormInput';
import { IContactForm, submitContactForm } from '../../../utils/NetworkCalls';
import ReCAPTCHA from 'react-google-recaptcha';

function ContactForm() {
    const messages = useIntl();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<IContactForm>({
        firstName: '',
        lastName: '',
        emailAddress: '',
        subject: '',
        message: '',
    });

    const [blockSubmit, setBlockSubmit] = useState<boolean>(true);
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    useEffect(() => {
        const isFormValid = () => {
            for (const key in formValues) {
                if (
                    formValues[key as keyof IContactForm] === '' ||
                    Object.keys(formErrors).length > 0
                ) {
                    return true;
                }
            }
            return false;
        };

        setBlockSubmit(isFormValid());
    }, [formValues, formErrors]);

    function handleRecaptchaChange(value: string | null) {
        setIsRecaptchaVerified(!!value);
    }

    return (
        <div className="max-mymd:w-full mymd:w-3/5 flex flex-col max-xl:px-20 xl:px-36 py-24 text-formTextGrey gap-4">
            <div className="w-full flex max-mymd:flex-col md:flex-row gap-8">
                <FormInput
                    type="text"
                    styling="h-12"
                    width="max-mymd:w-full mymd:w-1/2"
                    labelId="firstName"
                    value={formValues.firstName}
                    onChange={(value: string) =>
                        setFormValues((prevState) => {
                            return {
                                ...prevState,
                                firstName: value,
                            };
                        })
                    }
                    maxLength={35}
                    setFormErrors={setFormErrors}
                    mandatory={true}
                />
                <FormInput
                    type="text"
                    styling="h-12"
                    width="max-mymd:w-full mymd:w-1/2"
                    labelId="lastName"
                    value={formValues.lastName}
                    onChange={(value: string) =>
                        setFormValues((prevState) => {
                            return {
                                ...prevState,
                                lastName: value,
                            };
                        })
                    }
                    maxLength={35}
                    setFormErrors={setFormErrors}
                    mandatory={true}
                />
            </div>
            <FormInput
                type="text"
                styling="h-12"
                width="w-full"
                labelId="emailAddress"
                value={formValues.emailAddress}
                onChange={(value: string) =>
                    setFormValues((prevState) => {
                        return {
                            ...prevState,
                            emailAddress: value,
                        };
                    })
                }
                maxLength={320}
                setFormErrors={setFormErrors}
                mandatory={true}
            />
            <FormInput
                type="text"
                styling="h-12"
                width="w-full"
                labelId="subject"
                value={formValues.subject}
                onChange={(value: string) =>
                    setFormValues((prevState) => {
                        return {
                            ...prevState,
                            subject: value,
                        };
                    })
                }
                maxLength={100}
                setFormErrors={setFormErrors}
                mandatory={true}
            />
            <FormInput
                type="textarea"
                styling="h-48"
                width="w-full"
                labelId="message"
                value={formValues.message}
                onChange={(value: string) =>
                    setFormValues((prevState) => {
                        return {
                            ...prevState,
                            message: value,
                        };
                    })
                }
                maxLength={1000}
                setFormErrors={setFormErrors}
                mandatory={true}
            />
            <ReCAPTCHA
                sitekey={
                    (process.env.REACT_APP_RECAPTCHA_CYPRESS_KEY
                        ? process.env.REACT_APP_RECAPTCHA_CYPRESS_KEY
                        : process.env.REACT_APP_RECAPTCHA_KEY) as string
                }
                onChange={handleRecaptchaChange}
                size="compact"
            />
            <button
                id="find-help-button"
                className={`${
                    blockSubmit || !isRecaptchaVerified
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                } bg-primaryBlue mt-2 text-white p-6 flex justify-between items-center hover:bg-primaryBlueDark 
                max-md:w-full md:w-2/3`}
                onClick={() => {
                    if (!blockSubmit && isRecaptchaVerified) {
                        submitContactForm(formValues);
                        navigate('/?pathway=grow-and-go');
                    }
                }}
            >
                <span className="text-xl">
                    {messages.formatMessage({ id: 'submit' })}
                </span>
                <Arrow
                    fill="white"
                    width="2em"
                />
            </button>
        </div>
    );
}
export default ContactForm;
