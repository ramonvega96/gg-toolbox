import {
    ILink,
    HospitalPublicServices,
    PublicServicesByState,
} from './types/FHP';
import { validateURLFormat } from './validateLinks';

/**
 * This function creates a public services array for the certain job professions
 * (speech pathlogist, occupational therapist, dietitian, physiotherapist)
 * Other jobs will have a description
 * @param publicServicesArray an array to push ProfessionsListInterface objects
 * into
 * @param hospitalData a single row of the public service data
 */
export const convertPublicServiceDocs = async (
    publicServicesArray: PublicServicesByState,
    hospitalData: HospitalPublicServices,
    errorLog: string
) => {
    const urlFormatOk = async (url: string) => {
        const validUrl = url
            ? await validateURLFormat(errorLog, hospitalData, url)
            : false;
        return validUrl;
    };

    await urlFormatOk(hospitalData.genericLink);

    // Define a data structure for storing service names and corresponding links
    interface ServiceLink {
        name: string;
        linkKey: string;
    }

    const serviceLinks: ServiceLink[] = [
        { name: 'dietitian', linkKey: 'dietitianLink' },
        { name: 'speechPathologist', linkKey: 'spLink' },
        { name: 'occupationalTherapist', linkKey: 'otLink' },
        { name: 'mentalHealth', linkKey: 'mhLink' },
        { name: 'physiotherapist', linkKey: 'physiotherapistLink' },
        { name: 'socialWorker', linkKey: 'swLink' },
        { name: 'lactationConsultant', linkKey: 'lcLink' },
    ];

    // Define a function to create the service object to be pushed to the publicServicesArray
    const createServiceObject = async (serviceLink: ServiceLink) => {
        const validUrl = await urlFormatOk(
            hospitalData[serviceLink.linkKey as keyof HospitalPublicServices]
        );
        return {
            linkLabel: hospitalData.hospitalName,
            link: validUrl ? validUrl : hospitalData.genericLink,
        } as ILink;
    };

    // Loop through each service and add the corresponding object to the publicServicesArray
    for (const serviceLink of serviceLinks) {
        if (
            hospitalData[serviceLink.name as keyof HospitalPublicServices] ===
            'TRUE'
        ) {
            const serviceObject = await createServiceObject(serviceLink);
            publicServicesArray[
                hospitalData.state as keyof PublicServicesByState
            ][serviceLink.name].push(serviceObject);
        }
    }
};
