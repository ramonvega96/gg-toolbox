import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage1-side1.png';

function Stage1Modal() {
    const messages = useIntl();

    const modalBody: IAccordion[] = [
        {
            title: 'stage1-acc1Title',
            textAndButtons: [
                {
                    text: 'stage1-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage1-acc1Bg1Btn1',
                            bottomText: 'stage1-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/873023ea-68f9-42d0-8a54-611cad9407de',
                            icon: 'pdf',
                        },
                    ],
                },
                {
                    text: 'stage1-acc1Txt2',
                    buttons: [
                        {
                            topText: 'stage1-acc1Bg2Btn1',
                            bottomText: 'stage1-acc1Bg2Btn1Sub',
                            link: 'https://growandgotoolbox.com/digital-resources/choosing-baby-foods',
                            icon: 'webpage',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage1-acc2Title',
            textAndButtons: [
                {
                    text: 'stage1-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage1-acc2Bg1Btn1',
                            bottomText: 'stage1-acc2Bg1Btn1Sub',
                            link: 'https://www.babycenter.com.au/v25018737/baby-led-weaning-is-gagging-normal-video',
                            icon: 'video',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage1-acc3Title',
            textAndButtons: [
                {
                    text: 'stage1-acc3Txt1',
                    buttons: [],
                    sidePicture: {
                        img: img01,
                        imgAlt: 'Unhealthy food',
                        position: 'object-left',
                    },
                },
            ],
        },
        {
            title: 'stage1-acc4Title',
            textAndButtons: [
                {
                    text: 'stage1-acc4Txt1',
                    buttons: [],
                },
            ],
        },
    ];

    const bottomBanner = (
        <div>
            <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                {messages.formatMessage({
                    id: 'stage1-bbTitle',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage1-bbText',
                })
            )}
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage1-tb"
            subHeading="stage1-subHeading"
            description="stage1-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage1Modal;
