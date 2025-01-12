import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

function UpButton() {
    return (
        <button
            className="font-bold py-2 px-2.5 fixed right-10 bottom-0 opacity-80 hover:opacity-100 bg-[#185EA1]"
            onClick={() => {
                return window.scrollTo(0, 0);
            }}
        >
            <FontAwesomeIcon
                className="text-white text-2xl"
                icon={faAngleUp}
            />
        </button>
    );
}

export default UpButton;
