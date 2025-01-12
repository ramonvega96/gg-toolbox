import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import AustraliaInteractiveMap from './home/components/AustraliaInteractiveMap';
import { useNavigate } from 'react-router-dom';

const ATSIHomeMapComponent = () => {
    const messages = useIntl();
    const [selectedState, setSelectedState] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedState)
            navigate(
                `/search?state=${selectedState.toLowerCase()}&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples`
            );
    }, [selectedState, navigate]);

    return (
        <div className="flex flex-col md:flex-row gap-2 bg-[#f8952a33] xs:px-16 md:px-20 xl:px-36 py-16">
            <div className="flex flex-col w-full md:w-1/2">
                <h2 className="font-omnes mymd:text-4xl text-3xl text-primaryBlueDark">
                    {messages.formatMessage({
                        id: 'resourceByLocation',
                    })}
                </h2>
                <span className="font-forma tracking-normal py-8 xl:text-2xl text-xl text-primaryBlueDark">
                    {messages.formatMessage({
                        id: 'resourceByLocationInstruction',
                    })}
                </span>
            </div>
            <div className="overflow-hidden block justify-center w-full max-w-[700px]">
                <AustraliaInteractiveMap setSelectedState={setSelectedState} />
            </div>
        </div>
    );
};

export default ATSIHomeMapComponent;
