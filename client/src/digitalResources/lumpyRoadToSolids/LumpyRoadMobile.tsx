import { useIntl } from 'react-intl';
import RoadStage from './RoadStageMobile';

export interface LumpyRoadInterface {
    displayModal: (stage: number) => void;
}

function LumpyRoadMobile(props: LumpyRoadInterface) {
    const { displayModal } = props;
    const messages = useIntl();

    return (
        <div className="justify-center w-full xl:hidden md:flex xs:flex xs:px-8 md:px-16">
            <div className="w-full bg-road-mobile bg-left bg-[length:10vw_1000px] bg-repeat-y max-w-[800px]">
                <div className="flex justify-left pt-12">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage0' })}
                        stageNumber={0}
                        developmentalStage={messages.formatMessage({
                            id: 'stage0DevelopmentalStage',
                        })}
                        feedingNeeds={messages.formatMessage({
                            id: 'stage0FeedingNeeds',
                        })}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage0-img1.jpg")]'
                        bgImgFirstPosition="bg-center"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left pt-14">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage1' })}
                        stageNumber={1}
                        developmentalStage={messages.formatMessage({
                            id: 'stage1DevelopmentalStage',
                        })}
                        feedingNeeds={messages.formatMessage({
                            id: 'stage1FeedingNeeds',
                        })}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage1-img1.jpg")]'
                        bgImgFirstPosition="bg-left"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left pt-14">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage2' })}
                        stageNumber={2}
                        developmentalStage={messages.formatMessage({
                            id: 'stage2DevelopmentalStage',
                        })}
                        feedingNeeds={messages.formatMessage({
                            id: 'stage2FeedingNeeds',
                        })}
                        additionalText={messages.formatMessage({
                            id: 'stage2AdditionalText',
                        })}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-img1.jpg")]'
                        bgImgFirstPosition="bg-center"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-img2.jpg")]'
                        bgImgSecondPosition="bg-right"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left pt-14">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage3' })}
                        stageNumber={3}
                        developmentalStage={messages.formatMessage({
                            id: 'stage3DevelopmentalStage',
                        })}
                        feedingNeeds={messages.formatMessage({
                            id: 'stage3FeedingNeeds',
                        })}
                        additionalText={messages.formatMessage({
                            id: 'stage3AdditionalText',
                        })}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-img1.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-img2.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left pt-14">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage4' })}
                        stageNumber={4}
                        developmentalStage={messages.formatMessage({
                            id: 'stage4DevelopmentalStage',
                        })}
                        feedingNeeds={messages.formatMessage({
                            id: 'stage4FeedingNeeds',
                        })}
                        additionalText={messages.formatMessage({
                            id: 'stage4AdditionalText',
                        })}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage4-img2.jpg")]'
                        bgImgFirstPosition="bg-center"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage4-img1.png")]'
                        bgImgSecondPosition="bg-left"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left pt-14">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage5' })}
                        stageNumber={5}
                        developmentalStage={messages.formatMessage({
                            id: 'stage5DevelopmentalStage',
                        })}
                        feedingNeeds={messages.formatMessage({
                            id: 'stage5FeedingNeeds',
                        })}
                        additionalText={messages.formatMessage({
                            id: 'stage5AdditionalText',
                        })}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-img1.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-img2.png")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left pt-14">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage6' })}
                        stageNumber={6}
                        developmentalStage={messages.formatMessage({
                            id: 'stage6DevelopmentalStage',
                        })}
                        feedingNeeds={messages.formatMessage({
                            id: 'stage6FeedingNeeds',
                        })}
                        additionalText={messages.formatMessage({
                            id: 'stage6AdditionalText',
                        })}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-img2.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-img1.png")]'
                        bgImgSecondPosition="bg-left"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left pt-14 pb-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage7' })}
                        stageNumber={7}
                        developmentalStage={messages.formatMessage({
                            id: 'stage7DevelopmentalStage',
                        })}
                        feedingNeeds={messages.formatMessage({
                            id: 'stage7FeedingNeeds',
                        })}
                        additionalText={messages.formatMessage({
                            id: 'stage7AdditionalText',
                        })}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage7-img1.jpg")]'
                        bgImgFirstPosition="bg-left"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage7-img2.jpg")]'
                        bgImgSecondPosition="bg-center"
                        displayModal={displayModal}
                    />
                </div>
            </div>
        </div>
    );
}

export default LumpyRoadMobile;
