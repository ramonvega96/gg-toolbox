import { useIntl } from 'react-intl';
import TextArrowButton from '../../sharedComponents/TextArrowButton';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage8-food1.jpg';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage7-img1-tb.jpg';

function Stage8Modal() {
    const messages = useIntl();

    const modalBody: IAccordion[] = [
        {
            title: 'stage8-acc1Title',
            textAndButtons: [
                {
                    text: 'stage8-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage8-acc1Bg1Btn1',
                            bottomText: 'stage8-acc1Bg1Btn1Sub',
                            link: 'http://seasonalfoodguide.com/australia-general-seasonal-fresh-produce-guide-fruits-vegetables-in-season-availability.html',
                            icon: 'webpage',
                        },
                    ],
                    sidePicture: {
                        img: img01,
                        imgAlt: 'Fruits variety',
                        position: 'object-left',
                    },
                },
                {
                    text: 'stage8-acc1Txt2',
                    buttons: [
                        {
                            topText: 'stage8-acc1Bg2Btn1',
                            bottomText: 'stage8-acc1Bg2Btn1Sub',
                            link: 'https://indd.adobe.com/view/1769ecf8-bcf6-4a04-ad34-d5ebae40e3aa',
                            icon: 'pdf',
                        },
                    ],
                    sidePicture: {
                        img: img02,
                        imgAlt: 'Baby smelling food',
                        position: 'object-right',
                    },
                },
            ],
        },
        {
            title: 'stage8-acc2Title',
            textAndButtons: [
                {
                    text: 'stage8-acc2Txt1',
                    buttons: [
                        {
                            topText: 'stage8-acc2Bg1Btn1',
                            bottomText: 'stage8-acc2Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/6b46ba5e-a889-45b3-a083-5ae38cdf83c4',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage8-acc3Title',
            textAndButtons: [
                {
                    text: 'stage8-acc3Txt1',
                    buttons: [
                        {
                            topText: 'stage8-acc3Bg1Btn1',
                            bottomText: 'stage8-acc3Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/c998cdda-e20a-45c2-8eb7-3679adc2e437',
                            icon: 'pdf',
                        },
                    ],
                },
                {
                    text: 'stage8-acc3Txt2',
                    buttons: [
                        {
                            topText: 'stage8-acc3Bg2Btn1',
                            bottomText: 'stage8-acc3Bg2Btn1Sub',
                            link: 'https://indd.adobe.com/view/99d7b94b-c398-4f52-b8c4-af07565d2c56',
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
                    id: 'stage8-bbTitle1',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage8-bbText1',
                })
            )}
            <div className="xs:w-full my-4">
                <TextArrowButton
                    topText="Vegetable rainbow treasure hunt "
                    bottomText="Tiny Bites"
                    link="https://indd.adobe.com/view/3838a9c8-e814-42ef-a04e-18475ffbb8bb"
                    coloursStyling="bg-tbPink hover:bg-tbPinkDark"
                />
            </div>
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage8-tb"
            subHeading="stage8-subHeading"
            description="stage8-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage8Modal;
