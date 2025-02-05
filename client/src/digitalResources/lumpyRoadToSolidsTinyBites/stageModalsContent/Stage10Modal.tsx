import ModalLayout, { IAccordion } from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food1.png';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food2.jpg';
import img03 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food3.png';
import img04 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food4.jpeg';
import img05 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food5.png';
import img06 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food6.png';
import img07 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food7.png';
import img08 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food8.png';
import img09 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food9.jpg';
import img10 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food10.png';

function Stage10Modal() {
    const modalBody: IAccordion[] = [
        {
            title: 'stage10-acc1Title',
            textAndButtons: [
                {
                    text: 'stage10-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage10-acc1Bg1Btn1',
                            bottomText: 'stage10-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/86f6e88e-66c7-4318-bb15-fa2e5c2edec2',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage10-acc2Title',
            textAndButtons: [
                {
                    text: 'stage10-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage10-acc2Bg1Btn1',
                            bottomText: 'stage10-acc2Bg1Btn1Sub',
                            link: 'https://preventallergies.org.au/wp-content/uploads/2024/04/Food_Ideas_For_Toddlers.pdf',
                            icon: 'pdf',
                        },
                        {
                            topText: 'stage10-acc2Bg1Btn2',
                            bottomText: 'stage10-acc2Bg1Btn2Sub',
                            link: 'https://preventallergies.org.au/wp-content/uploads/2023/08/TNAC0011_Recipe_Booklet.pdf',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage10-acc3Title',
            textAndButtons: [
                {
                    text: 'stage10-acc3Txt1',
                    buttons: [],
                },
            ],
            foodPictures: [
                {
                    img: img01,
                    imgAlt: 'Dried apricots',
                },
                {
                    img: img02,
                    imgAlt: 'Veggie sticks and dip',
                },
                {
                    img: img03,
                    imgAlt: 'Greek yoghurt',
                },
                {
                    img: img04,
                    imgAlt: '‘On-the-go’ pack',
                },
                {
                    img: img05,
                    imgAlt: 'Hard boiled eggs',
                },
                {
                    img: img06,
                    imgAlt: 'Popcorn (2+ years only)',
                },
                {
                    img: img07,
                    imgAlt: 'Sushi roll',
                },
                {
                    img: img08,
                    imgAlt: 'Homemade muffins',
                },
                {
                    img: img09,
                    imgAlt: 'Tuna Sandwich',
                },
                {
                    img: img10,
                    imgAlt: 'Seaweed snacks',
                },
            ],
        },
    ];

    const getModalContent = () => (
        <ModalLayout
            heading="stage10-tb"
            subHeading="stage10-subHeading"
            description="stage10-description"
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage10Modal;
