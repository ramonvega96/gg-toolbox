import { useIntl } from 'react-intl';
import ggLogo from '../../assets/images/nutbox/grow_and_go_logo.png';
import deakinUni from '../../assets/images/digitalResources/lumpyRoadToSolids/deakinUni.png';
import globe from '../../assets/images/digitalResources/lumpyRoadToSolids/globe.png';
import nsw from '../../assets/images/digitalResources/lumpyRoadToSolids/NSWGov.png';
import prevention from '../../assets/images/digitalResources/lumpyRoadToSolids/PreventionCentre.jpg';

function SupportedBy() {
    const messages = useIntl();
    return (
        <div className="flex flex-col">
            <div className="flex shadow-[0_35px_60px_15px_rgba(0,0,0,0.3)] mb-36">
                <div className="xs:border-b-8 md:border-b-[12px] border-tblightGreen w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbYellow w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbDarkPink w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbDarkRed w-full" />
            </div>
            <div className="flex flex-col xs:px-16 md:px-20 xl:px-36 py-12 -mt-36">
                <h1 className="font-gelica font-bold mb-4 text-tbSecondaryBlue xl:text-5xl md:text-2xl xs:text-xl">
                    {messages.formatMessage({
                        id: 'proudlySupportedBy',
                    })}
                </h1>
                <div className="flex flex-row flex-wrap justify-center items-center w-full gap-8">
                    <img
                        src={deakinUni}
                        alt="Deakin Logo"
                        className="xs:w-32 md:w-32"
                    />
                    <img
                        src={nsw}
                        alt="NSW Logo"
                        className="xs:w-32 md:w-32"
                    />
                    <img
                        src="https://stluc.manta.uqcloud.net/elipse/public/gogrow/partners/uq-logo-purple.png"
                        alt="UQ Logo"
                        className="xs:w-32 md:w-56"
                    />
                    <img
                        src={globe}
                        alt="GLOBE logo"
                        className="xs:w-32 md:w-56"
                    />
                    <img
                        src={ggLogo}
                        alt="G&G Logo"
                        className="xs:w-32 md:w-56"
                    />
                    <img
                        src={prevention}
                        alt="Australian Prevention Partnership Center"
                        className="xs:w-32 md:w-56"
                    />
                </div>
            </div>
        </div>
    );
}

export default SupportedBy;
