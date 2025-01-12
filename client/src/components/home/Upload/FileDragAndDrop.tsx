import { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as UploadIcon } from '../../../assets/images/icons/svg/Upload.svg';

interface FormInputProps {
    width: string;
    labelId: string;
    value?: File;
    type: string;
    asterisk?: string;
    styling?: string;
    accept?: string;
    mandatory?: boolean;
    onChange: (fieldValue: File | undefined) => void;
}

const uploadSpecificFileType = (
    type: string,
    e: ChangeEvent<HTMLInputElement>
) => {
    switch (type) {
        case 'image/*':
            if (
                e.target.files &&
                (e.target.files[0].type === 'image/png' ||
                    e.target.files[0].type === 'image/jpeg' ||
                    e.target.files[0].type === 'image/jpg' ||
                    e.target.files[0].type === 'image/svg+xml')
            ) {
                return e.target.files[0];
            }

            break;
        case 'application/pdf':
            if (
                e.target.files &&
                e.target.files[0].type === 'application/pdf'
            ) {
                return e.target.files[0];
            }

            break;

        // this case is for when no file type is specified and any file can be uploaded
        default:
            return e.target.files && e.target.files[0];
    }
};

function FileDragAndDrop({
    width,
    labelId,
    value,
    asterisk,
    styling,
    accept,
    mandatory,
    onChange,
}: FormInputProps) {
    const messages = useIntl();
    const text = mandatory
        ? `${messages.formatMessage({ id: labelId })}*`
        : messages.formatMessage({ id: labelId });

    return (
        <div>
            <div className={width}>
                <h5 className="text-3xl font-normal">{text}</h5>
                <div
                    className={`flex items-center justify-center w-full relative ${styling}`}
                >
                    <input
                        id="dropzone-file"
                        type="file"
                        accept={accept}
                        className="opacity-0 h-full w-full absolute z-[9]"
                        onChange={(e) => {
                            onChange(
                                uploadSpecificFileType(accept || '', e) as File
                            );
                        }}
                    />
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg bg-white top-0 left-0 absolute"
                    >
                        <div
                            className={`flex flex-col items-center justify-center ${
                                value && 'hidden'
                            }`}
                        >
                            <>
                                <UploadIcon
                                    className="w-24 text-formTextGrey"
                                    fill={'#F2F2F2'}
                                />
                                <div className="flex max-lg:flex-col lg:flex-row mt-4 justify-center items-center">
                                    <p className="max-lg:text-md lg:text-xl px-2 mb-1 text-center">
                                        {messages.formatMessage({
                                            id: 'dragAndDrop',
                                        })}
                                    </p>
                                    <div className="border-[1px] bg-checkerGrey py-2 max-lg:px-4 lg:px-16 cursor-pointer">
                                        <p className="text-xl text-white mb-0">
                                            {messages.formatMessage({
                                                id: 'browse',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </>
                        </div>
                        {value && (
                            <div
                                className={`flex flex-col items-center justify-center absolute z-[10]`}
                            >
                                {accept === 'image/*' ? (
                                    <img
                                        src={URL.createObjectURL(value)}
                                        alt={value.name}
                                        className="w-24 h-24"
                                    />
                                ) : (
                                    <UploadIcon
                                        className="w-24 text-formTextGrey"
                                        fill={'primaryBlueDark'}
                                    />
                                )}
                                <p className="text-base text-black mt-4 text-center">
                                    {value.name}
                                </p>
                                <div
                                    className="border-[1px] bg-secondaryRed py-2 max-lg:px-4 lg:px-16 cursor-pointer"
                                    onClick={() => {
                                        onChange(undefined);
                                    }}
                                >
                                    <p className="text-xl text-white mb-0">
                                        {messages.formatMessage({
                                            id: 'remove',
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}
                    </label>
                </div>
            </div>
            {asterisk && (
                <p className="text-formTextGrey text-lg mt-2">
                    * {messages.formatMessage({ id: asterisk })}
                </p>
            )}
        </div>
    );
}

export default FileDragAndDrop;
