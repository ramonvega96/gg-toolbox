import { useIntl } from 'react-intl';
import ModalLayout, {
    formatText,
    IAccordion,
} from '../sharedComponents/ModalLayout';

import img01 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book1.jpg';
import img02 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book2.jpg';
import img03 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book3.jpg';
import img04 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book4.jpg';
import img05 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book5.jpg';
import img06 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book6.jpg';
import img07 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book7.jpg';
import img08 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book8.jpg';
import img09 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book9.jpg';
import img10 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book10.jpg';
import img11 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book11.jpg';
import img12 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book12.jpg';
import img13 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book13.jpg';
import img14 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book14.jpg';
import img15 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book15.jpg';
import img16 from '../../../assets/images/digitalResources/lumpyRoadToSolids/stage12-book16.jpg';

function Stage12Modal() {
    const messages = useIntl();

    const books = [
        {
            name: 'The Very Hungry Caterpillar',
            img: img01,
            author: 'Eric Carle',
        },
        {
            name: 'The Lighthouse Keeper’s Lunch',
            img: img02,
            author: 'Ronda and David Armitage',
        },
        {
            name: 'I will not ever never eat a tomato',
            img: img03,
            author: 'Lauren Child',
        },
        {
            name: 'Giant hiccups',
            img: img04,
            author: 'Jacqui Farley & Pamela Venus',
        },
        {
            name: 'Oliver’s fruit salad',
            img: img05,
            author: 'Vivian French & Alison Bartlett',
        },
        {
            name: 'Pumpkin soup',
            img: img06,
            author: 'Helen Cooper',
        },
        {
            name: 'The tiger who came to tea',
            img: img07,
            author: 'Judith Kerr',
        },
        {
            name: 'Which food will you choose?',
            img: img08,
            author: 'Claire Potter & Ailie Busby',
        },
        {
            name: 'The giant jam sandwich',
            img: img09,
            author: 'Janet Burroway & John Vernon Lord',
        },
        {
            name: 'Off to the market',
            img: img10,
            author: 'Alice Oehr',
        },
        {
            name: 'Nabil steals a penguin',
            img: img11,
            author: 'Nishani Reed & Junissa Bianda',
        },
        {
            name: 'Where does my food come from?',
            img: img12,
            author: 'Annabel Karmel & Alex Willmore',
        },
        {
            name: 'Nope, never, not for me!',
            img: img13,
            author: 'Samantha Cotterill',
        },
        {
            name: 'Hungry babies',
            img: img14,
            author: 'Fearne Cotton & Sheena Dempsey',
        },
        {
            name: 'Fussy Freda',
            img: img15,
            author: 'Julia Jarman & Fred Blunt',
        },
        {
            name: 'Time to eat',
            img: img16,
            author: 'Penny Tassoni & Mel Four',
        },
    ];

    const customComponent = (
        <div className="flex flex-wrap justify-center gap-4 -mt-8">
            {books.map((book, index) => (
                <div
                    key={index}
                    className="flex flex-col"
                >
                    <div className="flex h-44 items-end mb-2">
                        <img
                            className="w-36"
                            src={book.img}
                            alt={`${book.name} + ' cover'`}
                        />
                    </div>
                    <div className="flex h-[40px] items-start mb-2">
                        <div className="flex flex-col items-center">
                            <p className="m-0 w-36 font-roboto text-[12px] text-tbSecondaryBlue text-center">
                                {book.name}
                            </p>
                            <p className="m-0 w-36 font-roboto text-[10px] text-tbSecondaryBlue text-center">
                                {book.author}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const modalBody: IAccordion[] = [
        {
            title: 'stage12-acc1Title',
            textAndButtons: [
                {
                    text: 'stage12-acc1Txt1',
                    buttons: [
                        {
                            topText: 'stage12-acc1Bg1Btn1',
                            bottomText: 'stage12-acc1Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/2c03bdb5-5b39-4d11-879c-604eef831f8e',
                            icon: 'pdf',
                        },
                    ],
                },
            ],
        },
        {
            title: 'stage12-acc2Title',
            textAndButtons: [
                {
                    text: 'stage12-acc2Txt1',
                    buttons: [],
                },
            ],
            customComponent: customComponent,
        },
        {
            title: 'stage12-acc3Title',
            textAndButtons: [
                {
                    text: 'stage12-acc3Txt1',
                    buttons: [
                        {
                            topText: 'stage12-acc3Bg1Btn1',
                            bottomText: 'stage12-acc3Bg1Btn1Sub',
                            link: 'https://indd.adobe.com/view/716de30f-157a-4228-baf9-d3e3dcb623f6',
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
                    id: 'stage12-bbTitle1',
                })}
            </h1>
            {formatText(
                messages.formatMessage({
                    id: 'stage12-bbText1',
                })
            )}
        </div>
    );

    const getModalContent = () => (
        <ModalLayout
            heading="stage12-tb"
            subHeading="stage12-subHeading"
            description="stage12-description"
            bottomBanner={bottomBanner}
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage12Modal;
