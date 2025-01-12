import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { ReactComponent as Arrow } from '../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import AustraliaInteractiveMap from './home/components/AustraliaInteractiveMap';
import MultiPurposeModal from './FHP/modals/MultiPurposeModal';
import { ECECMapModal } from './FHP/types/Modals';
import ECECModalContent from '../assets/json/ECECModalContent.json';

const ECECHomeMapComponent = () => {
    const messages = useIntl();
    const [modal, setModal] = useState(false);
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        const noModalStates = ['WA', 'SA', 'QLD'];
        if (selectedState) {
            if (!noModalStates.includes(selectedState)) setModal(!modal);
            else {
                switch (selectedState) {
                    case 'WA':
                        window.open('https://www.freshsnap.org.au', '_blank');
                        return;
                    case 'SA':
                        window.open('https://www.freshsnap.org.au', '_blank');
                        return;
                    case 'QLD':
                        window.open(
                            'https://naqld.org/services/food-foundations/',
                            '_blank'
                        );
                        return;
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedState]);

    const getModalContent = (state: string): ECECMapModal => {
        switch (state) {
            case 'NSW':
                return ECECModalContent.NSW;
            case 'VIC':
                return ECECModalContent.VIC;
            case 'TAS':
                return ECECModalContent.TAS;
            case 'ACT':
                return ECECModalContent.ACT;
            case 'NT':
                return ECECModalContent.NT;
            default:
                return ECECModalContent.NSW;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-2 bg-[#1e9b5033] xs:px-16 md:px-20 xl:px-36 py-16">
            <div
                id="australia-page-container"
                className="relative z-[50]"
            >
                {modal && (
                    <MultiPurposeModal
                        toggleModal={setModal}
                        modalContent={getModalContent(selectedState)}
                    />
                )}
            </div>
            <div className="flex flex-col w-full md:w-1/2">
                <h2 className="font-omnes mymd:text-3xl text-3xl text-primaryBlueDark">
                    {messages.formatMessage({
                        id: 'ECECStateSpecificTitle',
                    })}
                </h2>
                <span className="font-forma tracking-normal py-8 xl:text-2xl text-xl text-primaryBlueDark">
                    {messages.formatMessage({
                        id: 'ECECStateSpecificDescription',
                    })}
                </span>
                <button
                    id="find-help-button"
                    className="bg-secondaryGreen text-white mt-2 mb-8 bottom-5 p-6 flex justify-between items-center mymd:top-80 top-60 w-4/5 max-md:w-full hover:bg-primaryBlueDark"
                    onClick={() => {
                        window.open(
                            'https://www.acecqa.gov.au/nqf/national-quality-standard',
                            '_blank'
                        );
                    }}
                >
                    <span className="max-sm:text-xs max-lg:text-base xl:text-xl !leading-1">
                        {messages.formatMessage({
                            id: 'ECECStateSpecificButton',
                        })}
                    </span>
                    <Arrow
                        fill="white"
                        width="2em"
                    />
                </button>
            </div>
            <div className="overflow-hidden block justify-center w-full max-w-[700px]">
                <AustraliaInteractiveMap setSelectedState={setSelectedState} />
            </div>
        </div>
    );
};

export default ECECHomeMapComponent;
