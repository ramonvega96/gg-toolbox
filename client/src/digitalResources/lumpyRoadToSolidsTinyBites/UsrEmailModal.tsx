import { useIntl } from 'react-intl';
import { formatText } from './sharedComponents/ModalLayout';
import TextArrowButton from '../sharedComponents/TextArrowButton';
import FormInput, { FormErrors } from '../../components/home/Contact/FormInput';
import { useEffect, useState } from 'react';

interface IUsrEmailModal {
    setAnalitycsUser: (value: string) => void;
}

function UsrEmailModal(props: IUsrEmailModal) {
    const messages = useIntl();
    const [usrEmail, setUsrEmail] = useState<string>('');
    const [blockSubmit, setBlockSubmit] = useState<boolean>(true);
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    useEffect(() => {
        const isFormValid = () => {
            if (usrEmail === '' || Object.keys(formErrors).length > 0) {
                return true;
            }
            return false;
        };

        setBlockSubmit(isFormValid());
    }, [usrEmail, formErrors]);

    return (
        <div>
            <div className="px-12">
                <h1 className="font-gelica font-bold xs:text-xl xl:text-2xl text-tbSecondaryBlue mb-4">
                    {messages.formatMessage({
                        id: 'usrEmailModalHeading',
                    })}
                </h1>
                <div className="flex mb-8">
                    <div className="border-b-8 border-tblightGreen w-full" />
                    <div className="border-b-8 border-tbYellow w-full" />
                    <div className="border-b-8 border-tbDarkPink w-full" />
                    <div className="border-b-8 border-tbDarkRed w-full" />
                </div>
                {formatText(
                    messages.formatMessage({
                        id: 'usrEmailModalDesc1',
                    })
                )}
                <div className="xs:w-full md:w-3/4 pb-4">
                    <FormInput
                        type="text"
                        styling="h-8"
                        width="w-full"
                        labelStyle="font-roboto text-base"
                        labelId="emailAddress"
                        value={usrEmail}
                        onChange={(value: string) => setUsrEmail(value)}
                        maxLength={320}
                        setFormErrors={setFormErrors}
                        mandatory={true}
                    />
                    <TextArrowButton
                        topText="Save Email"
                        onClickEffect={() => props.setAnalitycsUser(usrEmail)}
                        coloursStyling={
                            blockSubmit
                                ? 'pointer-events-none opacity-50 bg-tbTeal'
                                : 'bg-tbTeal hover:bg-tbDarkTeal'
                        }
                        paddingStyling="py-2 px-4"
                    />
                </div>
                {formatText(
                    messages.formatMessage({
                        id: 'usrEmailModalDesc2',
                    })
                )}
                {formatText(
                    messages.formatMessage({
                        id: 'usrEmailModalDesc3',
                    })
                )}
                <div className="xs:w-full md:w-3/4 pb-8">
                    <TextArrowButton
                        topText="Go to the resource"
                        onClickEffect={() =>
                            props.setAnalitycsUser('anonymous')
                        }
                        coloursStyling="bg-tbTeal hover:bg-tbDarkTeal"
                        paddingStyling="py-2 px-4"
                    />
                </div>
            </div>
        </div>
    );
}

export default UsrEmailModal;
