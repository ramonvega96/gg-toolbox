import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage6-food2-tb.png';
import img03 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage6-food3-tb.png';
import img04 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage6-food4-tb.png';
import img06 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage6-food6-tb.png';
import img07 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage6-food7-tb.png';
import img08 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage6-food8-tb.png';
import ImagesPyramid from '../sharedComponents/ImagesPyramid';

function Stage6Modal() {
    const messages = useIntl();

    const modalBody: IAccordion[] = [
        {
            title: 'stage6-acc1Title',
            textAndButtons: [
                {
                    text: 'stage6-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage6-acc1Bg1Btn1',
                            bottomText: 'stage6-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/a629528c-0a92-40ee-8bb5-60e7eab60bb4',
                            icon: 'pdf',
                        },
                    ],
                },
                {
                    text: 'stage6-acc1Txt2',
                    buttons: [
                        {
                            topText: 'stage6-acc1Bg2Btn1',
                            bottomText: 'stage6-acc1Bg2Btn1Sub',
                            link: 'https://indd.adobe.com/view/1ceef568-1174-41f2-9c0f-db933d3b0642',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage6-acc2Title',
            textAndButtons: [
                {
                    text: 'stage6-acc2Txt1',
                    buttons: [],
                },
            ],
        },
        {
            title: 'stage6-acc3Title',
            textAndButtons: [
                {
                    text: 'stage6-acc3Txt1',
                    buttons: [
                        {
                            topText: 'stage6-acc3Bg1Btn1',
                            bottomText: 'stage6-acc3Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/99d7b94b-c398-4f52-b8c4-af07565d2c56',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage6-acc4Title',
            textAndButtons: [
                {
                    text: 'stage6-acc4Txt1',
                    buttons: [
                        {
                            topText: 'stage6-acc4Bg1Btn1',
                            bottomText: 'stage6-acc4Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/348ef80e-fd7d-4581-9105-7a682b79d5c6',
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
                    id: 'stage6-bbTitle1',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage6-bbText1',
                })
            )}
            <h1 className="font-gelica font-bold xs:text-base xl:text-xl text-tbSecondaryBlue mb-4">
                {messages.formatMessage({
                    id: 'stage6-bbTitle2',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage6-bbText2',
                })
            )}
            <div className="flex xs:flex-col md:flex-row gap-x-8">
                <ImagesPyramid
                    {...{
                        imgSrc2: img02,
                        imgAlt2: '8 - 12 months old',
                        imgSrc3: img03,
                        imgAlt3: '1 - 3 years old',
                        imgSrc4: img04,
                        imgAlt4: 'Primary school children',
                    }}
                />
                <ImagesPyramid
                    {...{
                        imgSrc2: img06,
                        imgAlt2: '8 - 12 months old',
                        imgSrc3: img07,
                        imgAlt3: '1 - 3 years old',
                        imgSrc4: img08,
                        imgAlt4: 'Primary school children',
                    }}
                />
            </div>
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage6-tb"
            subHeading="stage6-subHeading"
            description="stage6-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage6Modal;
