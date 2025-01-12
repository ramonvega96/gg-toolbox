import { Resource } from '../db/util/types/Resource';
import * as vr from '../db/util/validateResources';

describe('validateResourceId', () => {
    it('should throw an error when resourceId is undefined', () => {
        expect(() => vr.validateResourceId(undefined)).toThrow(
            'resourceId was not provided.'
        );
    });

    it('should throw an error when resourceId is not a number', () => {
        expect(() => vr.validateResourceId('abc')).toThrow(
            "resourceId 'abc' is not a valid number."
        );
    });

    it('should not throw an error when resourceId is a number', () => {
        expect(() => vr.validateResourceId('123')).not.toThrow();
    });

    it('should return a resourceId value properly', () => {
        expect(vr.validateResourceId('123')).toBe(123);
    });
});

describe('validateResourceTitle', () => {
    it('should throw an error when resourceTitle is undefined', () => {
        expect(() => vr.validateResourceTitle(undefined)).toThrow(
            'resourceTitle was not provided.'
        );
    });

    it('should not throw an error when resourceTitle is provided', () => {
        expect(() => vr.validateResourceTitle('abc')).not.toThrow();
    });

    it('should return a resourceTitle value properly', () => {
        expect(vr.validateResourceTitle('abc')).toBe('abc');
    });
});

describe('validateResourceLink', () => {
    it('should throw an error when resourceLink is undefined', () => {
        expect(() => vr.validateResourceLink(undefined)).toThrow(
            'resourceLink was not provided.'
        );
    });

    it('should throw an error when resourceLink URL is not valid', () => {
        expect(() => vr.validateResourceLink('abc')).toThrow(
            'resourceLink is not a valid URL.'
        );
    });

    it('should not throw an error when resourceLink URL is valid', () => {
        expect(() =>
            vr.validateResourceLink('https://example.com')
        ).not.toThrow();
    });

    it('should return a resourceLink value properly', () => {
        expect(vr.validateResourceLink('https://example.com')).toBe(
            'https://example.com'
        );
    });
});

describe('validateSuite', () => {
    it('should throw an error when suite is undefined', () => {
        expect(() => vr.validateSuite(undefined)).toThrow(
            'suite was not provided.'
        );
    });

    it('should not throw an error when suite is provided', () => {
        expect(() => vr.validateSuite('abc')).not.toThrow();
    });

    it('should return a suite value properly', () => {
        expect(vr.validateSuite('abc')).toBe('abc');
    });
});

describe('validateSuiteLink', () => {
    it('should throw an error when suiteLink is undefined', () => {
        expect(() => vr.validateSuiteLink(undefined)).toThrow(
            'suiteLink was not provided.'
        );
    });

    it('should throw an error when suiteLink URL is not valid', () => {
        expect(() => vr.validateSuiteLink('abc')).toThrow(
            'suiteLink is not a valid URL.'
        );
    });

    it('should not throw an error when suiteLink URL is valid', () => {
        expect(() => vr.validateSuiteLink('https://example.com')).not.toThrow();
    });

    it('should return a suiteLink value properly', () => {
        expect(vr.validateSuiteLink('https://example.com')).toBe(
            'https://example.com'
        );
    });
});

describe('validatePublisher', () => {
    it('should throw an error when publisher is undefined', () => {
        expect(() => vr.validatePublisher(undefined)).toThrow(
            'publisher was not provided.'
        );
    });

    it('should not throw an error when publisher is provided', () => {
        expect(() => vr.validatePublisher('abc')).not.toThrow();
    });

    it('should return a publisher value properly', () => {
        expect(vr.validatePublisher('abc')).toBe('abc');
    });
});

