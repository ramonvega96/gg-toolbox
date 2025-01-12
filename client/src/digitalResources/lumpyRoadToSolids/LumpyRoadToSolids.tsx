import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import { useIntl } from 'react-intl';
import TitleAndRouteButton from '../../components/TitleAndRouteButton';
import LumpyRoadBrowser from './LumpyRoadBrowser';
import LumpyRoadMobile from './LumpyRoadMobile';
import MultiPurposeModal from '../../components/FHP/modals/MultiPurposeModal';
import { useEffect, useState } from 'react';
import Stage0Modal from './stageModalsContent/Stage0Modal';
import Stage1Modal from './stageModalsContent/Stage1Modal';
import Stage2Modal from './stageModalsContent/Stage2Modal';
import Stage3Modal from './stageModalsContent/Stage3Modal';
import Stage4Modal from './stageModalsContent/Stage4Modal';
import Stage5Modal from './stageModalsContent/Stage5Modal';
import Stage7Modal from './stageModalsContent/Stage7Modal';
import Stage6Modal from './stageModalsContent/Stage6Modal';

function LumpyRoadToSolids() {
    const messages = useIntl();
    const [modalContent, setModalContent] = useState<React.ReactNode>();
    const [maxModalWidth, setMaxModalWidth] = useState<string>('');
    const [modal, setModal] = useState(false);

    const buildModal = (stage: number, mobile: boolean) => {
        switch (stage) {
            case 0:
                setMaxModalWidth('max-w-[700px]');
                setModalContent(<Stage0Modal />);
                break;
            case 1:
                setMaxModalWidth('max-w-[700px]');
                setModalContent(<Stage1Modal />);
                break;
            case 2:
                mobile
                    ? setMaxModalWidth('max-w-[700px]')
                    : setMaxModalWidth('max-w-[1000px]');
                setModalContent(<Stage2Modal />);
                break;
            case 3:
                mobile
                    ? setMaxModalWidth('max-w-[700px]')
                    : setMaxModalWidth('max-w-[1000px]');
                setModalContent(<Stage3Modal />);
                break;
            case 4:
                mobile
                    ? setMaxModalWidth('max-w-[700px]')
                    : setMaxModalWidth('max-w-[1000px]');
                setModalContent(<Stage4Modal />);
                break;
            case 5:
                mobile
                    ? setMaxModalWidth('max-w-[700px]')
                    : setMaxModalWidth('max-w-[1000px]');
                setModalContent(<Stage5Modal />);
                break;
            case 6:
                mobile
                    ? setMaxModalWidth('max-w-[700px]')
                    : setMaxModalWidth('max-w-[900px]');
                setModalContent(<Stage6Modal />);
                break;
            case 7:
                mobile
                    ? setMaxModalWidth('max-w-[700px]')
                    : setMaxModalWidth('max-w-[1000px]');
                setModalContent(<Stage7Modal />);
                break;
            default:
                setModalContent(<div>Mobile Modal {stage}</div>);
        }
    };

    const buildBrowserModal = (stage: number) => {
        buildModal(stage, false);
    };

    const buildMobileModal = (stage: number) => {
        buildModal(stage, true);
    };

    useEffect(() => {
        if (!modalContent) {
            setModal(true);
        }
    }, [modalContent]);

    useEffect(() => {
        if (!modal) {
            setModalContent(undefined);
        }
    }, [modal]);

    return (
        <div>
            <Header toggleBanner={true} />
            <TitleAndRouteButton
                title={messages.formatMessage({
                    id: 'lumpyRoadToSolids',
                })}
                buttonTitle="Download the PDF"
                text={messages.formatMessage({
                    id: 'lumpyRoadToSolidsText',
                })}
                externalLink="https://indd.adobe.com/view/42697734-81d3-431a-87c1-999058c94ed6"
                paddingY="xs:py-8 xl:py-16"
                secondaryButtonText="Download the Cheatsheet"
                secondaryButtonLink="https://indd.adobe.com/view/a7f9bfac-d0fd-466c-b450-9858d7c7ea77"
            />
            <LumpyRoadBrowser displayModal={buildBrowserModal} />
            <LumpyRoadMobile displayModal={buildMobileModal} />
            <Footer pageAnalitycsId="lumpy-road-to-solids-g&g-page" />
            <div
                id="resources-update-modal"
                className="relative z-[50]"
            >
                {modalContent && modal && (
                    <MultiPurposeModal
                        toggleModal={setModal}
                        modalContent={modalContent}
                        maxModalWidth={maxModalWidth}
                    />
                )}
            </div>
        </div>
    );
}

export default LumpyRoadToSolids;
