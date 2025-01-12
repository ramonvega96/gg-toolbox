/**
 * This component is used to display the logos of the logos under the "Proudly Supported By" header
 */
import { useIntl } from 'react-intl';

const ProudlySupported = () => {
    const messages = useIntl();
    return (
        <div className="flex flex-col items-center justify-center w-full py-10 border-b-8 border-b-secondaryOrange max-mymd:px-16 mymd:px-20 xl:px-36">
            <h2 className="font-omnes text-4xl font-bold text-center mb-0 text-primaryBlueDark">
                {messages.formatMessage({ id: 'proudlySupportedBy' })}
            </h2>
            <div className="flex flex-row flex-wrap justify-center items-center w-full gap-10">
                <img
                    src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/aus_gov.png"
                    alt="Logo1"
                    className="w-64"
                />
                <img
                    src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/uq-logo-purple.png"
                    alt="Logo2"
                    className="w-64"
                />
            </div>
        </div>
    );
};

export default ProudlySupported;
