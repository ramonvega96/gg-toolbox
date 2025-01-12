import ModalLayout, { IAccordion } from '../sharedComponents/ModalLayout';

import TextArrowButton from '../../sharedComponents/TextArrowButton';

function Stage14Modal() {
    const additionalResourcesBtns = [
        {
            topText: 'Extra resource',
            bottomText: 'Parent wellbeing & self-care',
            link: 'https://panda.org.au/articles/wellbeing-and-self-care/',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Responding to tantrums',
            link: 'https://raisingchildren.net.au/toddlers/behaviour/crying-tantrums/tantrums',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Child & Family nursing services',
            link: 'https://goodforkids.nsw.gov.au/healthy-beginnings/hne-child-and-family-nursing-services/',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Find a play group',
            link: 'https://www.playgroupnsw.org.au/Explore/FindaPlaygroup',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Support services',
            link: 'https://goodforkids.nsw.gov.au/healthy-beginnings/support-services/',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Activities for you and your child',
            link: 'https://wordsforlife.org.uk/activities/filter/?age=1-2',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Parents: Looking after yourself',
            link: 'https://raisingchildren.net.au/grown-ups/looking-after-yourself/parenting/looking-after-yourself',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Work-life balance tips',
            link: 'https://raisingchildren.net.au/grown-ups/work-child-care/worklife-balance/work-life-balance',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Oral care advice for children 0-5',
            link: 'https://www.health.nsw.gov.au/oralhealth/prevention/Pages/resources-children-0-5.aspx',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Tips for looking after yourself',
            link: 'https://www.goodforkids.nsw.gov.au/media/2419/looking-after-yourself.pdf',
        },
        {
            topText: 'Extra resource',
            bottomText: 'Parent & Carer stress management',
            link: 'https://raisingchildren.net.au/grown-ups/looking-after-yourself/anger-anxiety-stress/stress-grown-ups',
        },
    ];

    const ifWebinarsBtns = [
        {
            topText: 'Infant Feeding',
            bottomText: 'Webinar 1',
            link: 'https://www.youtube.com/watch?v=U5copBztG74',
        },
        {
            topText: 'Infant Feeding',
            bottomText: 'Webinar 2',
            link: 'https://www.youtube.com/watch?v=LqgsH_Ix7SU',
        },
        {
            topText: 'Infant Feeding',
            bottomText: 'Webinar 3',
            link: 'https://www.youtube.com/watch?v=Eptvi5ny3DQ',
        },
    ];

    const rfWebinarsBtns = [
        {
            topText: 'Responsive Feeding',
            bottomText: 'Webinar 1',
            link: 'https://www.youtube.com/watch?v=-awKZ9djZDs',
        },
        {
            topText: 'Responsive Feeding',
            bottomText: 'Webinar 2',
            link: 'https://www.youtube.com/watch?v=yTVY5JPmmgM',
        },
        {
            topText: 'Responsive Feeding',
            bottomText: 'Webinar 3',
            link: 'https://www.youtube.com/watch?v=Zqt3OMySy0c',
        },
    ];

    const customComponentAcc1 = (
        <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 -mt-8">
            {additionalResourcesBtns.map((btn, index) => (
                <TextArrowButton
                    key={index}
                    topText={btn.topText}
                    bottomText={btn.bottomText}
                    link={btn.link}
                    coloursStyling="bg-tbTeal hover:bg-tbDarkTeal"
                    invertedFont={true}
                />
            ))}
        </div>
    );

    const customComponentAcc2 = (
        <div className="flex xs:flex-col md:flex-row gap-x-4 -mt-8">
            <div className="xs:w-full md:w-1/2 gap-y-2">
                {ifWebinarsBtns.map((btn, index) => (
                    <TextArrowButton
                        key={index}
                        topText={btn.topText}
                        bottomText={btn.bottomText}
                        link={btn.link}
                        coloursStyling="bg-tbTeal hover:bg-tbDarkTeal"
                        invertedFont={true}
                    />
                ))}
            </div>
            <div className="xs:w-full md:w-1/2 gap-y-2">
                {rfWebinarsBtns.map((btn, index) => (
                    <TextArrowButton
                        key={index}
                        topText={btn.topText}
                        bottomText={btn.bottomText}
                        link={btn.link}
                        coloursStyling="bg-tbPink hover:bg-tbPinkDark"
                        invertedFont={true}
                    />
                ))}
            </div>
        </div>
    );

    const modalBody: IAccordion[] = [
        {
            title: 'stage14-acc1Title',
            textAndButtons: [
                {
                    text: 'stage14-acc1Txt1',
                    buttons: [],
                },
            ],
            customComponent: customComponentAcc1,
        },
        {
            title: 'stage14-acc2Title',
            textAndButtons: [
                {
                    text: 'stage14-acc2Txt1',
                    buttons: [],
                },
            ],
            customComponent: customComponentAcc2,
        },
    ];

    const getModalContent = () => (
        <ModalLayout
            heading="stage14-tb"
            subHeading=""
            description="stage14-description"
            modalBody={modalBody}
        />
    );

    return getModalContent();
}

export default Stage14Modal;
