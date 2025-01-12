import { useIntl } from 'react-intl';

export interface MobileRoadStageInterface {
    stage: string;
    stageNumber: number;
    stageTitle?: string;
    stageTopics: string[];
    bgImgFirst: string;
    bgImgFirstPosition: string;
    displayModal: (stage: number) => void;
    stagePart?: string;
    bgImgSecond?: string;
    bgImgSecondPosition?: string;
}

function RoadStage(props: MobileRoadStageInterface) {
    const {
        stage,
        stageNumber,
        stageTitle,
        stageTopics,
        bgImgFirst,
        bgImgFirstPosition,
        displayModal,
        stagePart,
        bgImgSecond,
        bgImgSecondPosition,
    } = props;
    const messages = useIntl();

    const buildLeftStage = () => (
        <div
            className="flex"
            data-cy="road-stage-mobile"
        >
            <div
                className="xs:w-[120px] xs:h-[120px] xs:min-w-[120px] xs:min-h-[120px]
            md:w-[140px] md:h-[140px] md:min-w-[140px] md:min-h-[140px]            
            bg-tbPeach rounded-full flex justify-center items-center text-center mt-8"
                data-cy="stage-name-bubble"
            >
                <span className="text-white font-gelica font-bold xs:text-lg md:text-xl px-2">
                    {stage}
                    {stagePart && (
                        <p className="font-gelica font-bold xs:text-base md:text-lg">
                            {stagePart}
                        </p>
                    )}
                </span>
            </div>
            {!bgImgSecond && (
                <div
                    className="h-0 relative float-right md:right-[100px] md:top-[150px] xs:right-[100px] xs:top-[135px]"
                    data-cy="stage-first-img"
                >
                    <div
                        className={`absolute xs:w-32 xs:h-32 md:w-36 md:h-36 bg-white rounded-full shadow-2xl ${bgImgFirst} bg-contain bg-cover bg-no-repeat ${bgImgFirstPosition}`}
                    />
                </div>
            )}
            {bgImgSecond && (
                <div
                    className="h-0 relative float-right md:right-[80px] md:top-[150px] xs:right-[105px] xs:top-[135px]"
                    data-cy="stage-first-img"
                >
                    <div
                        className={`absolute xs:w-32 xs:h-32 md:w-36 md:h-36 bg-white rounded-full shadow-2xl ${bgImgFirst} bg-contain bg-cover bg-no-repeat ${bgImgFirstPosition}`}
                    />
                </div>
            )}
            {bgImgSecond && (
                <div
                    className="h-0 relative float-right md:right-[170px] md:top-[200px] xs:right-[115px] xs:top-[235px]"
                    data-cy="stage-second-img"
                >
                    <div
                        className={`absolute xs:w-32 xs:h-32 md:w-36 md:h-36 bg-white rounded-full shadow-2xl ${bgImgSecond} bg-contain bg-cover bg-no-repeat ${bgImgSecondPosition}`}
                    />
                </div>
            )}
            <div
                className="w-10 h-2 bg-tbPeach xs:mt-20 md:mt-24"
                data-cy="stage-connector"
            />
            <div
                className="max-w-[400px] py-8 md:px-8 xs:px-4 bg-white rounded-3xl border-8 border-tbPeach items-center justify-center text-primaryBlueDark"
                data-cy="stage-overview"
            >
                {stageTitle && (
                    <p className="font-roboto font-bold italic md:text-base xs:text-sm text-black">
                        {stageTitle}
                    </p>
                )}
                {stageTopics &&
                    stageTopics.map((topic: string, index: number) => {
                        return (
                            <div
                                className="flex items-center gap-2 py-2"
                                key={index}
                            >
                                <div className="flex bg-tbPeach h-8 w-8 rounded-full justify-center items-center text-center text-white font-bold font-gelica flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="m-0 font-roboto text-black md:text-base xs:text-sm">
                                    {messages.formatMessage({
                                        id: topic,
                                    })}
                                </p>
                            </div>
                        );
                    })}
                <div className="h-0 relative float-right right-[80px] -top-[10px]">
                    <div
                        onClick={() => displayModal(stageNumber)}
                        className="absolute w-24 h-24 bg-tbPink hover:bg-tbPinkDark rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                        data-cy="stage-fom-btn"
                    >
                        <span className="font-roboto font-bold text-white text-md text-center">
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
