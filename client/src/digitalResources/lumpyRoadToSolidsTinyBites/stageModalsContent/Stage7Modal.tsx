import { useIntl } from 'react-intl';
import TextArrowButton from '../../sharedComponents/TextArrowButton';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage7-baby1.jpg';

function Stage7Modal() {
    const messages = useIntl();

    const modalBody: IAccordion[] = [
        {
            title: 'stage7-acc1Title',
            textAndButtons: [
                {
                    text: 'stage7-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage7-acc1Bg1Btn1',
                            bottomText: 'stage7-acc1Bg1Btn1Sub',
                            link: 'https://www.youtube.com/watch?v=YiDTTnXSWnE&t=80s',
                            icon: 'video',
                        },
                    ],
                },
                {
                    text: 'stage7-acc1Txt2',
                    buttons: [
                        {
                            topText: 'stage7-acc1Bg2Btn1',
                            bottomText: 'stage7-acc1Bg2Btn1Sub',
                            link: 'https://indd.adobe.com/view/44cef73e-8875-405d-8244-ce6aa9ab0e12',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage7-acc2Title',
            textAndButtons: [
                {
                    text: 'stage7-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage7-acc2Bg1Btn1',
                            bottomText: 'stage7-acc2Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/855f331b-1f02-47e7-935e-bea8221da0e2',
                            icon: 'pdf',
                        },
                    ],
                    sidePicture: {
                        img: img01,
                        imgAlt: 'Baby rejecting food',
                        position: 'object-right',
                    },
                },
            ],
        },
    ];

    const bottomBanner = (
        <div>
            <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                {messages.formatMessage({
                    id: 'stage7-bbTitle1',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage7-bbText1',
                })
            )}
            <div className="xs:w-full my-4">
                <TextArrowButton
                    topText="Find a health professional"
                    bottomText="Grow & Go Toolbox"
                    link="https://growandgotoolbox.com/find-a-health-professional"
                    coloursStyling="bg-tbPink hover:bg-tbPinkDark"
                />
            </div>
            {formatText(
                messages.formatMessage({
                    id: 'stage7-bbText2',
                })
            )}
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage7-tb"
            subHeading="stage7-subHeading"
            description="stage7-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage7Modal;
