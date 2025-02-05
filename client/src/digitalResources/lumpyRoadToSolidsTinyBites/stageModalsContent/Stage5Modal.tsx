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
                            link: 'https://indd.adobe.com/view/6e3bd5ac-833d-4b7b-a9fa-9f087cf9b43f',
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
                            link: 'https://indd.adobe.com/view/f0b1c1fc-cbf7-47de-8e2c-9e250ccce2ef',
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
                            link: 'https://indd.adobe.com/view/bdac38e9-9ec9-466d-a894-2f7c47a34f05',
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