describe('validatePublisherLogo', () => {
    it('should throw an error when publisherLogo is undefined', () => {
        expect(() => vr.validatePublisherLogo(undefined)).toThrow(
            'publisherLogo was not provided.'
        );
    });

    it('should throw an error when publisherLogo URL is not valid', () => {
        expect(() => vr.validatePublisherLogo('abc')).toThrow(
            'publisherLogo is not a valid URL.'
        );
    });

    it('should throw an error when publisherLogo URL is valid but not in manta', () => {
        expect(() => vr.validatePublisherLogo('https://example.com')).toThrow(
            'publisherLogo is not in Manta.'
        );
    });

    it('should not throw an error when publisherLogo URL is valid', () => {
        expect(() =>
            vr.validatePublisherLogo(
                'https://stluc.manta.uqcloud.net/elipse/public/gogrow/publisherIcons/NAQ_png.png'
            )
        ).not.toThrow();
    });

    it('should return a publisherLogo value properly', () => {
        expect(
            vr.validatePublisherLogo(
                'https://stluc.manta.uqcloud.net/elipse/public/gogrow/publisherIcons/NAQ_png.png'
            )
        ).toBe(
            'https://stluc.manta.uqcloud.net/elipse/public/gogrow/publisherIcons/NAQ_png.png'
        );
    });
});

describe('validatePublicationDate', () => {
    it('should return a publicationDate value properly', () => {
        expect(vr.validatePublicationDate(undefined)).toBe(0);
    });

    it('should throw an error when publicationDate is not valid', () => {
        expect(() => vr.validatePublicationDate('abc')).toThrow(
            "publicationDate 'abc' is not a valid number."
        );
    });

    it('should not throw an error when publicationDate is provided', () => {
        expect(() => vr.validatePublicationDate('2015')).not.toThrow();
    });

    it('should return a publicationDate value properly', () => {
        expect(vr.validatePublicationDate('2015')).toBe(2015);
    });
});

describe('validateResourceType', () => {
    it('should throw an error when resourceType is undefined', () => {
        expect(() => vr.validateResourceType(undefined)).toThrow(
            'resourceType was not provided.'
        );
    });

    it('should not throw an error when resourceType is provided', () => {
        expect(() => vr.validateResourceType('abc')).not.toThrow();
    });

    it('should return a resourceType value properly', () => {
        expect(vr.validateResourceType('abc')).toBe('abc');
    });
});

describe('validateResourceDescription', () => {
    it('should throw an error when resourceDescription is undefined', () => {
        expect(() => vr.validateResourceDescription(undefined)).toThrow(
            'resourceDescription was not provided.'
        );
    });

    it('should not throw an error when resourceDescription is provided', () => {
        expect(() => vr.validateResourceDescription('abc')).not.toThrow();
    });

    it('should return a resourceDescription value properly', () => {
        expect(vr.validateResourceDescription('abc')).toBe('abc');
    });
});

describe('validateCategory', () => {
    it('should throw an error when category is undefined', () => {
        expect(() => vr.validateCategory(undefined)).toThrow(
            'category was not provided.'
        );
    });

    it('should not throw an error when category is provided', () => {
        expect(() => vr.validateCategory('abc')).not.toThrow();
    });

    it('should return a category value properly', () => {
        expect(vr.validateCategory('abc')).toBe('abc');
    });
});

describe('validateSubcategory', () => {
    it('should return a subcategory value properly', () => {
        expect(vr.validateSubcategory(undefined)).toBe('');
    });

    it('should return a subcategory value properly', () => {
        expect(vr.validateSubcategory('abc')).toBe('abc');
    });
});

describe('validateAudience', () => {
    it('should throw an error when audience is undefined', () => {
        expect(() => vr.validateAudience(undefined)).toThrow(
            'audience was not provided.'
        );
    });

    it('should not throw an error when audience is provided', () => {
        expect(() => vr.validateAudience('abc')).not.toThrow();
    });

    it('should return a audience value properly', () => {
        expect(vr.validateAudience('abc')).toBe('abc');
    });
});

describe('validateAgeGroup', () => {
    it('should throw an error when ageGroup is undefined', () => {
        expect(() => vr.validateAgeGroup(undefined)).toThrow(
            'ageGroup was not provided.'
        );
    });

    it('should not throw an error when ageGroup is provided', () => {
        expect(() => vr.validateAgeGroup('abc')).not.toThrow();
    });

    it('should return a ageGroup value properly', () => {
        expect(vr.validateAgeGroup('abc')).toBe('abc');
    });
});

