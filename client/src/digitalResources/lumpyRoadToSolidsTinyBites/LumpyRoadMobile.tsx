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
            <div className="w-full bg-tb-road-mobile bg-left bg-[length:10vw_1000px] bg-repeat-y max-w-[800px]">
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage0-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage0Title-tb',
                        })}
                        stageTopics={['stage0Topic0', 'stage0Topic1']}
                        stageNumber={0}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage0-img1.jpg")]'
                        bgImgFirstPosition="bg-center"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage1-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage1Title-tb',
                        })}
                        stageTopics={[
                            'stage1Topic0',
                            'stage1Topic1',
                            'stage1Topic2',
                            'stage1Topic3',
                        ]}
                        stageNumber={1}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-img1.jpg")]'
                        bgImgFirstPosition="bg-center"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage2-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage2Title-tb',
                        })}
                        stageTopics={[
                            'stage2Topic0',
                            'stage2Topic1',
                            'stage2Topic2',
                            'stage2Topic3',
                        ]}
                        stageNumber={2}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-img1-tb.png")]'
                        bgImgFirstPosition="bg-left"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage2-food6.png")]'
                        bgImgSecondPosition="bg-center"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage3-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage3Title-tb',
                        })}
                        stageTopics={[
                            'stage3Topic0',
                            'stage3Topic1',
                            'stage3Topic2',
                            'stage3Topic3',
                            'stage3Topic4',
                        ]}
                        stageNumber={3}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food4.png")]'
                        bgImgFirstPosition="bg-bottom"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-img3.png")]'
                        bgImgSecondPosition="bg-right"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage4-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage4Title-tb',
                        })}
                        stageTopics={['stage4Topic0', 'stage4Topic1']}
                        stageNumber={4}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage4-img2.jpg")]'
                        bgImgFirstPosition="bg-left"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage4-img1.png")]'
                        bgImgSecondPosition="bg-center"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage5-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage5Title-tb',
                        })}
                        stageTopics={[
                            'stage5Topic0',
                            'stage5Topic1',
                            'stage5Topic2',
                        ]}
                        stageNumber={5}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage5-img1.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage3-food10.png")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage6-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage6Title-tb',
                        })}
                        stageTopics={[
                            'stage6Topic0',
                            'stage6Topic1',
                            'stage6Topic2',
                            'stage6Topic3',
                        ]}
                        stageNumber={6}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-img3.png")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage7-img2-tb.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage7-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage7Title-tb',
                        })}
                        stageTopics={['stage7Topic0', 'stage7Topic1']}
                        stageNumber={7}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage7-img1-tb.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage6-img4.png")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage8-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage8Title-tb',
                        })}
                        stageTopics={[
                            'stage8Topic0',
                            'stage8Topic1',
                            'stage8Topic2',
                            'stage8Topic3',
                        ]}
                        stageNumber={8}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage8-img1-tb.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage11-food2.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage9-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage9Title-tb',
                        })}
                        stageTopics={['stage9Topic0', 'stage9Topic1']}
                        stageNumber={9}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage11-food5.jpg")]'
                        bgImgFirstPosition="bg-center"
                        stagePart="(Part 1)"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage9-img2-tb.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage10-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage10Title-tb',
                        })}
                        stageTopics={[
                            'stage10Topic0',
                            'stage10Topic1',
                            'stage10Topic2',
                        ]}
                        stageNumber={10}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage10-img1-tb.jpg")]'
                        bgImgFirstPosition="bg-right"
                        stagePart="(Part 2)"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage10-img2-tb.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage11-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage11Title-tb',
                        })}
                        stageTopics={['stage11Topic0', 'stage11Topic1']}
                        stageNumber={11}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage11-img2-tb.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage11-img1-tb.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage12-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage12Title-tb',
                        })}
                        stageTopics={[
                            'stage12Topic0',
                            'stage12Topic1',
                            'stage12Topic2',
                        ]}
                        stageNumber={12}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage12-img1-tb.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage12-img2-tb.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left py-16">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage13-tb' })}
                        stageTitle={messages.formatMessage({
                            id: 'stage13Title-tb',
                        })}
                        stageTopics={[
                            'stage13Topic0',
                            'stage13Topic1',
                            'stage13Topic2',
                        ]}
                        stageNumber={13}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage13-img1.png")]'
                        bgImgFirstPosition="bg-left"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage7-img1.jpg")]'
                        bgImgSecondPosition="bg-left"
                        displayModal={displayModal}
                    />
                </div>
                <div className="flex justify-left pt-16 pb-64">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage14-tb' })}
                        stageTopics={['stage14Topic0', 'stage14Topic1']}
                        stageNumber={14}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage14-img1-tb.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage14-img2-tb.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                    />
                </div>
                <p className="h-0 xs:ml-20 md:ml-36 mb-12 font-roboto">
                    Last updated: June 2024
                </p>
            </div>
        </div>
    );
}

export default LumpyRoadMobile;
