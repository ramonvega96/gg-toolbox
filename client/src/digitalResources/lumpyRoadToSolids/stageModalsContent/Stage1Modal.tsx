import { useIntl } from 'react-intl';
import TextArrowButton from '../../sharedComponents/TextArrowButton';

function Stage1Modal() {
    const messages = useIntl();

    const getModalContent = () => (
        <div
            className="xs:pt-8 md:pt-0 xs:px-8 md:px-20"
            data-cy="modal-stg1"
        >
            <p
                className="font-forma font-bold md:text-xl xs:text-md mb-6"
                data-cy="modal-text"
            >
                {messages.formatMessage({ id: 'stage1ModalText' })}
            </p>
            <TextArrowButton
                topText="Feeding Cues"
                bottomText="Metro North Hospital and Health services"
                link="https://metronorth.health.qld.gov.au/rbwh/wp-content/uploads/sites/2/2017/07/feeding-cues-term.pdf"
            />
            <TextArrowButton
                topText="Breastfeeding"
                bottomText="Australian Breastfeeding Association"
                link="https://www.breastfeeding.asn.au/resources/3-6-months"
            />
            <TextArrowButton
                topText="Responsive bottle feeding"
                bottomText="Queensland Children's Hospital"
                link="https://www.youtube.com/watch?v=3EdkgK5ED5A&list=PLf_OQr1DI9A8fSgNQSmgzhXZV2_Ci-drv&index=2"
            />
        </div>
    );

    return getModalContent();
}

export default Stage1Modal;
