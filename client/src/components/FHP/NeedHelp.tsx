import { useContext } from 'react';
import NavigationButtons from './NavigationButtons';
import tagsAndProfessions from '../../assets/json/needHelpTagsAndProfessions.json';
import { PathwayContext } from '../../utils/Contexts';
import { useIntl } from 'react-intl';

interface FindHelpInterface {
    setTopic(topic: string): void;
}

/**
 * Renders the I need help with... section
 * @param props setPath: the previous page, setTopic: the users selection
 * @returns
 */
function NeedHelp(props: FindHelpInterface) {
    const messages = useIntl();
    const { setTopic } = props;
    const { setPath } = useContext(PathwayContext);

    return (
        <div>
            <NavigationButtons
                setPath={setPath}
                path="australia"
            />
            <div
                className="w-full  xs:ml-3 mdsm:ml-4 sm:ml-12 md:ml-20 max-lg:ml-24 
            lg:pl-14 flex flex-col justify-center"
            >
                <div
                    id="title-button-grid-container"
                    className="max-sm:w-11/12 max-lg:w-10/12 lg:w-8/12 xl:w-1/2 pt-24 "
                >
                    <h1
                        id="need-help-title"
                        className=" text-3xl md:text-5xl font-omnes max-lg:mb-10 mymd:mb-20 "
                    >
                        {messages.formatMessage({ id: 'iNeedHelpWith' })}
                    </h1>
                    <div
                        className="grid max-md:grid-cols-2 max-md:grid-rows-4 
                    md:grid-cols-3 md:grid-rows-3 gap-y-6 pb-10 mt-0 max-mymd:gap-x-4 
                    mymd:gap-x-12 gap-x-20 justify-center justify-self-center"
                    >
                        {tagsAndProfessions.tags.map((tag, index) => {
                            return (
                                <button
                                    id={
                                        'topic-button-' +
                                        tag
                                            .replace(/[,']/g, '')
                                            .replace(/[\s/]+/g, '-')
                                            .toLowerCase()
                                    }
                                    key={index}
                                    className={`text-sm md:text-xl text-primaryBlueDark font-omnes
                                     bg-white min-h-[100px] w-full py-6 md:py-14 px-[1vw]  
                                     justify-center justify-self-center !leading-[1]
                                    hover:!bg-lightGrey ${
                                        index ===
                                            tagsAndProfessions.tags.length -
                                                1 && 'max-md:ml-[40vw] md:ml-0'
                                    }`}
                                    onClick={() => {
                                        setTopic(tag);
                                        setPath('suggested');
                                    }}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NeedHelp;
