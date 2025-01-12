import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-acc0-food1-tb.png';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-acc0-food2-tb.png';
import img03 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-acc0-food3-tb.png';
import img04 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-acc0-food4-tb.png';
import img05 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-food2-tb.png';
import img06 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-food3-tb.png';
import img07 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-food4-tb.png';
import img08 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage4-food5-tb.png';
import TextArrowButton from '../../sharedComponents/TextArrowButton';

function Stage4Modal() {
    const messages = useIntl();

    const modalBody: IAccordion[] = [
        {
            title: 'stage4-acc1Title',
            textAndButtons: [
                {
                    text: 'stage4-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage4-acc1Bg1Btn1',
                            bottomText: 'stage4-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/14cea3d3-92e4-48bf-a797-16ffc3c5d50b',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
            foodPictures: [
                {
                    img: img01,
                    imgAlt: '½ cup cooked chickpeas',
                },
                {
                    img: img02,
                    imgAlt: '½ cup of cooked veggies',
                },
                {
                    img: img03,
                    imgAlt: '1 cup of salad',
                },
                {
                    img: img04,
                    imgAlt: '1 cup of raw veggies',
                },
            ],
        },
        {
            title: 'stage4-acc2Title',
            textAndButtons: [
                {
                    text: 'stage4-acc2Txt1',
                    buttons: [],
                },
            ],
            foodPictures: [
                {
                    img: img05,
                    imgAlt: 'Ice cream',
                },
                {
                    img: img06,
                    imgAlt: 'Cake',
                },
                {
                    img: img07,
                    imgAlt: 'Hot chips',
                },
                {
                    img: img08,
                    imgAlt: 'Packet chips',
                },
            ],
        },
    ];

    const bottomBanner = (
        <div>
            <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                {messages.formatMessage({
                    id: 'stage4-bbTitle',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage4-bbText',
                })
            )}
            <div className="xs:w-full">
                <TextArrowButton
                    topText="Common allergen foods: Soft chopped and mashed foods and finger foods"
                    bottomText="Nip allergies in the Bub"
                    link="https://preventallergies.org.au/wp-content/uploads/2024/04/Food_Ideas_For_Babies_10_to_12_Months.pdf"
                    coloursStyling="bg-tbPink hover:bg-tbPinkDark"
                />
            </div>
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage4-tb"
            subHeading="stage4-subHeading"
            description="stage4-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage4Modal;