describe('validateTranslatedId', () => {
    it('should return a translatedId value properly', () => {
        expect(vr.validateTranslatedId(undefined)).toBe(0);
    });

    it('should throw an error when translatedId is not valid', () => {
        expect(() => vr.validateTranslatedId('abc')).toThrow(
            "translatedId 'abc' is not a valid number."
        );
    });

    it('should not throw an error when translatedId is provided', () => {
        expect(() => vr.validateTranslatedId('10')).not.toThrow();
    });

    it('should return a translatedId value properly', () => {
        expect(vr.validateTranslatedId('10')).toBe(10);
    });
});

describe('validateTranslatedSubid', () => {
    it('should return a translatedSubid value properly', () => {
        expect(vr.validateTranslatedSubid(undefined, undefined)).toBe('0');
    });

    it('should return a translatedSubid value properly', () => {
        expect(vr.validateTranslatedSubid('0', undefined)).toBe('0');
    });

    it('should return a translatedSubid value properly', () => {
        expect(vr.validateTranslatedSubid('10', '10')).toBe('10');
    });

    it('should return a translatedSubid value properly', () => {
        expect(vr.validateTranslatedSubid('10', '10-001')).toBe('10-001');
    });

    it('should throw an error when translatedSubid is provided and translatedSubid is missing', () => {
        expect(() => vr.validateTranslatedSubid('10', undefined)).toThrow(
            'translatedSubid was not provided.'
        );
    });

    it('should throw an error when translatedSubid first part is not valid', () => {
        expect(() => vr.validateTranslatedSubid('10', 'ab-01')).toThrow(
            "translatedSubid format error: 'ab-01' first part ('ab') is not a valid number."
        );
    });

    it('should throw an error when translatedSubid first part is not valid', () => {
        expect(() => vr.validateTranslatedSubid('10', 'abc')).toThrow(
            "translatedSubid format error: 'abc' first part ('abc') is not a valid number."
        );
    });

    it('should throw an error when translatedSubid second part is not valid', () => {
        expect(() => vr.validateTranslatedSubid('10', '10-ab')).toThrow(
            "translatedSubid format error: '10-ab' second part ('ab') is not a valid number."
        );
    });

    it('should throw an error when translatedSubid first part does not match translatedId', () => {
        expect(() => vr.validateTranslatedSubid('10', '11-001')).toThrow(
            "translatedSubid format error - first part ('11') should match translatedId ('10')."
        );
    });
});

describe('validateLanguage', () => {
    it('should throw an error when language is undefined', () => {
        expect(() => vr.validateLanguage(undefined)).toThrow(
            'language was not provided.'
        );
    });

    it('should not throw an error when language is provided', () => {
        expect(() => vr.validateLanguage('abc')).not.toThrow();
    });

    it('should return a language value properly', () => {
        expect(vr.validateLanguage('abc')).toBe('abc');
    });
});

describe('validateLanguageDisplay', () => {
    it('should throw an error when languageDisplay is undefined', () => {
        expect(() => vr.validateLanguageDisplay(undefined)).toThrow(
            'languageDisplay was not provided.'
        );
    });

    it('should not throw an error when languageDisplay is provided', () => {
        expect(() => vr.validateLanguageDisplay('abc')).not.toThrow();
    });

    it('should return a languageDisplay value properly', () => {
        expect(vr.validateLanguageDisplay('abc')).toBe('abc');
    });
});

describe('validateCulture', () => {
    it('should not throw an error when culture is not provided', () => {
        expect(() => vr.validateCulture(undefined)).not.toThrow();
    });

    it('should return a languageDisplay value properly', () => {
        expect(vr.validateCulture(undefined)).toBe('');
    });

    it('should return a languageDisplay value properly', () => {
        expect(vr.validateCulture('')).toBe('');
    });

    it('should return a languageDisplay value properly', () => {
        expect(vr.validateCulture('abc')).toBe('abc');
    });
});

