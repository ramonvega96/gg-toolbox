import { ILink } from './Modals';

export interface HealthProfessional {
    profession: string;
    description: string;
    state: string;
    publicService?: Service;
    privateService?: string;
    communityService?: Service;
    tags: string[];
}

export interface Service {
    description?: string;
    links?: ILink[];
}
