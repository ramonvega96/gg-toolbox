import {
    Resource,
    UpdatedResource,
} from '../components/resourceCard/types/Resource';

export interface SearchBarFilters {
    resourceTypes: string[];
    ageGroups: string[];
    languages: string[];
    categories: string[];
    subcategories: string[];
    audiences: string[];
    cultures: string[];
}

export type SearchBarFilterFields =
    | 'resourceTypes'
    | 'ageGroups'
    | 'languages'
    | 'categories'
    | 'subcategories'
    | 'audiences'
    | 'cultures';

export interface SortingCriteria {
    resourceTitle?: number;
    publicationDate?: number;
    score?: number;
}

export interface IContactForm {
    firstName: string;
    lastName: string;
    emailAddress: string;
    subject: string;
    message: string;
}

export interface IShareResourceForm {
    firstName: string;
    lastName: string;
    emailAddress: string;
    resourceTitle: string;
    resource: string | File | undefined;
}

export interface IUserLoginForm {
    username: string;
    password: string;
    project: string;
}

export interface ApiResponse {
    success: boolean;
    payload: unknown;
    message: string;
}

export interface LRSTBAnalitycsObj {
    user: string;
    sessionId: string;
    location: string;
    duration: number;
    date: string;
    time: string;
}

export async function getResourcesByTag(
    tags: string[],
    page: number,
    sortingCriteria: SortingCriteria,
    searchBarFilters?: SearchBarFilters,
    limit?: number
) {
    try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/resource/`, {
            method: 'POST',
            body: JSON.stringify({
                tags: tags,
                page: page,
                filters: searchBarFilters,
                sortingCriteria: sortingCriteria,
                pageLimit: limit,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resJSON = await res.json();

        if (resJSON.success) {
            return resJSON;
        }
        throw new Error(
            'Error retreiving resources by tag from ' +
                `${process.env.REACT_APP_BASE_URL}/resources`
        );
    } catch (e) {
        console.error(e);
    }
}

/**
 * This returns all resource tags
 * @returns a list of all resource tags
 */
export async function getResourcesTags() {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/tags`,
            {
                method: 'GET',
            }
        );
        const resJSON = await res.json();

        if (resJSON.success) {
            return resJSON;
        }
        throw new Error(
            'Error retrieving resource tags from ' +
                `${process.env.REACT_APP_BASE_URL}/resource/tags`
        );
    } catch (e) {
        console.error(e);
    }
}

export async function getGGTResources() {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/ggtResources`,
            {
                method: 'GET',
            }
        );
        const resJSON = await res.json();

        if (resJSON.success) {
            return resJSON;
        }

        throw new Error(
            'Error retrieving GGT resources from ' +
                `${process.env.REACT_APP_BASE_URL}/resource/ggtResources`
        );
    } catch (e) {
        console.error(e);
    }
}

/**
 * @returns all unique values in specified filter
 */
export async function getFilterValues(filter: string) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/uniqueFilterValues?filter=${filter}`,
            {
                method: 'GET',
            }
        );
        const resJSON = await res.json();

        if (!resJSON.success) {
            throw new Error(
                'Error retrieving filter unique values from ' +
                    `${process.env.REACT_APP_BASE_URL}/resource/?filter=${filter}`
            );
        }

        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

/**
 * This returns updated filters according to search
 * @returns a list of updated filters
 */