describe('validateOriginal', () => {
    it('should return a original value properly when original', () => {
        expect(vr.validateOriginal(undefined, undefined)).toBe(true);
    });

    it('should return a original value properly when original', () => {
        expect(vr.validateOriginal('0', undefined)).toBe(true);
    });

    it('should return a original value properly when original', () => {
        expect(vr.validateOriginal('10', '10')).toBe(true);
    });

    it('should return a original value properly when not original', () => {
        expect(vr.validateOriginal('10', '10-001')).toBe(false);
    });
});

describe('validateHidden', () => {
    it('should return a hidden value properly when hidden', () => {
        expect(vr.validateHidden('TRUE')).toBe(true);
    });

    it('should return a hidden value properly when hidden', () => {
        expect(vr.validateHidden('true')).toBe(true);
    });

    it('should return a hidden value properly when not hidden', () => {
        expect(vr.validateHidden('')).toBe(false);
    });

    it('should return a hidden value properly when not hidden', () => {
        expect(vr.validateHidden('FALSE')).toBe(false);
    });

    it('should return a hidden value properly when not hidden', () => {
        expect(vr.validateHidden(undefined)).toBe(false);
    });
});

describe('validateState', () => {
    it('should return a valid state when state is valid', () => {
        const validStates = [
            'nt',
            'wa',
            'qld',
            'sa',
            'nsw',
            'act',
            'vic',
            'tas',
            'national',
        ];
        for (const state of validStates) {
            expect(vr.validateState(state)).toBe(state);
            expect(vr.validateState(state.toUpperCase())).toBe(state);
        }
    });

    it('should return a valid state when no state is provided', () => {
        expect(vr.validateState(undefined)).toBe('');
    });
});

describe('validateTags', () => {
    it('should return a tags value properly when not provided', () => {
        expect(vr.validateTags(undefined).toString()).toBe('');
    });

    it('should return a tags value properly when not provided', () => {
        expect(vr.validateTags('').toString()).toBe('');
    });

    it('should return a tags value properly when provided', () => {
        expect(vr.validateTags('tag1 tag2').toString()).toBe('tag1 tag2');
    });

    it('should return a tags value properly when provided', () => {
        expect(vr.validateTags('tag1, tag2').toString()).toBe('tag1,tag2');
    });

    it('should return a tags value properly when provided', () => {
        expect(vr.validateTags('  tag1,  tag2 ').toString()).toBe('tag1,tag2');
    });

    it('should return a tags value properly when provided', () => {
        expect(vr.validateTags('  TaG1,  taG2 ').toString()).toBe('tag1,tag2');
    });
});

describe('validateUserScore', () => {
    it('should return zero when no score is provided', () => {
        expect(vr.validateScore(undefined, 'userScore')).toBe(0);
    });

    it('should return number when a number is provided', () => {
        expect(vr.validateScore('10', 'userScore')).toBe(10);
    });

    it('should throw error when userScore is not a number', () => {
        expect(() => vr.validateScore('abc', 'userScore')).toThrow(
            'userScore parsed value must be a number.'
        );
    });
});

describe('validateUniqueResourceIds', () => {
    let mockData = [{ resourceId: 10 }, { resourceId: 10 }] as Resource[];

    it('should throw error when resources have duplicated resourceId', () => {
        expect(() => vr.validateUniqueResourceIds(mockData)).toThrow(
            'Duplicated resourceId: 10'
        );
    });

    it('should not throw an error when resources have non-duplicated resourceId', () => {
        mockData = [{ resourceId: 10 }, { resourceId: 11 }] as Resource[];
        expect(() => vr.validateUniqueResourceIds(mockData)).not.toThrow();
    });
});

