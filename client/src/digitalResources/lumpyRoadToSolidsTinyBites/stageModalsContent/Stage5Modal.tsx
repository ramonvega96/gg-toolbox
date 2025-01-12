import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

function Stage5Modal() {
    const messages = useIntl();

    const modalBody: IAccordion[] = [
        {
            title: 'stage5-acc1Title',
            textAndButtons: [
                {
                    text: 'stage5-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage5-acc1Bg1Btn1',
                            bottomText: 'stage5-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/48184e75-93f6-45df-be42-6bee977fcf15',
                            icon: 'pdf',
                        },
                    ],
                },
                {
                    text: 'stage5-acc1Txt2',
                    buttons: [
                        {
                            topText: 'stage5-acc1Bg2Btn1',
                            bottomText: 'stage5-acc1Bg2Btn1Sub',
                            link: 'https://indd.adobe.com/view/f5a87e0e-95f3-4060-b6a5-61a74580c814',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage5-acc2Title',
            textAndButtons: [
                {
                    text: 'stage5-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage5-acc2Bg1Btn1',
                            bottomText: 'stage5-acc2Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/d09d15ed-6730-438e-8e20-2fecaea30b2d',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
    ];

    const bottomBanner = (
        <div>
            <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                {messages.formatMessage({
                    id: 'stage5-bbTitle',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage5-bbText',
                })
            )}
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage5-tb"
            subHeading="stage5-subHeading"
            description="stage5-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage5Modal;
