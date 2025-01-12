import { useIntl } from 'react-intl';
import { MobileRoadStageInterface } from './RoadStageMobile';

interface BrowserRoadStageInterface extends MobileRoadStageInterface {
    left: boolean;
}

function RoadStage(props: BrowserRoadStageInterface) {
    const {
        stage,
        stageNumber,
        stageTitle,
        stageTopics,
        bgImgFirst,
        bgImgFirstPosition,
        displayModal,
        left,
        stagePart,
        bgImgSecond,
        bgImgSecondPosition,
    } = props;
    const messages = useIntl();

    const buildLeftStage = () => (
        <div
            className="flex items-center"
            data-cy="road-stage"
        >
            <div
                className="w-48 h-48 bg-tbPeach rounded-full flex justify-center items-center text-center"
                data-cy="stage-name-bubble"
            >
                <span className="text-white font-gelica font-bold text-3xl px-2">
                    {stage}
                    {stagePart && (
                        <p className="font-gelica font-bold text-xl">
                            {stagePart}
                        </p>
                    )}
                </span>
            </div>
            <div
                className="w-20 h-2 bg-tbPeach"
                data-cy="stage-connector"
            />
            <div
                className="min-w-[400px] max-w-[400px] py-8 px-11 bg-white rounded-3xl border-8 border-tbPeach items-center justify-center text-primaryBlueDark"
                data-cy="stage-overview"
            >
                {stageTitle && (
                    <p className="font-roboto font-bold italic text-xl text-black">
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
                                <div className="flex bg-tbPeach h-8 w-8 rounded-full justify-center items-center text-center text-white font-gelica font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="m-0 font-roboto text-black">
                                    {messages.formatMessage({
                                        id: topic,
                                    })}
                                </p>
                            </div>
                        );
                    })}
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
                    className="h-0 relative float-right left-[90px] bottom-[50px]"
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
                    className="absolute w-32 h-32 bg-tbPink hover:bg-tbPinkDark rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                    data-cy="stage-fom-btn"
                >
                    <span className="font-roboto font-bold text-white text-xl text-center">
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
                    className="h-0 relative float-right right-[200px] bottom-[250px]"
                    data-cy="stage-second-img"
                >
                    <div
                        className={`absolute w-60 h-60 bg-white rounded-full shadow-2xl ${bgImgSecond} bg-contain bg-cover bg-no-repeat ${bgImgSecondPosition}`}
                    />
                </div>
            )}
            <div
                className="h-0 relative float-left right-[280px] bottom-[50px]"
                data-cy="stage-first-img"
            >
                <div
                    className={`absolute w-60 h-60 bg-white rounded-full shadow-2xl ${bgImgFirst} bg-contain bg-cover bg-no-repeat ${bgImgFirstPosition}`}
                />
            </div>
            <div className="h-0 relative float-left right-[90px] bottom-[100px]">
                <div
                    onClick={() => displayModal(stageNumber)}
                    className="absolute w-32 h-32 bg-tbPink hover:bg-tbPinkDark rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                    data-cy="stage-fom-btn"
                >
                    <span className="font-roboto font-bold text-white text-xl text-center">
                        {messages.formatMessage({
                            id: 'findOutMore',
                        })}
                    </span>
                </div>
            </div>
            <div
                className="min-w-[400px] max-w-[400px] py-8 px-11 bg-white rounded-3xl border-8 border-tbPeach items-center justify-center text-primaryBlueDark"
                data-cy="stage-overview"
            >
                {stageTitle && (
                    <p className="font-roboto font-bold italic text-xl text-black">
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
                                <div className="flex bg-tbPeach h-8 w-8 rounded-full justify-center items-center text-center text-white font-gelica font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="m-0 font-roboto text-black">
                                    {messages.formatMessage({
                                        id: topic,
                                    })}
                                </p>
                            </div>
                        );
                    })}
            </div>
            <div
                className="w-32 h-2 bg-tbPeach"
                data-cy="stage-connector"
            />
            <div
                className="w-48 h-48 bg-tbPeach rounded-full flex justify-center items-center text-center"
                data-cy="stage-name-bubble"
            >
                <span className="text-white font-gelica font-bold text-3xl px-2">
                    {stage}
                    {stagePart && (
                        <p className="font-gelica font-bold text-xl">
                            {stagePart}
                        </p>
                    )}
                </span>
            </div>
        </div>
    );

    return left ? buildLeftStage() : buildRightStage();
}

export default RoadStage;
