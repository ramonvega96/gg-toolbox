import { useContext, useState } from 'react';
import NavigationButtons from './NavigationButtons';
import { PathwayContext } from '../../utils/Contexts';
import AustraliaMap from './AustraliaMap';
import MCHNButtonsModal from './modals/MCHNButtonsModal';
import { useIntl } from 'react-intl';
import Footer from '../home/Footer';
interface AustraliaInterface {
    setSelectedState(state: string): void;
    professionalPathway: string;
    selectedState: string;
}

function Australia(props: AustraliaInterface) {
    const messages = useIntl();
    const { professionalPathway, selectedState, setSelectedState } = props;
    const { setPath } = useContext(PathwayContext);
    const [modal, setModal] = useState(false);

    function stateOnClickMode() {
        props.professionalPathway === 'MCHN'
            ? setModal(!modal)
            : setPath('needHelp');
    }

    return (
        <>
            <div
                id="australia-page-container"
                className="relative z-10"
            >
                {modal && (
                    <MCHNButtonsModal
                        toggleModal={setModal}
                        state={selectedState}
                        profession="maternal, child and family health nurse"
                    />
                )}
            </div>
            <div
                className={`flex flex-col h-full ${
                    props.professionalPathway === 'MCHN' && 'justify-between'
                }`}
            >
                <NavigationButtons
                    setPath={setPath}
                    path="informationPage"
                />
                <div className="w-screen bg-primaryBlueDark">
                    <div className="relative top-20 max-md:left-10 left-12 mymd:ml-10 lg:ml-20 w-10/12 md:w-8/12">
                        <h2 className="text-3xl md:text-5xl font-omnes">
                            {messages.formatMessage({ id: 'selectYourState' })}
                        </h2>
                        <h3 className="font-forma text-base  max-md:text-sm max-md:w-10/12 md:text-xl w-1/2">
                            {messages.formatMessage({ id: 'infoOnYourLocal' })}
                            {`${
                                professionalPathway === 'MCHN'
                                    ? messages.formatMessage({
                                          id: 'MCHNProfession',
                                      })
                                    : messages.formatMessage({
                                          id: 'AHPProfession',
                                      })
                            }`}
                            {messages.formatMessage({ id: 'clickYourState' })}
                        </h3>
                    </div>
                    <div className="pt-24 mb-10 px-10 mx-auto max-w-3xl block">
                        <AustraliaMap
                            stateOnClickMode={stateOnClickMode}
                            setSelectedState={setSelectedState}
                        />
                    </div>
                </div>
                {professionalPathway === 'MCHN' && (
                    <Footer
                        pageAnalitycsId="fhp-local-maternal-child-and-family-health-nurse-page"
                        feedbackOnly={true}
                        noNoodle={true}
                    />
                )}
            </div>
        </>
    );
}

export default Australia;
