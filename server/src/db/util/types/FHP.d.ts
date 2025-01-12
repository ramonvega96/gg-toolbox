export interface HealthProfessional {
    profession: string;
    description: string;
    state: string;
    publicService: Service;
    privateService: string;
    communityService: Service;
    tags: string[];
}

interface Service {
    description?: string;
    links?: ILink[];
}

export interface ILink {
    linkLabel: string;
    link: string;
}

/**
 * This interface is the data structure for holding public services by a
 * profession.
 * Example: {dietitian: [<Service>, <Service>], speechPathologist: [<Service>]}
 */
export interface PublicServicesOffer {
    [key: string]: ILink[];
}

/**
 * This interface refers to the data structure which holds public service
 * data by state.
 * Example: {nsw: <PublicServicesOffer>, qld: <PublicServicesOffer>}
 */
export interface PublicServicesByState {
    nsw: PublicServicesOffer;
    qld: PublicServicesOffer;
    vic: PublicServicesOffer;
    act: PublicServicesOffer;
    tas: PublicServicesOffer;
    sa: PublicServicesOffer;
    wa: PublicServicesOffer;
    nt: PublicServicesOffer;
}

export interface HospitalPublicServices {
    hospitalName: string;
    state: string;
    lactationConsultant: string;
    lcLink: string;
    dietitian: string;
    dietitianLink: string;
    speechPathologist: string;
    spLink: string;
    occupationalTherapist: string;
    otLink: string;
    mentalHealth: string;
    mhLink: string;
    physiotherapist: string;
    physiotherapistLink: string;
    socialWorker: string;
    swLink: string;
    genericLink: string;
}
