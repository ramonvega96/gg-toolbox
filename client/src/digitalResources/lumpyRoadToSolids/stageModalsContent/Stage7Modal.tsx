import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import TextArrowButton from '../../sharedComponents/TextArrowButton';
import { formatUL } from './Stage4Modal';

function Stage7Modal() {
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
            <div className="flex-col items-center mt-8 xl:px-24 overflow-hidden">
                <div className="flex">
                    <div className="xl:w-3/5">
                        <p
                            className="text-sm"
                            data-cy="modal-text1"
                        >
                            {messages.formatMessage({ id: 'stage7ModalText1' })}
                        </p>
                        <div data-cy="modal-ul1">
                            {formatUL(
                                messages
                                    .formatMessage({ id: 'stage7ModalText2' })
                                    .split('-'),
                                'text-sm'
                            )}
                        </div>
                        <div data-cy="modal-ul2">
                            {formatUL(
                                messages
                                    .formatMessage({ id: 'stage7ModalText3' })
                                    .split('-'),
                                'text-sm'
                            )}
                        </div>
                        <p
                            className="font-forma mb-0"
                            data-cy="further-info"
                        >
                            {messages.formatMessage({ id: 'furtherInfo' })}
                        </p>
                        <TextArrowButton
                            topText="Fussy eating resources"
                            bottomText="Grow & Go Toolbox"
                            link="https://indd.adobe.com/view/7fe8df77-f678-4a65-aecf-cee3cc4c9230"
                        />
                    </div>
                    <div className="xl:w-2/5 flex flex-col">
                        <div className="relative float-right left-[30px] top-[250px]">
                            <div
                                data-cy="modal-baby-img"
                                className='absolute w-[500px] h-[500px] rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage7-baby.png")] bg-contain bg-cover bg-no-repeat bg-right'
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
                    {messages.formatMessage({ id: 'stage7ModalText1' })}
                </p>
                <div data-cy="modal-ul1">
                    {formatUL(
                        messages
                            .formatMessage({ id: 'stage7ModalText2' })
                            .split('-'),
                        'text-sm'
                    )}
                </div>
                <div data-cy="modal-ul2">
                    {formatUL(
                        messages
                            .formatMessage({ id: 'stage7ModalText3' })
                            .split('-'),
                        'text-sm'
                    )}
                </div>
                <p
                    className="font-forma mb-0"
                    data-cy="further-info"
                >
                    {messages.formatMessage({ id: 'furtherInfo' })}
                </p>
                <TextArrowButton
                    topText="Fussy eating resources"
                    bottomText="Grow & Go Toolbox"
                    link="https://indd.adobe.com/view/7fe8df77-f678-4a65-aecf-cee3cc4c9230"
                />
                <div className="h-64">
                    <div className="relative float-right right-[250px] top-[20px]">
                        <div
                            data-cy="modal-baby-img"
                            className='absolute w-80 h-80 rounded-full bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage7-baby.png")] bg-contain bg-cover bg-no-repeat bg-center'
                        />
                    </div>
                </div>
            </div>
        );
    };

    const getModalContent = () => (
        <div data-cy="modal-stg7">
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

export default Stage7Modal;
