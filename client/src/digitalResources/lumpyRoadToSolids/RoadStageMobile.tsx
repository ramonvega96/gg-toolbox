import { useIntl } from 'react-intl';

export interface MobileRoadStageInterface {
    stage: string;
    stageNumber: number;
    developmentalStage: string;
    feedingNeeds: string;
    bgImgFirst: string;
    bgImgFirstPosition: string;
    displayModal: (stage: number) => void;
    bgImgSecond?: string;
    bgImgSecondPosition?: string;
    additionalText?: string;
}

function RoadStage(props: MobileRoadStageInterface) {
    const {
        stage,
        stageNumber,
        developmentalStage,
        feedingNeeds,
        bgImgFirst,
        bgImgFirstPosition,
        displayModal,
        bgImgSecond,
        bgImgSecondPosition,
        additionalText,
    } = props;
    const messages = useIntl();

    const formatUL = (textBullets: string[], textClass: string) => {
        return (
            <div>
                <p className={`font-forma md:text-md xs:text-sm ${textClass}`}>
                    {textBullets[0]}
                </p>
                <ul className="list-disc">
                    {textBullets.map((bulletContent, index) => {
                        if (index !== 0)
                            return (
                                <li key={index}>
                                    <p
                                        className={`font-forma md:text-md xs:text-sm mb-0 ${textClass}`}
                                    >
                                        {bulletContent}
                                    </p>
                                </li>
                            );
                        return null;
                    })}
                </ul>
            </div>
        );
    };

    const formatLinebreaks = (paragraphs: string[], textClass: string) => {
        return (
            <div>
                {paragraphs.map((content, index) => {
                    return (
                        <p
                            key={index}
                            className={`font-forma md:text-md xs:text-sm ${textClass}`}
                        >
                            {content}
                        </p>
                    );
                })}
            </div>
        );
    };

    const formatStageText = (text: string, textClass: string) => {
        if (text.includes('*')) return formatUL(text.split('*'), textClass);
        else if (text.includes('\n'))
            return formatLinebreaks(text.split('\n'), textClass);
        else
            return (
                <p className={`font-forma md:text-md xs:text-sm ${textClass}`}>
                    {text}
                </p>
            );
    };

    const buildLeftStage = () => (
        <div
            className="flex"
            data-cy="road-stage-mobile"
        >
            <div
                className="xs:w-[100px] xs:h-[100px] xs:min-w-[100px] xs:min-h-[100px]
            md:w-[140px] md:h-[140px] md:min-w-[140px] md:min-h-[140px]            
            bg-primaryBlueDark rounded-full flex justify-center items-center text-center mt-8"
                data-cy="stage-name-bubble"
            >
                <span className="text-white font-omnes font-bold xs:text-lg md:text-xl px-2">
                    {stage}
                </span>
            </div>
            {!bgImgSecond && (
                <div
                    className="h-0 relative float-right md:right-[100px] md:top-[150px] xs:right-[100px] xs:top-[120px]"
                    data-cy="stage-first-img"
                >
                    <div
                        className={`absolute xs:w-32 xs:h-32 md:w-36 md:h-36 bg-white rounded-full shadow-2xl ${bgImgFirst} bg-contain bg-cover bg-no-repeat ${bgImgFirstPosition}`}
                    />
                </div>
            )}
            {bgImgSecond && (
                <div
                    className="h-0 relative float-right md:right-[110px] md:top-[200px] xs:right-[105px] xs:top-[160px]"
                    data-cy="stage-first-img"
                >
                    <div
                        className={`absolute xs:w-32 xs:h-32 md:w-36 md:h-36 bg-white rounded-full shadow-2xl ${bgImgFirst} bg-contain bg-cover bg-no-repeat ${bgImgFirstPosition}`}
                    />
                </div>
            )}
            {bgImgSecond && (
                <div
                    className="h-0 relative float-right md:right-[150px] md:top-[310px] xs:right-[115px] xs:top-[260px]"
                    data-cy="stage-second-img"
                >
                    <div
                        className={`absolute xs:w-32 xs:h-32 md:w-36 md:h-36 bg-white rounded-full shadow-2xl ${bgImgSecond} bg-contain bg-cover bg-no-repeat ${bgImgSecondPosition}`}
                    />
                </div>
            )}
            <div
                className="w-10 h-2 bg-primaryBlueDark xs:mt-20 md:mt-24"
                data-cy="stage-connector"
            />
            <div
                className="max-w-[800px] py-8 md:px-8 xs:px-4 bg-white rounded-3xl border-8 border-primaryBlueDark items-center justify-center text-primaryBlueDark"
                data-cy="stage-overview"
            >
                <p className="font-forma font-bold italic md:text-md xs:text-sm">
                    {messages.formatMessage({ id: 'developmentalStage' })}
                </p>
                {formatStageText(developmentalStage, '')}
                <p className="font-forma font-bold italic md:text-md xs:text-sm">
                    {messages.formatMessage({ id: 'feedingNeeds' })}
                </p>
                <p className="font-forma font-bold md:text-md xs:text-sm">
                    {feedingNeeds}
                </p>
                {additionalText && formatStageText(additionalText, 'italic')}
                <div className="h-0 relative float-right right-[80px] -top-[10px]">
                    <div
                        onClick={() => displayModal(stageNumber)}
                        className="absolute w-24 h-24 bg-secondaryGreen hover:bg-tertiaryGreen rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                        data-cy="stage-fom-btn"
                    >
                        <span className="font-forma font-bold text-white text-md text-center">
                            {messages.formatMessage({
                                id: 'findOutMore',
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    return buildLeftStage();
}

export default RoadStage;
