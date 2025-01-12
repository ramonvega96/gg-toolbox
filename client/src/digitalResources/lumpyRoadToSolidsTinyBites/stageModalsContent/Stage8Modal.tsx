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
                            link: 'https://indd.adobe.com/view/e47e05d4-0f9f-496e-8a0b-0df3a4832c57',
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
                            link: 'https://indd.adobe.com/view/5cfab93e-7156-48d9-b7ac-df3abab86038',
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
                            link: 'https://indd.adobe.com/view/b9ac4a6e-ba1d-4c5c-8a65-b664ee23c09a',
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
                            link: 'https://indd.adobe.com/view/59017da9-c1e2-423f-bd2d-5ba3885d00f5',
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
                    link="https://indd.adobe.com/view/bfdaf72f-429e-4979-b6d6-877c18de2536"
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
