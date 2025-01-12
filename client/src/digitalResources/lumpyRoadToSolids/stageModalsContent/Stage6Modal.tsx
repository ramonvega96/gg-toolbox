import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import TextArrowButton from '../../sharedComponents/TextArrowButton';

function Stage6Modal() {
    const messages = useIntl();
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1280);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getBrowserContent = () => {
        return (
            <div className="flex-col items-center mt-8 xl:px-24 overflow-hidden h-[700px]">
                <div className="flex">
                    <div className="xl:w-3/5">
                        <p
                            className="text-sm"
                            data-cy="modal-text1"
                        >
                            {messages.formatMessage({ id: 'stage6ModalText1' })}
                        </p>
                        <p
                            className="text-sm"
                            data-cy="modal-text2"
                        >
                            {messages.formatMessage({ id: 'stage6ModalText2' })}
                        </p>
                        <p
                            className="text-sm"
                            data-cy="modal-text3"
                        >
                            {messages.formatMessage({ id: 'stage6ModalText3' })}
                        </p>
                        <TextArrowButton
                            topText="Sensory Exploration resources"
                            bottomText="Grow & Go Toolbox"
                            link="https://growandgotoolbox.com/?pathway=grow-go-toolbox"
                        />
                    </div>
                    <div className="xl:w-2/5 xs:hidden xl:flex flex-col">
                        <div className="relative float-right right-[10px] top-[300px]">
                            <div
                                data-cy="modal-baby1-img"
                                className='absolute w-[500px] h-[500px] rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-baby0.png")] bg-contain bg-cover bg-no-repeat bg-right'
                            />
                        </div>
                        <div className="relative float-left right-[170px] top-[380px]">
                            <div
                                data-cy="modal-baby2-img"
                                className='absolute w-32 h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-baby1.png")] bg-contain bg-cover bg-no-repeat bg-right'
                            />
                        </div>
                        <div className="relative float-left right-[330px] top-[410px]">
                            <div
                                data-cy="modal-baby3-img"
                                className='absolute w-32 h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-baby2.png")] bg-contain bg-cover bg-no-repeat bg-right'
                            />
                        </div>
                        <div className="relative float-left right-[290px] top-[520px]">
                            <div
                                data-cy="modal-baby4-img"
                                className='absolute w-72 h-72 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-baby3.png")] bg-contain bg-cover bg-no-repeat bg-right'
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getMobileContent = () => {
        return (
            <div className="mt-8 xs:px-6 md:px-16 overflow-hidden">
                <p
                    className="text-sm"
                    data-cy="modal-text1"
                >
                    {messages.formatMessage({ id: 'stage6ModalText1' })}
                </p>
                <p
                    className="text-sm"
                    data-cy="modal-text2"
                >
                    {messages.formatMessage({ id: 'stage6ModalText2' })}
                </p>
                <p
                    className="text-sm"
                    data-cy="modal-text3"
                >
                    {messages.formatMessage({ id: 'stage6ModalText3' })}
                </p>
                <TextArrowButton
                    topText="Sensory Exploration resources"
                    bottomText="Grow & Go Toolbox"
                    link="https://growandgotoolbox.com/?pathway=grow-go-toolbox"
                />
                <div className="flex gap-x-4 items-center justify-center mt-4">
                    <div
                        data-cy="modal-baby1-img"
                        className='w-32 h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-baby2.png")] bg-contain bg-cover bg-no-repeat bg-center'
                    />
                    <div
                        data-cy="modal-baby2-img"
                        className='w-32 h-32 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-baby1.png")] bg-contain bg-cover bg-no-repeat bg-center'
                    />
                </div>
                <div className="h-64">
                    <div className="relative float-right right-[250px] top-[20px]">
                        <div
                            data-cy="modal-baby3-img"
                            className='absolute w-80 h-80 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-baby0.png")] bg-contain bg-cover bg-no-repeat bg-right'
                        />
                    </div>
                </div>
            </div>
        );
    };

    const getModalContent = () => (
        <div data-cy="modal-stg6">
            <div className="xl:hidden">
                {isMobileView && getMobileContent()}
            </div>
            <div className="xs:hidden xl:block">
                {!isMobileView && getBrowserContent()}
            </div>
        </div>
    );

    return getModalContent();
}

export default Stage6Modal;
