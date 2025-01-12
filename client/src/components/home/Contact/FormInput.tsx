/**
 * This component is a form input field.
 */

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import FormDropdown from '../Upload/FormDropdown';

export interface FormErrors {
    [key: string]: string;
}

const FormTypeRender = (
    value: string,
    type: string,
    labelId: string,
    fieldError: string,
    validateField: (fieldValue: string) => void,
    styling?: string,
    dropdownContent?: string[],
    maxLength?: number
) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownSelected, setDropdownSelected] = useState(value);

    switch (type) {
        case 'textarea':
            return (
                <div>
                    <textarea
                        id={labelId}
                        className={`border-[1px] border-formBorderGrey w-full bg-white text-black pl-2 pt-2 ${styling}`}
                        value={value}
                        onChange={(e) => validateField(e.target.value)}
                        maxLength={maxLength || Infinity}
                    />
                    <span className="text-red-500">
                        {fieldError && fieldError}
                    </span>
                </div>
            );
        case 'text':
            return (
                <div>
                    <input
                        id={labelId}
                        type="text"
                        className={`border-[1px] border-formBorderGrey w-full bg-white text-black pl-2 ${styling}`}
                        value={value}
                        onChange={(e) => validateField(e.target.value)}
                        maxLength={maxLength || Infinity}
                    />
                    <span className="text-red-500">
                        {fieldError && fieldError}
                    </span>
                </div>
            );
        case 'password':
            return (
                <div>
                    <input
                        id={labelId}
                        type="password"
                        className={`border-[1px] border-formBorderGrey w-full bg-white text-black pl-2 ${styling}`}
                        value={value}
                        onChange={(e) => validateField(e.target.value)}
                        maxLength={maxLength || Infinity}
                    />
                    <span className="text-red-500">
                        {fieldError && fieldError}
                    </span>
                </div>
            );
        case 'url':
            return (
                <div>
                    <input
                        id={labelId}
                        type="url"
                        className={`border-[1px] border-formBorderGrey w-full bg-white text-black pl-2 ${styling}`}
                        value={value}
                        onChange={(e) => validateField(e.target.value)}
                    />
                    <span className="text-red-500">
                        {fieldError && fieldError}
                    </span>
                </div>
            );
        case 'dropdownList':
            return (
                <FormDropdown
                    id={labelId}
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    dropdownSelected={dropdownSelected}
                    setDropdownSelected={setDropdownSelected}
                    dropdownContent={dropdownContent || []}
                    onchange={validateField}
                />
            );
        default:
            return null;
    }
};

interface FormInputProps {
    width: string;
    labelId: string;
    value: string;
    type: string;
    subheader?: string;
    asterisk?: string;
    styling?: string;
    dropdownContent?: string[];
    maxLength?: number;
    mandatory?: boolean;
    labelStyle?: string;
    onChange: (fieldValue: string) => void;
    setFormErrors: Dispatch<SetStateAction<FormErrors>>;
}

const FormInput = ({
    width,
    labelId,
    value,
    type,
    subheader,
    asterisk,
    styling,
    dropdownContent,
    maxLength,
    mandatory,
    labelStyle,
    onChange,
    setFormErrors,
}: FormInputProps) => {
    const messages = useIntl();

    const [fieldError, setFieldError] = useState('');

    const label = mandatory
        ? `${messages.formatMessage({ id: labelId })}*`
        : messages.formatMessage({ id: labelId });

    useEffect(() => {
        setFormErrors((prevState: FormErrors) => {
            if (fieldError.length > 0) {
                return {
                    ...prevState,
                    [labelId]: fieldError,
                };
            } else {
                delete prevState[labelId];
                return { ...prevState };
            }
        });
    }, [fieldError, labelId, setFormErrors]);

    /**
     * This function helps to validate proper values in certain fields.
     * The function understands what the fileld should look like depending on
     * its label.
     */
    const validateField = (fieldVal: string) => {
        if (!fieldVal) setFieldError('');
        else {
            switch (labelId) {
                case 'emailAddress': {
                    // The following regex allows to validate if the email address format is correct
                    const emailRegex = // eslint-disable-next-line max-len
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!emailRegex.test(fieldVal)) {
                        setFieldError(
                            messages.formatMessage({ id: 'invalidEmail' })
                        );
                    } else {
                        setFieldError('');
                    }
                    break;
                }
                case 'resourceURL': {
                    try {
                        new URL(fieldVal);
                        setFieldError('');
                    } catch (e) {
                        setFieldError(
                            messages.formatMessage({ id: 'invalidResourceURL' })
                        );
                    }
                    break;
                }
            }
        }
        onChange(fieldVal);
    };

    return (
        <div className={width}>
            <h5
                className={
                    labelStyle ? labelStyle : 'text-2xl xl:text-3xl font-normal'
                }
            >
                {label}
            </h5>
            {subheader && (
                <p className="text-formTextGrey text-lg">{subheader}</p>
            )}
            {FormTypeRender(
                value,
                type,
                labelId,
                fieldError,
                validateField,
                styling,
                dropdownContent,
                maxLength
            )}

            {asterisk && (
                <p className="text-formTextGrey text-lg mt-2">
                    * {messages.formatMessage({ id: asterisk })}
                </p>
            )}
        </div>
    );
};

export default FormInput;
