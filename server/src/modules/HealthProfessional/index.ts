import { Db } from 'mongodb';
import HealthProfessionalController, {
    IHealthProfessionController,
} from './HealthProfessionalController';
import HealthProfessionalRepository, {
    IHealthProfessionRespository,
} from './HealthProfessionalRepository';
import {
    HealthProfessionalRouter,
    IHealthProfessionRouter,
} from './HealthProfessionalRouter';
import HealthProfessionalService, {
    IHealthProfessionService,
} from './HealthProfessionalService';

export interface IHealthProfessionalModule {
    healthProfessionalRouter: IHealthProfessionRouter;
    healthProfessionalController: IHealthProfessionController;
    healthProfessionalService: IHealthProfessionService;
    healthProfessionalRepository: IHealthProfessionRespository;
}

export const HealthProfessionalModule = (db: Db): IHealthProfessionalModule => {
    const healthProfessionCollection = db.collection('healthProfessions');

    const healthProfessionalRepository = HealthProfessionalRepository(
        healthProfessionCollection
    );
    const healthProfessionalService = HealthProfessionalService(
        healthProfessionalRepository
    );
    const healthProfessionalController = HealthProfessionalController(
        healthProfessionalService
    );
    const healthProfessionalRouter = HealthProfessionalRouter(
        healthProfessionalController
    );

    return {
        healthProfessionalRepository,
        healthProfessionalService,
        healthProfessionalController,
        healthProfessionalRouter,
    };
};
