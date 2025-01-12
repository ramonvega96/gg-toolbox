import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage13-food1.jpg';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food2.jpg';
import img03 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage13-food2.png';
import img04 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage2-food5.png';
import img05 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage13-food3.png';
import img06 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage13-food4.png';
import img07 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage13-food5.png';
import img08 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage10-food8.png';

function Stage13Modal() {
    const messages = useIntl();

    const modalBody: IAccordion[] = [
        {
            title: 'stage13-acc1Title',
            textAndButtons: [
                {
                    text: 'stage13-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage13-acc1Bg1Btn1',
                            bottomText: 'stage13-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/3d2d0879-672f-4d68-8558-43370bccf026',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage13-acc2Title',
            textAndButtons: [
                {
                    text: 'stage13-acc2Txt1',
                    buttons: [],
                },
            ],
            foodPictures: [
                {
                    img: img01,
                    imgAlt: 'Fresh veggies',
                },
                {
                    img: img02,
                    imgAlt: 'Veggie sticks and dip',
                },
                {
                    img: img03,
                    imgAlt: 'Edamame',
                },
                {
                    img: img04,
                    imgAlt: 'Baked beans and toast',
                },
                {
                    img: img05,
                    imgAlt: 'Rice paper rolls',
                },
                {
                    img: img06,
                    imgAlt: 'Green smoothie',
                },
                {
                    img: img07,
                    imgAlt: 'Corn fritters',
                },
                {
                    img: img08,
                    imgAlt: 'Zucchini muffin',
                },
            ],
        },
        {
            title: 'stage13-acc3Title',
            textAndButtons: [
                {
                    text: 'stage13-acc3Txt1',
                    buttons: [
                        {
                            topText: 'stage13-acc3Bg1Btn1',
                            bottomText: 'stage13-acc3Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/e2629a7b-b076-4de1-b723-2bc9afa797f2',
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
                    id: 'stage13-bbTitle1',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage13-bbText1',
                })
            )}
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage13-tb"
            subHeading="stage13-subHeading"
            description="stage13-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage13Modal;
