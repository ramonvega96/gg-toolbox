import { useIntl } from 'react-intl';
import RoadStage from './RoadStageBrowser';
import { LumpyRoadInterface } from './LumpyRoadMobile';

import bottle from '../../assets/images/digitalResources/lumpyRoadToSolids/bottle.png';
import plate from '../../assets/images/digitalResources/lumpyRoadToSolids/plate.png';
import brocoli from '../../assets/images/digitalResources/lumpyRoadToSolids/brocoli.png';
import bread from '../../assets/images/digitalResources/lumpyRoadToSolids/bread.png';
import spoon from '../../assets/images/digitalResources/lumpyRoadToSolids/spoon.png';
import fork from '../../assets/images/digitalResources/lumpyRoadToSolids/fork.png';
import lettuce from '../../assets/images/digitalResources/lumpyRoadToSolids/lettuce.png';
import meat from '../../assets/images/digitalResources/lumpyRoadToSolids/meat.png';
import carrot from '../../assets/images/digitalResources/lumpyRoadToSolids/carrot.png';
import fish from '../../assets/images/digitalResources/lumpyRoadToSolids/fish.png';

function LumpyRoadBrowser(props: LumpyRoadInterface) {
    const { displayModal } = props;
    const messages = useIntl();

    const graphicsSet1 = () => (
        <div className="h-0 relative float-left right-[100px] bottom-[170px]">
            <img
                alt="Bottle graphic"
                src={bottle}
                className="h-40 -mb-8"
            />
            <img
                alt="Bottle graphic"
                src={bottle}
                className="h-40 ml-16 rotate-45"
            />
        </div>
    );

    const graphicsSet2 = () => (
        <div className="h-0 relative float-right left-[300px] bottom-[170px]">
            <img
                alt="Spoon graphic"
                src={spoon}
                className="h-36 -rotate-12 ml-20"
            />
            <img
                alt="Bread graphic"
                src={bread}
                className="h-36 -rotate-90 -mt-24"
            />
            <img
                alt="Brocoli graphic"
                src={brocoli}
                className="h-28 -rotate-45 -mt-8"
            />
            <img
                alt="Plate graphic"
                src={plate}
                className="h-32 -rotate-45 -mt-32 ml-12"
            />
        </div>
    );

    const graphicsSet3 = () => (
        <div className="h-0 relative float-left right-[290px] bottom-[400px]">
            <img
                alt="Fork graphic"
                src={fork}
                className="h-36 rotate-6 ml-20"
            />
            <img
                alt="Spoon graphic"
                src={spoon}
                className="h-36 rotate-45 ml-28 -mt-24"
            />
            <img
                alt="Lettuce graphic"
                src={lettuce}
                className="h-28 -rotate-6 ml-36 -mt-20"
            />
            <img
                alt="Meat graphic"
                src={meat}
                className="h-28 rotate-12 ml-40 -mt-2"
            />
            <img
                alt="Plate graphic"
                src={plate}
                className="h-28 rotate-[58deg] -ml-8 -mt-28"
            />
        </div>
    );

    const graphicsSet4 = () => (
        <div className="h-0 relative float-right left-[300px] bottom-[170px]">
            <img
                alt="Fork graphic"
                src={fork}
                className="h-36 -rotate-12 ml-32"
            />
            <img
                alt="Spoon graphic"
                src={spoon}
                className="h-36 -rotate-12 ml-20 -mt-24"
            />
            <img
                alt="Fish graphic"
                src={fish}
                className="h-24 -rotate-12 -mt-16"
            />
            <img
                alt="Carrot graphic"
                src={carrot}
                className="h-28 -rotate-45 -mt-8 -ml-12"
            />
            <img
                alt="Plate graphic"
                src={plate}
                className="h-32 -rotate-45 -mt-32 ml-12"
            />
        </div>
    );

    return (
        <div className="justify-center w-full xl:flex xl:px-36 md:hidden xs:hidden">
            <div className="w-full bg-tb-road bg-contain bg-repeat max-w-[1000px] pt-4">
                <div className="flex justify-left py-12 pl-12">
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
                        left={true}
                    />
                </div>
                {graphicsSet1()}
                <div className="flex justify-end py-8 pr-12">
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
                        left={false}
                    />
                </div>
                <div className="flex justify-left py-12 pl-12">
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
                        left={true}
                    />
                </div>
                <div className="flex justify-end py-12 pr-12">
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
                        left={false}
                    />
                </div>
                {graphicsSet2()}
                <div className="flex justify-left py-12 pl-12">
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
                        left={true}
                    />
                </div>
                <div className="flex justify-end py-36 pr-12">
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
                        left={false}
                    />
                </div>
                <div className="flex justify-left py-24 pl-12">
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
                        left={true}
                    />
                </div>
                {graphicsSet3()}
                <div className="flex justify-end py-36 pr-12">
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
                        left={false}
                    />
                </div>
                <div className="flex justify-left py-24 pl-12">
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
                        left={true}
                    />
                </div>
                <div className="flex justify-end py-36 pr-12">
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
                        left={false}
                    />
                </div>
                {graphicsSet4()}
                <div className="flex justify-left py-24 pl-12">
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
                        left={true}
                    />
                </div>
                <div className="flex justify-end py-36 pr-12">
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
                        left={false}
                    />
                </div>
                <div className="flex justify-left py-24 pl-12">
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
                        left={true}
                    />
                </div>
                <div className="flex justify-end py-36 pr-12">
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
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage7-img1.jpg")]'
                        bgImgSecondPosition="bg-left"
                        displayModal={displayModal}
                        left={false}
                    />
                </div>
                <div className="flex justify-left py-24 pl-12">
                    <RoadStage
                        stage={messages.formatMessage({ id: 'stage14-tb' })}
                        stageTopics={['stage14Topic0', 'stage14Topic1']}
                        stageNumber={14}
                        bgImgFirst='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage14-img1-tb.jpg")]'
                        bgImgFirstPosition="bg-right"
                        bgImgSecond='bg-[url("/src/assets/images/digitalResources/lumpyRoadToSolids/stage14-img2-tb.jpg")]'
                        bgImgSecondPosition="bg-bottom"
                        displayModal={displayModal}
                        left={true}
                    />
                </div>
                <p className="h-0 -ml-44 mb-12 font-roboto">
                    Last updated: June 2024
                </p>
            </div>
        </div>
    );
}

export default LumpyRoadBrowser;
