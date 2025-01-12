import ModalLayout, { IAccordion } from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage9-baby1.jpg';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage9-food1.jpg';

function Stage9Modal() {
    const modalBody: IAccordion[] = [
        {
            title: 'stage9-acc1Title',
            textAndButtons: [
                {
                    text: 'stage9-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage9-acc1Bg1Btn1',
                            bottomText: 'stage9-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/f4a96230-7288-45da-8444-e8867fd82d15',
                            icon: 'pdf',
                        },
                    ],
                    sidePicture: {
                        img: img01,
                        imgAlt: 'Fussy eating baby',
                        position: 'object-right',
                    },
                },
            ],
        },
        {
            title: 'stage9-acc2Title',
            textAndButtons: [
                {
                    text: 'stage9-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage9-acc2Bg1Btn1',
                            bottomText: 'stage9-acc2Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/d8374ab5-58b2-4e3d-8076-dd11d424d1b9',
                            icon: 'pdf',
                        },
                    ],
                    sidePicture: {
                        img: img02,
                        imgAlt: 'Unhealthy food',
                        position: 'object-right',
                    },
                },
            ],
        },
    ];

    const getModalContent = () => (
        <ModalLayout
            heading="stage9-tb"
            subHeading="stage9-subHeading"
            description="stage9-description"
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage9Modal;
