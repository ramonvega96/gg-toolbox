import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food1.jpg';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food2.jpg';
import img03 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food3.jpg';
import img04 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food4.jpg';
import img05 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food5.jpg';
import img06 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food6.jpg';
import img07 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-food1-tb.png';
import img08 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food8.jpg';
import img09 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food11.png';
import img10 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food7.jpg';
import img11 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage3-food1.png';
import img12 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage11-food10.png';
import img13 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage5-baby.png';
import ImagesPyramid from '../sharedComponents/ImagesPyramid';

function Stage11Modal() {
    const messages = useIntl();

    const modalBody: IAccordion[] = [
        {
            title: 'stage11-acc1Title',
            textAndButtons: [
                {
                    text: 'stage11-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage11-acc1Bg1Btn1',
                            bottomText: 'stage11-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/2e6b5abd-5182-4e65-8d8a-9135f6f9ea47',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
            foodPictures: [
                {
                    img: img07,
                    imgAlt: 'Vegetables',
                },
                {
                    img: img08,
                    imgAlt: 'Grains and cereals',
                },
                {
                    img: img09,
                    imgAlt: 'Fruits',
                },
                {
                    img: img10,
                    imgAlt: 'Dairy',
                },
                {
                    img: img11,
                    imgAlt: 'Lean meats, poultry or protein alternatives',
                },
            ],
        },
        {
            title: 'stage11-acc2Title',
            textAndButtons: [
                {
                    text: 'stage11-acc2Txt1',
                    buttons: [],
                    sidePicture: {
                        img: img12,
                        imgAlt: 'Milk glass and box',
                        position: 'object-left',
                    },
                },
                {
                    text: 'stage11-acc2Txt2',
                    buttons: [],
                    sidePicture: {
                        img: img13,
                        imgAlt: 'Baby drinking water',
                        position: 'object-center',
                    },
                },
            ],
        },
    ];

    const bottomBanner = (
        <div>
            <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                {messages.formatMessage({
                    id: 'stage11-bbTitle1',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage11-bbText1',
                })
            )}
            <div className="flex xs:flex-col md:flex-row gap-x-8">
                <ImagesPyramid
                    {...{
                        imgSrc1: img01,
                        imgAlt1: 'Image with all plates',
                        imgSrc2: img02,
                        imgAlt2: '1 to 3 years old',
                        imgSrc3: img03,
                        imgAlt3: 'Primary school children',
                    }}
                />
                <ImagesPyramid
                    {...{
                        imgSrc1: img04,
                        imgAlt1: 'Image with all plates',
                        imgSrc2: img05,
                        imgAlt2: '1 to 3 years old',
                        imgSrc3: img06,
                        imgAlt3: 'Primary school children',
                    }}
                />
            </div>
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage11-tb"
            subHeading="stage11-subHeading"
            description="stage11-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage11Modal;
