import ContactRepository, { IContactRepository } from './ContactRepository';
import ContactService, { IContactService } from './ContactService';
import ContactController, { IContactController } from './ContactController';
import { IContactRouter, ContactRouter } from './ContactRouter';

export interface IContactModule {
    contactService: IContactService;
    contactRepository: IContactRepository;
    contactController: IContactController;
    contactRouter: IContactRouter;
}

export const ContactModule = (): IContactModule => {
    // Repositories
    const contactRepository = ContactRepository();

    // Services
    const contactService = ContactService(contactRepository);

    // Controller
    const contactController = ContactController(contactService);

    // Router
    const contactRouter = ContactRouter(contactController);

    return {
        contactService,
        contactRepository,
        contactController,
        contactRouter,
    };
};
