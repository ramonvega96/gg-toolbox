import { useIntl } from 'react-intl';
import TextArrowButton from '../../sharedComponents/TextArrowButton';

function Stage0Modal() {
    const messages = useIntl();

    const getModalContent = () => (
        <div
            className="xs:pt-8 md:pt-0 xs:px-8 md:px-20"
            data-cy="modal-stg0"
        >
            <p
                className="font-forma font-bold md:text-xl xs:text-md mb-6"
                data-cy="modal-text"
            >
                {messages.formatMessage({ id: 'stage0ModalText' })}
            </p>
            <TextArrowButton
                topText="Feeding in the first weeks"
                bottomText="Australian Breastfeeding Association"
                link="https://www.breastfeeding.asn.au/resources/first-week"
            />
            <TextArrowButton
                topText="Breastfeeding"
                bottomText="Australian Breastfeeding Association"
                link="https://www.breastfeeding.asn.au/resources/0-3-months"
            />
            <TextArrowButton
                topText="Choosing a formula"
                bottomText="Grow & Go Toolbox"
                link="https://growandgotoolbox.com/digital-resources/reading-formula-labels"
            />
        </div>
    );

    return getModalContent();
}

export default Stage0Modal;
