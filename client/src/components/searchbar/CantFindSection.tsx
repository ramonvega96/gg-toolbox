import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../assets/images/icons/svg/right_arrow_svgrepo_com.svg';

function CantFindSection() {
    const messages = useIntl();
    const navigate = useNavigate();

    return (
        <div className="flex max-md:flex-col items-center justify-between mt-24 pt-8 border-t border-t-formBorderGrey min-h-64">
            <div className="max-md:w-3/4 w-1/3 pb-12">
                <h3 className="text-[#9F9F9F] mb-8">
                    {messages.formatMessage({ id: 'cantFindTitle' })}
                </h3>
                <p>{messages.formatMessage({ id: 'cantFindText' })}</p>
            </div>
            <div className="max-md:w-3/4 w-1/3 flex items-end">
                <button
                    onClick={() => navigate('/contact-us')}
                    className="bg-primaryBlue p-6 flex justify-between items-center w-full hover:bg-primaryBlueDark text-white"
                >
                    <span>{messages.formatMessage({ id: 'contactUs' })}</span>
                    <Arrow
                        fill="white"
                        width="2em"
                    />
                </button>
            </div>
        </div>
    );
}

export default CantFindSection;
