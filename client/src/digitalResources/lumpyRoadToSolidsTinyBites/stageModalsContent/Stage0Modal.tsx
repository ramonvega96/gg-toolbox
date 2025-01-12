import ModalLayout, { IAccordion } from '../sharedComponents/ModalLayout';

function Stage0Modal() {
    const modalBody: IAccordion[] = [
        {
            title: 'stage0-acc1Title',
            textAndButtons: [
                {
                    text: 'stage0-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage0-acc1Bg1Btn1',
                            link: 'https://www.breastfeeding.asn.au/resources/returning-work-options',
                            icon: 'webpage',
                        },
                        {
                            topText: 'stage0-acc1Bg1Btn2',
                            link: 'https://www.breastfeeding.asn.au/resources/pumping-work',
                            icon: 'webpage',
                        },
                        {
                            topText: 'stage0-acc1Bg1Btn3',
                            link: 'https://www.breastfeeding.asn.au/resources/using-breast-pump',
                            icon: 'webpage',
                        },
                        {
                            topText: 'stage0-acc1Bg1Btn4',
                            link: 'https://www.breastfeeding.asn.au/resources/storing-ebm',
                            icon: 'webpage',
                        },
                        {
                            topText: 'stage0-acc1Bg1Btn5',
                            link: 'https://www.breastfeeding.asn.au/resources/cleaning-expressing-equipment',
                            icon: 'webpage',
                        },
                        {
                            topText: 'stage0-acc1Bg1Btn6',
                            link: 'https://www.breastfeeding.asn.au/resources/helping-baby-take-ebm',
                            icon: 'webpage',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage0-acc2Title',
            textAndButtons: [
                {
                    text: 'stage0-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage0-acc2Bg1Btn1',
                            bottomText: 'stage0-acc2Bg1Btn1Sub',
                            link: 'https://growandgotoolbox.com/digital-resources/reading-formula-labels',
                            icon: 'webpage',
                        },
                    ],
                },
            ],
        },
    ];

    const getModalContent = () => (
        <ModalLayout
            heading="stage0-tb"
            subHeading="stage0-subHeading"
            description="stage0-description"
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage0Modal;
