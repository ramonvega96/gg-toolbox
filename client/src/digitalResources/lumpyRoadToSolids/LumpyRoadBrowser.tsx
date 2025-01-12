import { useIntl } from 'react-intl';
import RoadStage from './RoadStageBrowser';
import { LumpyRoadInterface } from './LumpyRoadMobile';

function LumpyRoadBrowser(props: LumpyRoadInterface) {
    const { displayModal } = props;
    const messages = useIntl();

    return (
        <div className="justify-center w-full xl:flex xl:px-36 md:hidden xs:hidden">
            <div className="w-full bg-road bg-contain bg-repeat max-w-[1200px]">
                <div className="flex justify-left pt-12 pl-12">
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
                        left={true}
                    />
                </div>
                <div className="flex justify-end pt-6 pr-12">
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
                        left={false}
                    />
                </div>
                <div className="flex justify-left pt-6 pl-12">
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
                        left={true}
                    />
                </div>
                <div className="flex justify-end pt-6 pr-12">
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
                        left={false}
                    />
                </div>
                <div className="flex justify-left pt-6 pl-12">
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
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage4-img1.png")]'
                        bgImgFirstPosition="bg-center"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage4-img2.jpg")]'
                        bgImgSecondPosition="bg-left"
                        displayModal={displayModal}
                        left={true}
                    />
                </div>
                <div className="flex justify-end pt-6 pr-12">
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
                        left={false}
                    />
                </div>
                <div className="flex justify-left pt-6 pl-12">
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
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-img1.png")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-img2.jpg")]'
                        bgImgSecondPosition="bg-left"
                        displayModal={displayModal}
                        left={true}
                    />
                </div>
                <div className="flex justify-end pb-16 pt-6 pr-12">
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
                        left={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default LumpyRoadBrowser;
