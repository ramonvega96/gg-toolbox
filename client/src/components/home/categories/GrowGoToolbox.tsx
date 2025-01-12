import { useIntl } from 'react-intl';
import SearchBarContainer from '../../searchbar/SearchBarContainer';
import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ResourceCardGroup from '../../resourceCard/ResourceCardGroups';
import { getGGTResources } from '../../../utils/NetworkCalls';

function GrowGoToolbox() {
    const messages = useIntl();
    const [ggtResources, setGgtResources] = useState([]);
    const navigate = useNavigate();

    const retrieveAllTagTypes = async () => {
        const resources = await getGGTResources();
        setGgtResources(resources.payload);
    };

    useEffect(() => {
        retrieveAllTagTypes();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div className="flex bg-primaryBlue pb-24 pt-32 flex-col lg:flex-row max-mymd:pl-16 mymd:pl-20 xl:pl-36">
                <div className="w-full text-white flex flex-col pr-8">
                    <h1 className="font-omnes pb-10 text-5xl text-white max-mdsm:text-2xl text-left">
                        {messages.formatMessage({
                            id: 'homeGrowAndGoToolboxTitle',
                        })}
                    </h1>
                    <h5 className="w-full md:text-3xl sm:text-2xl text-xl font-light max-mdsm:text-xl">
                        {messages.formatMessage({
                            id: 'homeGrowAndGoToolboxDescription',
                        })}
                    </h5>
                </div>
                <div className="w-full max-mymd:pr-16 mymd:pr-20 xl:pr-36">
                    <div className="flex flex-col md:w-full max-md:mt-8">
                        <button
                            className={`bg-secondaryGreen hover:bg-tertiaryGreen px-6 py-4 flex justify-between text-left text-xl text-white`}
                            onClick={() => {
                                navigate('/about-us');
                            }}
                        >
                            {messages.formatMessage({ id: 'findOut' })}
                            <Arrow
                                className="ml-4"
                                fill="white"
                                width="2em"
                            />
                        </button>
                        <SearchBarContainer
                            backgroundColor="primaryBlue"
                            width="w-full"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap py-4 max-mymd:px-16 mymd:px-20 xl:px-36">
                <ResourceCardGroup
                    resourcesDisplayed={ggtResources.length}
                    contentParam={ggtResources}
                />
            </div>
        </div>
    );
}
export default GrowGoToolbox;
