import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import FileDragAndDrop from './FileDragAndDrop';
import FormInput from '../Contact/FormInput';
import { FormErrors } from '../Contact/FormInput';
import FormHeader from './FormHeader';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import {
    IShareResourceForm,
    submitResourceForm,
} from '../../../utils/NetworkCalls';
import { submissionTypes } from '../../../utils/FormDropdownItems';

function UploadForm() {
    const messages = useIntl();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<IShareResourceForm>({
        firstName: '',
        lastName: '',
        emailAddress: '',
        resourceTitle: '',
        resource: undefined,
    });

    const [blockSubmit, setBlockSubmit] = useState<boolean>(true);
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [submissionType, setSubmissionType] = useState('');

    useEffect(() => {
        const isFormValid = () => {
            for (const key in formValues) {
                if (
                    formValues[key as keyof IShareResourceForm] === '' ||
                    formValues[key as keyof IShareResourceForm] === undefined ||
                    Object.keys(formErrors).length > 0
                ) {
                    return true;
                }
            }
            return false;
        };

        setBlockSubmit(isFormValid());
    }, [formValues, formErrors]);

    useEffect(() => {
        setFormValues((prevState) => {
            return {
                ...prevState,
                resource: undefined,
            };
        });
    }, [submissionType]);

    function handleRecaptchaChange(value: string | null) {
        setIsRecaptchaVerified(!!value);
    }

    const getMessages = (ids: string[]) => {
        return ids.map((id) => messages.formatMessage({ id }));
    };

    return (
        <div className="max-mymd:w-full mymd:w-3/5 flex flex-col max-xl:px-20 xl:px-36 py-24 text-formTextGrey gap-4">
            <FormHeader
                title={messages.formatMessage({ id: 'submitterInformation' })}
            />
            <div className="w-full flex max-mymd:flex-col md:flex-row gap-8">
                <FormInput
                    type="text"
                    styling="h-12"
                    width="max-md:w-full md:w-1/2"
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
                    width="max-md:w-full md:w-1/2"
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
                width="w-full"
                styling="h-12"
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
            <FormHeader title={messages.formatMessage({ id: 'resource' })} />
            <FormInput
                type="text"
                width="w-full"
                styling="h-12"
                labelId="resourceTitle"
                value={formValues.resourceTitle}
                onChange={(value: string) =>
                    setFormValues((prevState) => {
                        return {
                            ...prevState,
                            resourceTitle: value,
                        };
                    })
                }
                maxLength={100}
                setFormErrors={setFormErrors}
                mandatory={true}
            />
            <FormInput
                type="dropdownList"
                width="w-full"
                styling="h-12"
                labelId="submissionType"
                value={submissionType}
                dropdownContent={getMessages(submissionTypes)}
                onChange={setSubmissionType}
                setFormErrors={setFormErrors}
                mandatory={true}
            />
            {submissionType === messages.formatMessage({ id: 'resourceURL' }) &&
                (!formValues.resource ||
                    typeof formValues.resource === 'string') && (
                    <FormInput
                        type="url"
                        width="w-full"
                        styling="h-12"
                        labelId="resourceURL"
                        value={formValues.resource as string}
                        onChange={(value: string) =>
                            setFormValues((prevState) => {
                                return {
                                    ...prevState,
                                    resource: value,
                                };
                            })
                        }
                        maxLength={250}
                        setFormErrors={setFormErrors}
                        mandatory={true}
                    />
                )}
            {submissionType ===
                messages.formatMessage({ id: 'resourceFile' }) &&
                (!formValues.resource ||
                    typeof formValues.resource === 'object') && (
                    <FileDragAndDrop
                        type="file"
                        width="w-full"
                        styling="h-64 mb-8"
                        labelId="uploadRes"
                        value={formValues.resource as unknown as File}
                        mandatory={true}
                        accept="application/pdf"
                        onChange={(value: File | undefined) =>
                            setFormValues((prevState) => {
                                return {
                                    ...prevState,
                                    resource: value,
                                };
                            })
                        }
                    />
                )}
            <ReCAPTCHA
                sitekey={
                    (process.env.REACT_APP_RECAPTCHA_CYPRESS_KEY
                        ? process.env.REACT_APP_RECAPTCHA_CYPRESS_KEY
                        : process.env.REACT_APP_RECAPTCHA_KEY) as string
                }
                onChange={handleRecaptchaChange}
                size="compact"
            />
            <div
                id="submit-resource"
                className={`${
                    blockSubmit || !isRecaptchaVerified
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                } bg-primaryBlue mt-2 text-white p-6 flex justify-between items-center hover:bg-primaryBlueDark 
                max-md:w-full md:w-2/3`}
                onClick={() => {
                    if (!blockSubmit && isRecaptchaVerified) {
                        submitResourceForm(formValues);
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
            </div>
        </div>
    );
}
export default UploadForm;
