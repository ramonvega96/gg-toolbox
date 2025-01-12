import { Resource } from '../components/resourceCard/types/Resource';

/**
 * makeDistinctArray converts a given array to only distinct values. Removes any duplicates.
 * @param strArray an array of strings which may contain duplicate values
 * @returns the strArray with only unique values
 */
export function makeDistinctArray(strArray: string[]) {
    const distinctStrArray = Array.from(new Set(strArray));
    return distinctStrArray;
}

/**
 * This function converts the payload in a server response into an array
 * of Resource which to be used in resource card displays
 * @param payload The payload provided by the server after a fetch request
 * @returns an array of Resource
 */
/* eslint-disable */
export function convertPayloadToResourceList(payload: any[]) {
    const returnedResources: Resource[] = payload.map((resource: Resource) => {
        return { ...resource };
    });
    return returnedResources;
}
