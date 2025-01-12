import { useIntl } from 'react-intl';
import topImage from '../../assets/images/digitalResources/lumpyRoadToSolids/lrs_tinyBites.png';

function CustomWelcomeComponent() {
    const messages = useIntl();
    return (
        <div className="flex flex-col">
            <div className="flex flex-row bg-tbPrimaryBlue">
                <div className="flex items-center xs:pl-16 md:pl-20 xl:pl-36 xl:pr-36 md:pr-0 xs:pr-16 md:w-1/2 xs:pb-0 md:pb-8 pt-8 ">
                    <div className="flex flex-col text-white text-left">
                        <h1 className="font-gelica font-bold xl:text-6xl md:text-4xl">
                            {messages.formatMessage({
                                id: 'lumpyRoadToSolids',
                            })}
                        </h1>
                        <p className="font-roboto font-light xl:mt-12 md:mt-8 xl:text-2xl md:text-xl">
                            {messages.formatMessage({
                                id: 'lrsTbWelcome1',
                            })}
                        </p>
                        <p className="font-roboto font-light xl:text-2xl md:text-xl">
                            {messages.formatMessage({
                                id: 'lrsTbWelcome2',
                            })}
                        </p>
                        <p className="font-roboto font-light xl:mt-12 md:mt-8 xl:text-xl md:text-lg">
                            {messages.formatMessage({
                                id: 'lrsTbWelcome3',
                            })}
                        </p>
                    </div>
                </div>
                <div className="xs:hidden md:flex p-8 h-full w-1/2 overflow-hidden justify-end">
                    <img
                        src={topImage}
                        alt="kids in cook outfit"
                        className="object-contain max-h-[64vh]"
                    />
                </div>
            </div>
            <div className="w-full bg-tbPrimaryBlue md:hidden overflow-hidden pb-4 px-16">
                <img
                    src={topImage}
                    alt="kids in cook outfit"
                    className={`object-cover object-top object-center w-full`}
                />
            </div>
            <div className="flex">
                <div className="xs:border-b-8 md:border-b-[12px] border-tblightGreen w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbYellow w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbDarkPink w-full" />
                <div className="xs:border-b-8 md:border-b-[12px] border-tbDarkRed w-full" />
            </div>
        </div>
    );
}

export default CustomWelcomeComponent;
