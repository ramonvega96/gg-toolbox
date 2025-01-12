import { FailReturn, SuccessReturn } from '../../helpers/Result';
import { ContactForm, ResourceSubmission } from './Contact';
import { IContactRepository } from './ContactRepository';

export interface IContactService {
    forwardContactMessage(
        contactForm: ContactForm
    ): Promise<SuccessReturn<ContactForm> | FailReturn>;
    forwardResourceSubmission(
        resourceSubmission: ResourceSubmission
    ): Promise<SuccessReturn<ResourceSubmission> | FailReturn>;
}

export default (contactRepository: IContactRepository): IContactService => {
    return {
        forwardContactMessage: async (contactForm: ContactForm) =>
            await contactRepository.forwardContactMessage(contactForm),
        forwardResourceSubmission: async (
            resourceSubmission: ResourceSubmission
        ) =>
            await contactRepository.forwardResourceSubmission(
                resourceSubmission
            ),
    };
};