export async function getUpdatedFilters(
    tags: string,
    filtersAll: SearchBarFilters,
    fuzzySearch: boolean
) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/updatedFilters`,
            {
                method: 'POST',
                body: JSON.stringify({
                    tags,
                    filtersAll,
                    fuzzySearch,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const resJSON = await res.json();

        if (resJSON.success) {
            return resJSON;
        }
        throw new Error(
            'Error retrieving updated filters from ' +
                `${process.env.REACT_APP_BASE_URL}/resources/updatedFilters`
        );
    } catch (e) {
        console.error(e);
    }
}

export async function getHealthProfessionalByTag(state: string, tag: string) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/healthProfession/tag`,
            {
                method: 'POST',
                body: JSON.stringify({
                    state: state,
                    tag: tag,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const resJSON = await res.json();

        if (!resJSON.success) {
            throw new Error(
                'Error retrieving professionals by tag from ' +
                    `${process.env.REACT_APP_BASE_URL}/healthProfession/tag`
            );
        }

        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function getHealthProfessionalInfoByState(
    state: string,
    profession: string
) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/healthProfession/state`,
            {
                method: 'POST',
                body: JSON.stringify({
                    state: state,
                    profession: profession,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const resJSON = await res.json();

        if (!resJSON.success) {
            throw new Error(
                'Error retrieving professionals info by state from ' +
                    `${process.env.REACT_APP_BASE_URL}/healthProfession/state`
            );
        }
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function createQueryRecord(
    input: string,
    tags: string[],
    page: number,
    sortingCriteria: SortingCriteria,
    resourceCount: number,
    searchBarFilters?: SearchBarFilters
) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/analytics/`,
            {
                method: 'POST',
                body: JSON.stringify({
                    input: input,
                    tags: tags,
                    page: page,
                    sortingCriteria: sortingCriteria,
                    filters: searchBarFilters,
                    resourceCount: resourceCount,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const resJSON = await res.json();

        if (resJSON.success) {
            return resJSON;
        }
        throw new Error(
            'Error creating analytics query record with ' +
                `${process.env.REACT_APP_BASE_URL}/analytics`
        );
    } catch (e) {
        console.error(e);
    }
}

/**
 * Runs a fuzzy search based on the terms provided
 * @param terms search terms
 * @param page page number
 * @param sortingCriteria
 * @param filter
 * @param limit limit of results per page
 * @returns a list of resources based on the search terms
 */
export async function getResourcesByFuzzySearch(
    terms: string,
    page: number,
    sortingCriteria: SortingCriteria,
    filters?: SearchBarFilters,
    limit?: number,
    fetchHidden?: boolean,
    state?: string
) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/searchbarQuery`,
            {
                method: 'POST',
                body: JSON.stringify({
                    terms,
                    page,
                    limit,
                    filters,
                    sortingCriteria,
                    fetchHidden,
                    state,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const resJSON = await res.json();

        if (resJSON.success) {
            const tagDocuments: Resource[] = resJSON.payload.resources;
            createQueryRecord(
                terms,
                !resJSON.payload.queryMatch
                    ? []
                    : (Array.from(
                          new Set(
                              tagDocuments.flatMap((resource) => resource.tags)
                          )
                      ) as string[]),
                page,
                sortingCriteria,
                !resJSON.payload.queryMatch ? 0 : resJSON.payload.totalCount,
                filters
            );

            return resJSON;
        }
        throw new Error(
            'Error retrieving resources from ' +
                `${process.env.REACT_APP_BASE_URL}/resource/searchbarQuery`
        );
    } catch (e) {
        console.error(e);
    }
}

export async function submitContactForm(contactForm: IContactForm) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/contact/contactUs`,
            {
                method: 'POST',
                body: JSON.stringify(contactForm),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const resJSON = await res.json();

        if (resJSON.success) {
            return resJSON;
        }
        throw new Error(
            'Error while sending message with ' +
                `${process.env.REACT_APP_BASE_URL}/contact/contactUs`
        );
    } catch (e) {
        console.error(e);
    }
}

export async function submitResourceForm(resourceForm: IShareResourceForm) {
    try {
        const endpointURL = `${process.env.REACT_APP_BASE_URL}/contact/submitResource`;

        if (resourceForm.resource) {
            const formData = new FormData();
            formData.append('firstName', resourceForm.firstName);
            formData.append('lastName', resourceForm.lastName);
            formData.append('emailAddress', resourceForm.emailAddress);
            formData.append('resourceTitle', resourceForm.resourceTitle);
            formData.append('resource', resourceForm.resource);

            const res = await fetch(endpointURL, {
                method: 'POST',
                body: formData,
            });
            const resJSON = await res.json();

            if (resJSON.success) {
                return resJSON;
            }
            throw new Error(
                'Error while submitting resource with ' + endpointURL
            );
        }
    } catch (e) {
        console.error(e);
    }
}

export async function submitLoginForm(loginForm: IUserLoginForm) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/user/login`,
            {
                method: 'POST',
                body: JSON.stringify(loginForm),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const resJSON = await res.json();
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function verifyUserCookie(project: string) {
    try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
            method: 'POST',
            body: JSON.stringify({ project }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resJSON = await res.json();
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function exportResourcesData() {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/export`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const blobUrl = URL.createObjectURL(await res.blob());

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'resources_data.csv';

        // Programmatically trigger the click event
        link.dispatchEvent(new MouseEvent('click'));

        // Cleanup: remove the link and revoke the blob URL
        link.parentNode?.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error(e);
    }
}

export async function runGGAnalitycs() {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/analytics/runGG`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const resJSON = await res.json();
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function getBrokenLinksReport() {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/brokenLinksReport`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!res.ok) {
            const resJSON = await res.json();
            return resJSON;
        }

        const blobUrl = URL.createObjectURL(await res.blob());

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'resources_links_logs.csv';

        // Programmatically trigger the click event
        link.dispatchEvent(new MouseEvent('click'));

        // Cleanup: remove the link and revoke the blob URL
        link.parentNode?.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error(e);
    }
}

