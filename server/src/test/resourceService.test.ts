import {
    getAddedResources,
    getDeletedResources,
    classifyAddedResources,
    classifyDeletedResources,
    applyDataUpdate,
} from '../modules/Resource/ResourceService';
import { Resource } from '../db/util/types/Resource';
import { UpdatedResource } from '../modules/Resource/Resource';

describe('getAddedResources', () => {
    const mockExisting = [{ resourceId: 10 }, { resourceId: 11 }] as Resource[];
    let mockIncoming = [{ resourceId: 10 }, { resourceId: 11 }] as Resource[];

    it('should return empty array when no resources are added', () => {
        expect(
            JSON.stringify(getAddedResources(mockIncoming, mockExisting))
        ).toBe(JSON.stringify([]));
    });

    it('should return array containing added resources', () => {
        mockIncoming = [
            { resourceId: 10 },
            { resourceId: 11 },
            { resourceId: 12 },
        ] as Resource[];

        expect(
            JSON.stringify(getAddedResources(mockIncoming, mockExisting))
        ).toBe(JSON.stringify([{ resourceId: 12 }]));
    });

    it('should return array containing added resources', () => {
        mockIncoming = [
            { resourceId: 10 },
            { resourceId: 11 },
            { resourceId: 12 },
            { resourceId: 13 },
        ] as Resource[];

        expect(
            JSON.stringify(getAddedResources(mockIncoming, mockExisting))
        ).toBe(JSON.stringify([{ resourceId: 12 }, { resourceId: 13 }]));
    });
});

describe('getDeletedResources', () => {
    const mockExisting = [{ resourceId: 10 }, { resourceId: 11 }] as Resource[];
    let mockIncoming = [{ resourceId: 10 }, { resourceId: 11 }] as Resource[];

    it('should return empty array when no resources are deleted', () => {
        expect(
            JSON.stringify(getDeletedResources(mockIncoming, mockExisting))
        ).toBe(JSON.stringify([]));
    });

    it('should return array containing deleted resources', () => {
        mockIncoming = [{ resourceId: 10 }] as Resource[];

        expect(
            JSON.stringify(getDeletedResources(mockIncoming, mockExisting))
        ).toBe(JSON.stringify([{ resourceId: 11 }]));
    });

    it('should return array containing deleted resources', () => {
        mockIncoming = [] as Resource[];

        expect(
            JSON.stringify(getDeletedResources(mockIncoming, mockExisting))
        ).toBe(JSON.stringify([{ resourceId: 10 }, { resourceId: 11 }]));
    });
});

describe('classifyAddedResources', () => {
    let mockIncoming = [] as Resource[];
    let mockAdded = [] as Resource[];

    it('should identify newly added original resources', () => {
        mockAdded = [{ original: true }] as Resource[];
        expect(
            JSON.stringify(classifyAddedResources(mockAdded, mockIncoming))
        ).toBe(
            JSON.stringify([
                {
                    original: true,
                    case: {
                        caseOverview: 'Add resource',
                        caseDetail:
                            'The following original resource will be added.',
                        caseId: 'a',
                    },
                },
            ])
        );
    });

    it('should identify newly added translated version of an original being added along', () => {
        mockAdded = [
            { original: false, translatedSubid: '01-001', translatedId: 1 },
            { original: true, translatedSubid: '1', translatedId: 1 },
        ] as Resource[];
        expect(
            JSON.stringify(classifyAddedResources(mockAdded, mockIncoming))
        ).toBe(
            JSON.stringify([
                {
                    original: true,
                    translatedSubid: '1',
                    translatedId: 1,
                    case: {
                        caseOverview: 'Add resource',
                        caseDetail:
                            'The following original resource will be added.',
                        caseId: 'a',
                    },
                },
                {
                    original: false,
                    translatedSubid: '01-001',
                    translatedId: 1,
                    case: {
                        caseOverview: 'Add resource',
                        caseDetail:
                            'The following translated version of an original resource being added along, will be added.',
                        caseId: 'b',
                    },
                },
            ])
        );
    });

    it('should identify newly added translated version of an existing original', () => {
        mockIncoming = [
            { original: true, translatedSubid: '1', translatedId: 1 },
        ] as Resource[];
        mockAdded = [
            { original: false, translatedSubid: '01-001', translatedId: 1 },
        ] as Resource[];
        expect(
            JSON.stringify(classifyAddedResources(mockAdded, mockIncoming))
        ).toBe(
            JSON.stringify([
                {
                    original: false,
                    translatedSubid: '01-001',
                    translatedId: 1,
                    case: {
                        caseOverview: 'Add resource',
                        caseDetail:
                            'The following translated version of an existing original resource, will be added.',
                        caseId: 'c',
                    },
                },
            ])
        );
    });
});

describe('classifyDeletedResources', () => {
    let mockDeteleted = [] as Resource[];

    it('should identify translated version deletion', () => {
        mockDeteleted = [{ original: false }] as Resource[];
        expect(JSON.stringify(classifyDeletedResources(mockDeteleted))).toBe(
            JSON.stringify([
                {
                    original: false,
                    case: {
                        caseOverview: 'Delete resource',
                        caseDetail:
                            'The following translated version of an original resource, will be deleted.',
                        caseId: 'd',
                    },
                },
            ])
        );
    });

    it('should identify original version deletion', () => {
        mockDeteleted = [{ original: true }] as Resource[];
        expect(JSON.stringify(classifyDeletedResources(mockDeteleted))).toBe(
            JSON.stringify([
                {
                    original: true,
                    case: {
                        caseOverview: 'Delete resource',
                        caseDetail:
                            'The following original resource will be deleted.',
                        caseId: 'e',
                    },
                },
            ])
        );
    });
});

describe('applyDataUpdate', () => {
    const existingResources = [
        { resourceId: 10 },
        { resourceId: 11 },
        { resourceId: 12 },
    ] as Resource[];

    const addedResources = [
        {
            resourceId: 13,
            case: {
                caseId: 'a',
            },
        },
        {
            resourceId: 14,
            case: {
                caseId: 'b',
            },
        },
        {
            resourceId: 15,
            case: {
                caseId: 'c',
            },
        },
    ] as UpdatedResource[];

    const deletedResources = [
        {
            resourceId: 10,
            case: {
                caseId: 'd',
            },
        },
        {
            resourceId: 11,
            case: {
                caseId: 'e',
            },
        },
    ] as UpdatedResource[];

    it('should add newly added resources', () => {
        expect(
            JSON.stringify(applyDataUpdate(existingResources, addedResources))
        ).toBe(
            JSON.stringify([
                { resourceId: 10 },
                { resourceId: 11 },
                { resourceId: 12 },
                {
                    resourceId: 13,
                    case: {
                        caseId: 'a',
                    },
                },
                {
                    resourceId: 14,
                    case: {
                        caseId: 'b',
                    },
                },
                {
                    resourceId: 15,
                    case: {
                        caseId: 'c',
                    },
                },
            ])
        );
    });

    it('should add delete removed resources', () => {
        expect(
            JSON.stringify(applyDataUpdate(existingResources, deletedResources))
        ).toBe(JSON.stringify([{ resourceId: 12 }]));
    });
});
