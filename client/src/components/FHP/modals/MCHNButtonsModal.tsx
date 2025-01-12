import { useEffect, useState } from 'react';
import { getHealthProfessionalInfoByState } from '../../../utils/NetworkCalls';
import ButtonsModal from './ButtonsModal';
import { HealthProfessional } from '../types/HealthProfessional';

interface MCHNButtonsModalInterface {
    toggleModal: (toggle: boolean) => void;
    state: string;
    profession: string;
}

function MCHNButtonsModal(props: MCHNButtonsModalInterface) {
    const { toggleModal, state, profession } = props;

    const [selectedProfession, setSelectedProfession] =
        useState<HealthProfessional>();

    useEffect(() => {
        const getSelectedProfessional = async () => {
            if (profession) {
                const res = await getHealthProfessionalInfoByState(
                    state,
                    profession
                );
                const response = res.payload[0];
                if (response) {
                    setSelectedProfession({
                        profession: response.profession,
                        description: response.description,
                        state: response.state,
                        publicService: response.publicService,
                        privateService: response.privateService,
                        communityService: response.communityService,
                        tags: response.profession,
                    });
                }
            }
        };
        getSelectedProfessional();
        // Useeffect to run component setup
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderModal = () => {
        return (
            <ButtonsModal
                toggleModal={toggleModal}
                buttons={selectedProfession?.communityService?.links}
            />
        );
    };

    return renderModal();
}
export default MCHNButtonsModal;
