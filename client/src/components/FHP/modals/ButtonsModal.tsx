import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ILink } from '../types/Modals';

interface ButtonsModalInterface {
    toggleModal: (toggle: boolean) => void;
    description?: string;
    buttons?: ILink[];
}

function ButtonsModal(props: ButtonsModalInterface) {
    const { toggleModal, description, buttons } = props;

    function renderBlueLinkButton(label: string, link: string) {
        return (
            <button
                className="bg-primaryBlue btn-primary p-3 shadow-md hover:bg-primaryBlueDark rounded-none w-[35vw] min-h-[100px] min-w-[36] max-lg:min-h-[150px] text-white font-omnes hover:no-underline  max-lg:text-sm"
                onClick={() => window.open(link, '_blank')}
            >
                {label}
            </button>
        );
    }

    function renderModalContent() {
        return (
            <div
                id="community-service-container"
                className="flex justify-center flex-col gap-10"
            >
                {description && (
                    <div
                        id="community-service-description"
                        className="max-lg:text-base lg:text-lg text-black text-center"
                    >
                        {description}
                    </div>
                )}
                {buttons && (
                    <div
                        id="community-service-button-container"
                        className={
                            buttons && buttons.length > 2
                                ? 'grid grid-cols-3 gap-3 max-sm:grid-cols-1 overflow-hidden'
                                : 'flex flex-row gap-3 justify-center'
                        }
                    >
                        {buttons &&
                            buttons.map((button, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex"
                                    >
                                        {renderBlueLinkButton(
                                            button.linkLabel,
                                            button.link
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div
                id="modal-background"
                className="bg-[#0000006E] bg-opacity-75 transition-opacity top-0 left-0 w-full z-1 fixed h-full grid place-items-center overflow-scroll no-scrollbar"
                onClick={() => {
                    toggleModal(false);
                }}
            >
                <div
                    id="modal-container"
                    className={`bg-white my-20 md:my-0 md:mx-5 min-h-[250px]
                    flex flex-col max-sm:px-10 px-32 py-16 h-auto w-[85vw]`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="flex flex-col justify-between pb-3 pt-4 relative ">
                        <button
                            id="x-button"
                            className="text-2xl !leading-[1] text-primaryBlueDark absolute top-[-2em] right-[-4.4em] max-sm:right-[-1.4em] p-3"
                            onClick={() => {
                                toggleModal(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>
                    <div
                        id="buttons container"
                        className="flex flex-col gap-10 justify-center items-center"
                    >
                        {renderModalContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ButtonsModal;