export async function findBrokenLinks() {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/runBrokenLinksFinder`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const resJSON = await res.json();
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function submitResourcesUpdate(resourceFile: File) {
    try {
        const endpointURL = `${process.env.REACT_APP_BASE_URL}/resource/updateResources`;

        if (resourceFile) {
            const formData = new FormData();
            formData.append('resourcesData', resourceFile);

            const res = await fetch(endpointURL, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const resJSON = await res.json();

            return resJSON;
        }
    } catch (e) {
        console.error(e);
    }
}

export async function confirmResourcesUpdate(
    incomingResources: UpdatedResource[]
) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/resource/confirmResourcesUpdate`,
            {
                method: 'POST',
                body: JSON.stringify({ resources: incomingResources }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const resJSON = await res.json();
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function updateResourceUserScore(
    resourceId: number,
    caseNum: number
) {
    try {
        const endpointURL = `${process.env.REACT_APP_BASE_URL}/resource/userScore`;
        const res = await fetch(endpointURL, {
            method: 'POST',
            body: JSON.stringify({ resourceId, caseNum }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resJSON = await res.json();
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function updatePageUserScore(pageId: string, caseNum: number) {
    try {
        const endpointURL = `${process.env.REACT_APP_BASE_URL}/analytics/pageScore`;
        const res = await fetch(endpointURL, {
            method: 'POST',
            body: JSON.stringify({ pageId, caseNum }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resJSON = await res.json();
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function createLRSTinyBitesRecord(
    analitycsObj: LRSTBAnalitycsObj
) {
    try {
        const endpointURL = `${process.env.REACT_APP_BASE_URL}/analytics/lrsTbAnalitycs`;
        const res = await fetch(endpointURL, {
            method: 'POST',
            body: JSON.stringify(analitycsObj),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resJSON = await res.json();
        return resJSON;
    } catch (e) {
        console.error(e);
    }
}

export async function exportTBAnalitycs() {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/analytics/exportTB`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const blobUrl = URL.createObjectURL(await res.blob());

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'analitycs_data_tb.csv';

        // Programmatically trigger the click event
        link.dispatchEvent(new MouseEvent('click'));

        // Cleanup: remove the link and revoke the blob URL
        link.parentNode?.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error(e);
    }
}
