import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import { useIntl } from 'react-intl';

const AllergiesComponent = () => {
    const messages = useIntl();
    const navigate = useNavigate();

    return (
        <div className="bg-[#F2F2F2] text-white flex md:flex-row max-md:flex-col w-full items-center border-b-8 border-secondaryOrange">
            <div className="max-md:w-full md:w-1/2 xs:pl-16 md:pl-20 xl:pl-36 xs:pr-16 md:pr-16 xs:pb-0 xs:pt-8 md:py-8 xl:py-16">
                <h1
                    className="text-primaryBlueDark font-omnes font-bold xl:text-3xl md:text-2xl xs:text-xl mb-8"
                    data-cy="allegies-title"
                >
                    {messages.formatMessage({
                        id: 'allergyTitle',
                    })}
                </h1>
                <p
                    className="text-primaryBlueDark font-forma xl:text-xl md:text-base xs:text-sm mb-4"
                    data-cy="allegies-paragraph-1"
                >
                    {messages.formatMessage({
                        id: 'allergyText1',
                    })}
                </p>
                <p
                    className="text-primaryBlueDark font-forma xl:text-xl md:text-base xs:text-sm mb-4"
                    data-cy="allegies-paragraph-2"
                >
                    {messages.formatMessage({
                        id: 'allergyText2',
                    })}
                </p>
                <p
                    className="text-primaryBlueDark font-forma xl:text-xl md:text-base xs:text-sm mb-0"
                    data-cy="allegies-paragraph-3"
                >
                    <strong>
                        {messages.formatMessage({
                            id: 'allergyText3',
                        })}
                    </strong>
                </p>
            </div>
            <div className="flex flex-col xs:w-full md:w-1/2 gap-y-4 xs:px-16 md:px-20 xl:px-36 xs:py-8">
                <button
                    className="bg-primaryBlue px-6 py-4 flex justify-between items-center hover:bg-primaryBlueDark text-xl"
                    data-cy="allegies-btn-1"
                    onClick={() => {
                        window.open(
                            'https://preventallergies.org.au',
                            '_blank'
                        );
                    }}
                >
                    {messages.formatMessage({
                        id: 'allergyBtn1Text',
                    })}
                    <Arrow
                        className="ml-4"
                        fill="white"
                        width="2em"
                    />
                </button>
                <button
                    className="bg-primaryBlue px-6 py-4 flex justify-between items-center hover:bg-primaryBlueDark text-xl"
                    data-cy="allegies-btn-2"
                    onClick={() => {
                        window.scrollTo(0, 0);
                        setTimeout(() => {
                            navigate('/find-a-health-professional');
                        }, 200);
                    }}
                >
                    {messages.formatMessage({
                        id: 'allergyBtn2Text',
                    })}
                    <Arrow
                        className="ml-4"
                        fill="white"
                        width="2em"
                    />
                </button>
            </div>
        </div>
    );
};

export default AllergiesComponent;
