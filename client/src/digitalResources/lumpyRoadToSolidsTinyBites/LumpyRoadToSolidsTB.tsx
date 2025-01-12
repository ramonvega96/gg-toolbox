import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import LumpyRoadBrowser from './LumpyRoadBrowser';
import LumpyRoadMobile from './LumpyRoadMobile';
import MultiPurposeModal from '../../components/FHP/modals/MultiPurposeModal';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Stage0Modal from './stageModalsContent/Stage0Modal';
import Stage1Modal from './stageModalsContent/Stage1Modal';
import Stage2Modal from './stageModalsContent/Stage2Modal';
import Stage3Modal from './stageModalsContent/Stage3Modal';
import Stage4Modal from './stageModalsContent/Stage4Modal';
import Stage5Modal from './stageModalsContent/Stage5Modal';
import Stage6Modal from './stageModalsContent/Stage6Modal';
import CustomWelcomeComponent from './CustomWelcomeComponent';
import SupportedBy from './SupportedBy';
import { useSearchParams, useLocation } from 'react-router-dom';
import Stage7Modal from './stageModalsContent/Stage7Modal';
import Stage8Modal from './stageModalsContent/Stage8Modal';
import Stage9Modal from './stageModalsContent/Stage9Modal';
import Stage10Modal from './stageModalsContent/Stage10Modal';
import Stage11Modal from './stageModalsContent/Stage11Modal';
import Stage12Modal from './stageModalsContent/Stage12Modal';
import Stage13Modal from './stageModalsContent/Stage13Modal';
import UsrEmailModal from './UsrEmailModal';
import usePageVisibility from './Analytics/UsePageVisibility';
import {
    LRSTBAnalitycsObj,
    createLRSTinyBitesRecord,
} from '../../utils/NetworkCalls';
import Stage14Modal from './stageModalsContent/Stage14Modal';

function LumpyRoadToSolidsTB() {
    const [modalContent, setModalContent] = useState<React.ReactNode>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [modal, setModal] = useState(searchParams.has('stg'));
    const [analitycsUser, setAnalitycsUser] = useState<string | null>(null);
    const [sessionUUID, setSessionUUID] = useState<string | null>(null);
    const location = useLocation();
    const isVisible = usePageVisibility();

    useEffect(() => {
        if (isVisible && analitycsUser && sessionUUID) {
            const handleNewRecord = async (analitycsObj: LRSTBAnalitycsObj) => {
                try {
                    await createLRSTinyBitesRecord(analitycsObj);
                } catch (error) {
                    console.error('Failed to create analytics record:', error);
                }
            };

            const startTime = performance.now();
            return () => {
                const date = new Date();
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                const analitycsObj: LRSTBAnalitycsObj = {
                    user: analitycsUser,
                    sessionId: sessionUUID,
                    location: location.pathname + location.search,
                    duration: parseFloat(
                        ((performance.now() - startTime) / 1000).toFixed(2)
                    ),
                    date: `${day}/${month}/${year}`,
                    time: `${hours}:${minutes}:${seconds}`,
                };

                handleNewRecord(analitycsObj);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, location.search, isVisible]);

    useEffect(() => {
        const initialUsr = localStorage.getItem('ANALITYCS_USR');
        if (initialUsr === 'anonymous' || initialUsr === null) {
            localStorage.removeItem('ANALITYCS_USR');
            setAnalitycsUser(null);
        } else {
            setAnalitycsUser(initialUsr);
            setSessionUUID(generateSessionUUID());
        }
    }, []);

    useEffect(() => {
        if (
            analitycsUser !== null &&
            localStorage.getItem('ANALITYCS_USR') === null
        ) {
            localStorage.setItem('ANALITYCS_USR', analitycsUser);
            setSessionUUID(generateSessionUUID());
        }
    }, [analitycsUser]);

    useEffect(() => {
        const stg = searchParams.has('stg') && searchParams.get('stg');
        if (stg) buildModal(Number(stg));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    useEffect(() => {
        if (modalContent) setModal(true);
    }, [modalContent]);

    useEffect(() => {
        if (!modal) {
            setModalContent(undefined);
            setSearchParams({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal]);

    const buildModal = (stage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('stg', String(stage));
        setSearchParams(newParams);

        switch (stage) {
            case 0:
                setModalContent(<Stage0Modal />);
                break;
            case 1:
                setModalContent(<Stage1Modal />);
                break;
            case 2:
                setModalContent(<Stage2Modal />);
                break;
            case 3:
                setModalContent(<Stage3Modal />);
                break;
            case 4:
                setModalContent(<Stage4Modal />);
                break;
            case 5:
                setModalContent(<Stage5Modal />);
                break;
            case 6:
                setModalContent(<Stage6Modal />);
                break;
            case 7:
                setModalContent(<Stage7Modal />);
                break;
            case 8:
                setModalContent(<Stage8Modal />);
                break;
            case 9:
                setModalContent(<Stage9Modal />);
                break;
            case 10:
                setModalContent(<Stage10Modal />);
                break;
            case 11:
                setModalContent(<Stage11Modal />);
                break;
            case 12:
                setModalContent(<Stage12Modal />);
                break;
            case 13:
                setModalContent(<Stage13Modal />);
                break;
            case 14:
                setModalContent(<Stage14Modal />);
                break;
            default:
                setModalContent(undefined);
        }
    };

    function generateSessionUUID() {
        const uuid = uuidv4();
        return uuid;
    }

    return (
        <div>
            <Header toggleBanner={true} />
            <CustomWelcomeComponent />
            <LumpyRoadBrowser displayModal={buildModal} />
            <LumpyRoadMobile displayModal={buildModal} />
            <SupportedBy />
            <Footer pageAnalitycsId="lumpy-road-to-solids-tiny-bites-page" />
            {analitycsUser === null ? (
                <div className="relative z-[50]">
                    <MultiPurposeModal
                        toggleModal={setModal}
                        modalContent={
                            <UsrEmailModal {...{ setAnalitycsUser }} />
                        }
                        maxModalWidth={'max-w-[800px] pb-0'}
                        isTinyBites={true}
                        noCloseBtn={true}
                    />
                </div>
            ) : (
                <div className="relative z-[50]">
                    {modalContent && modal && (
                        <MultiPurposeModal
                            toggleModal={setModal}
                            modalContent={modalContent}
                            maxModalWidth={'max-w-[800px] pb-0'}
                            isTinyBites={true}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default LumpyRoadToSolidsTB;
