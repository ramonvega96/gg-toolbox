import { useIntl } from 'react-intl';
import { MobileRoadStageInterface } from './RoadStageMobile';

interface BrowserRoadStageInterface extends MobileRoadStageInterface {
    left: boolean;
}

function RoadStage(props: BrowserRoadStageInterface) {
    const {
        stage,
        stageNumber,
        developmentalStage,
        feedingNeeds,
        bgImgFirst,
        bgImgFirstPosition,
        displayModal,
        left,
        bgImgSecond,
        bgImgSecondPosition,
        additionalText,
    } = props;
    const messages = useIntl();

    const formatUL = (textBullets: string[], textClass: string) => {
        return (
            <div>
                <p className={`font-forma text-xl ${textClass}`}>
                    {textBullets[0]}
                </p>
                <ul className="list-disc">
                    {textBullets.map((bulletContent, index) => {
                        if (index !== 0)
                            return (
                                <li key={index}>
                                    <p
                                        className={`font-forma text-xl mb-0 ${textClass}`}
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
                            className={`font-forma text-xl ${textClass}`}
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
        else return <p className={`font-forma text-xl ${textClass}`}>{text}</p>;
    };

    const buildLeftStage = () => (
        <div
            className="flex items-center"
            data-cy="road-stage"
        >
            <div
                className="w-48 h-48 bg-primaryBlueDark rounded-full flex justify-center items-center text-center"
                data-cy="stage-name-bubble"
            >
                <span className="text-white font-omnes font-bold text-3xl px-2">
                    {stage}
                </span>
            </div>
            <div
                className="w-20 h-2 bg-primaryBlueDark"
                data-cy="stage-connector"
            />
            <div
                className="max-w-[600px] py-8 px-11 bg-white rounded-3xl border-8 border-primaryBlueDark items-center justify-center text-primaryBlueDark"
                data-cy="stage-overview"
            >
                <p className="font-forma font-bold italic text-xl">
                    {messages.formatMessage({ id: 'developmentalStage' })}
                </p>
                {formatStageText(developmentalStage, '')}
                <p className="font-forma font-bold italic text-xl">
                    {messages.formatMessage({ id: 'feedingNeeds' })}
                </p>
                <p className="font-forma font-bold text-xl">{feedingNeeds}</p>
                {additionalText && formatStageText(additionalText, 'italic')}
            </div>
            <div
                className="h-0 relative float-right right-[40px] bottom-[180px]"
                data-cy="stage-first-img"
            >
                <div
                    className={`absolute w-60 h-60 bg-white rounded-full shadow-2xl ${bgImgFirst} bg-contain bg-cover bg-no-repeat ${bgImgFirstPosition}`}
                />
            </div>
            {bgImgSecond && (
                <div
                    className="h-0 relative float-right left-[60px] bottom-[360px]"
                    data-cy="stage-second-img"
                >
                    <div
                        className={`absolute w-60 h-60 bg-white rounded-full shadow-2xl ${bgImgSecond} bg-contain bg-cover bg-no-repeat ${bgImgSecondPosition}`}
                    />
                </div>
            )}
            <div className="h-0 relative float-right right-[25px] top-[25px]">
                <div
                    onClick={() => displayModal(stageNumber)}
                    className="absolute w-32 h-32 bg-secondaryGreen hover:bg-tertiaryGreen rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                    data-cy="stage-fom-btn"
                >
                    <span className="font-forma font-bold text-white text-xl text-center">
                        {messages.formatMessage({
                            id: 'findOutMore',
                        })}
                    </span>
                </div>
            </div>
        </div>
    );

    const buildRightStage = () => (
        <div
            className="flex items-center"
            data-cy="road-stage"
        >
            {bgImgSecond && (
                <div
                    className="h-0 relative float-right right-[230px] bottom-[330px]"
                    data-cy="stage-second-img"
                >
                    <div
                        className={`absolute w-60 h-60 bg-white rounded-full shadow-2xl ${bgImgSecond} bg-contain bg-cover bg-no-repeat ${bgImgSecondPosition}`}
                    />
                </div>
            )}
            <div
                className="h-0 relative float-left right-[280px] bottom-[130px]"
                data-cy="stage-first-img"
            >
                <div
                    className={`absolute w-60 h-60 bg-white rounded-full shadow-2xl ${bgImgFirst} bg-contain bg-cover bg-no-repeat ${bgImgFirstPosition}`}
                />
            </div>
            <div className="h-0 relative float-left right-[90px] bottom-[160px]">
                <div
                    onClick={() => displayModal(stageNumber)}
                    className="absolute w-32 h-32 bg-secondaryGreen hover:bg-tertiaryGreen rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                    data-cy="stage-fom-btn"
                >
                    <span className="font-forma font-bold text-white text-xl text-center">
                        {messages.formatMessage({
                            id: 'findOutMore',
                        })}
                    </span>
                </div>
            </div>
            <div
                className="max-w-[600px] py-8 px-11 bg-white rounded-3xl border-8 border-primaryBlueDark items-center justify-center text-primaryBlueDark"
                data-cy="stage-overview"
            >
                <p className="font-forma font-bold italic text-xl">
                    {messages.formatMessage({ id: 'developmentalStage' })}
                </p>
                {formatStageText(developmentalStage, '')}
                <p className="font-forma font-bold italic text-xl">
                    {messages.formatMessage({ id: 'feedingNeeds' })}
                </p>
                <p className="font-forma font-bold text-xl">{feedingNeeds}</p>
                {additionalText && formatStageText(additionalText, 'italic')}
            </div>
            <div
                className="w-32 h-2 bg-primaryBlueDark"
                data-cy="stage-connector"
            />
            <div
                className="w-48 h-48 bg-primaryBlueDark rounded-full flex justify-center items-center text-center"
                data-cy="stage-name-bubble"
            >
                <span className="text-white font-omnes font-bold text-3xl px-2">
                    {stage}
                </span>
            </div>
        </div>
    );

    return left ? buildLeftStage() : buildRightStage();
}

export default RoadStage;