describe('validateUniqueVersions', () => {
    let mockData = [
        { resourceId: 10, translatedId: 1, translatedSubid: '1' },
        { resourceId: 11, translatedId: 1, translatedSubid: '1' },
    ] as Resource[];

    it('should throw error when resources have duplicated translated versions', () => {
        expect(() => vr.validateUniqueVersions(mockData)).toThrow(
            'Duplicated original or translated version resourceId: 11'
        );
    });

    it('should not throw an error when resources have non-duplicated versions', () => {
        mockData = [
            { resourceId: 10, translatedId: 0, translatedSubid: '0' },
            { resourceId: 11, translatedId: 0, translatedSubid: '0' },
        ] as Resource[];
        expect(() => vr.validateUniqueVersions(mockData)).not.toThrow();
    });

    it('should not throw an error when resources have non-duplicated versions', () => {
        mockData = [
            { resourceId: 10, translatedId: 1, translatedSubid: '01-001' },
            { resourceId: 11, translatedId: 1, translatedSubid: '01-002' },
        ] as Resource[];
        expect(() => vr.validateUniqueVersions(mockData)).not.toThrow();
    });
});

describe('validateTranslatedSubidsCorrectness', () => {
    let mockData = [
        { resourceId: 10, translatedId: 1, translatedSubid: '01-001' },
        { resourceId: 11, translatedId: 1, translatedSubid: '01-001' },
    ] as Resource[];

    it('should throw error when resources have duplicated translatedSubid', () => {
        expect(() => vr.validateTranslatedSubidsCorrectness(mockData)).toThrow(
            'Resource 11 - Duplicated translatedSubid: 01-001'
        );
    });

    it('should throw error when resources have translatedSubid as 0 but translatedId is not 0', () => {
        mockData = [
            { resourceId: 10, translatedId: 1, translatedSubid: '0' },
        ] as Resource[];
        expect(() => vr.validateTranslatedSubidsCorrectness(mockData)).toThrow(
            'Resource 10 - translatedSubid should only be 0 when translatedId is 0: 0'
        );
    });

    it('should have translatedSubid as 0 when translatedId is 0', () => {
        mockData = [
            { resourceId: 10, translatedId: 0, translatedSubid: '01-001' },
        ] as Resource[];
        expect(() => vr.validateTranslatedSubidsCorrectness(mockData)).toThrow(
            'Resource 10 - translatedSubid should be 0 when translatedId is 0: 01-001'
        );
    });

    it('should not throw an error when resources have non-duplicated translatedSubid, translatedId is not 0 and translatedSubid is not 0', () => {
        mockData = [
            { resourceId: 9, translatedId: 0, translatedSubid: '0' },
            { resourceId: 10, translatedId: 1, translatedSubid: '01-001' },
            { resourceId: 11, translatedId: 1, translatedSubid: '01-002' },
        ] as Resource[];
        expect(() =>
            vr.validateTranslatedSubidsCorrectness(mockData)
        ).not.toThrow();
    });
});

describe('validateTranslatedVersionsExist', () => {
    let mockData = [
        {
            resourceId: 10,
            translatedId: 1,
            translatedSubid: '1',
            original: true,
        },
    ] as Resource[];

    it('should throw error when translated and no translation is found', () => {
        expect(() => vr.validateTranslatedVersionsExist(mockData)).toThrow(
            'No translated versions found for resourceId 10'
        );
    });

    it('should not throw error when translated and translation is found', () => {
        mockData = [
            {
                resourceId: 10,
                translatedId: 1,
                translatedSubid: '1',
                original: true,
            },
            {
                resourceId: 11,
                translatedId: 1,
                translatedSubid: '01-001',
                original: false,
            },
        ] as Resource[];
        expect(() =>
            vr.validateTranslatedVersionsExist(mockData)
        ).not.toThrow();
    });
});

describe('validateOriginalVersionExists', () => {
    let mockData = [
        {
            resourceId: 10,
            translatedId: 1,
            translatedSubid: '01-001',
            original: false,
        },
    ] as Resource[];

    it('should throw error when translated and no original is found', () => {
        expect(() => vr.validateOriginalVersionExists(mockData)).toThrow(
            'No original version found for resourceId 10'
        );
    });

    it('should not throw error when translated and original is found', () => {
        mockData = [
            {
                resourceId: 10,
                translatedId: 1,
                translatedSubid: '1',
                original: true,
            },
            {
                resourceId: 11,
                translatedId: 1,
                translatedSubid: '01-001',
                original: false,
            },
        ] as Resource[];
        expect(() => vr.validateOriginalVersionExists(mockData)).not.toThrow();
    });
});
