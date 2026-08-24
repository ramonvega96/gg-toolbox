import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ResourceCardGroup from '../../resourceCard/ResourceCardGroups';
import { getTBResources } from '../../../utils/NetworkCalls';

function TinyBites() {
    const messages = useIntl();
    const [tbResources, setTbResources] = useState([]);

    const retrieveAllTagTypes = async () => {
        const resources = await getTBResources();
        setTbResources(resources.payload);
    };

    useEffect(() => {
        retrieveAllTagTypes();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div className="flex bg-tbPrimaryBlue pb-24 pt-32 flex-col lg:flex-row max-mymd:px-16 mymd:px-20 xl:px-36">
                <div className="w-full text-white flex flex-col">
                    <h1 className="font-gelica font-bold pb-10 text-5xl text-white max-mdsm:text-2xl text-left">
                        {messages.formatMessage({ id: 'tinyBitesResources' })}
                    </h1>
                    <h5 className="w-full md:text-3xl sm:text-2xl text-xl font-roboto font-light max-mdsm:text-xl">
                        {messages.formatMessage({ id: 'tinyBitesDef' })}
                    </h5>
                </div>
            </div>
            <div className="flex">
                <div className="xs:border-b-8 md:border-b-[12px] border-tblightGreen w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbYellow w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbDarkPink w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbDarkRed w-full" />
            </div>
            <div className="flex flex-wrap py-4 max-mymd:px-16 mymd:px-20 xl:px-36">
                <ResourceCardGroup
                    resourcesDisplayed={tbResources.length}
                    contentParam={tbResources}
                />
            </div>
        </div>
    );
}
export default TinyBites;
