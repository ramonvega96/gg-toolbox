import { Db, Collection } from 'mongodb';
import { client } from '../../test/setupFile';
import { getCSVContents } from '../db/generateCSVContent';
import { HealthProfessional } from '../db/util/types/FHP';
import HealthProfessionalRepository, {
    IHealthProfessionRespository,
} from '../modules/HealthProfessional/HealthProfessionalRepository';
import config from '../../config.json';

/**
 * This is a mock function of getProfessionInfoByState
 * It should return a profession info based off the state and profession name
 * provided
 * @param healthProfessionCollection
 * @param state
 * @param profession
 * @returns
 */
const getProfessionInfoByStateMock = (
    state: string,
    profession: string,
    healthProfessionCollection: HealthProfessional[]
) => {
    const results = healthProfessionCollection.filter(
        (res) =>
            res.state.includes(state) && res.profession.includes(profession)
    );

    if (results.length === 0)
        return 'Cannot find specified health professional';

    const valueToRemove = 'null';

    for (const result of results) {
        if (result.description === 'null') {
            const genericDocument = healthProfessionCollection.filter(
                (res) =>
                    res.state.includes('generic') &&
                    res.profession.includes(profession)
            )[0];

            result.description = genericDocument.description;
        }
        Object.keys(result)
            .filter(
                (key) =>
                    result[key as keyof HealthProfessional] === valueToRemove
            )
            .forEach((key) => delete result[key as keyof HealthProfessional]);
    }

    return results;
};

const getProfessionByTagMock = (
    state: string,
    tag: string,
    healthProfessionCollection: HealthProfessional[]
) => {
    const results = healthProfessionCollection.filter(
        (res) =>
            (res.state.includes(state) || res.state.includes('generic')) &&
            res.tags.includes(tag)
    );

    const valueToRemove = 'null';

    for (const professional of results) {
        if (professional.description === 'null') {
            const genericDocument = healthProfessionCollection.filter(
                (res) =>
                    res.state.includes('generic') &&
                    res.profession.includes(
                        professional.profession.toLowerCase()
                    ) &&
                    res.tags.includes(tag)
            )[0];
            professional.description = genericDocument.description;
        }

        Object.keys(professional)
            .filter(
                (key) =>
                    professional[key as keyof HealthProfessional] ===
                    valueToRemove
            )
            .forEach(
                (key) => delete professional[key as keyof HealthProfessional]
            );
    }

    if (results.length === 0)
        return 'Cannot find any professions related to this tag!';

    const resp = results.filter((result) => {
        const length = results.filter(
            (item) => item.profession === result.profession
        ).length;
        return length === 1 || result.state !== 'generic';
    });

    return resp;
};

// Initialise db with test data
describe('health professional test suite', () => {
    let db: Db;
    let healthProfessionalCollection: Collection;
    let healthProfessionalRepository: IHealthProfessionRespository;
    let insertedHealthProfessional: HealthProfessional[];

    beforeAll(async () => {
        db = client.db(config.DATABASE_TEST_NAME);
        healthProfessionalCollection = db.collection('healthProfessionals');

        healthProfessionalRepository = HealthProfessionalRepository(
            healthProfessionalCollection
        );
        const csvContents = await getCSVContents();
        insertedHealthProfessional = JSON.parse(
            JSON.stringify(csvContents.healthProfessionalCollection)
        );

        await healthProfessionalCollection.insertMany(
            csvContents.healthProfessionalCollection
        );
    });

    // test getProfessionByTag enpoint
    it('Should get back a list of professions based off the tag and state specified', async () => {
        // test existing data
        const reqBody = {
            state: 'nsw',
            tag: 'muscles, strength, joints and movement',
        };

        let resultFromEndpoint =
            await healthProfessionalRepository.getProfessionByTag(
                reqBody.state,
                reqBody.tag
            );

        expect(resultFromEndpoint.success).toBeTruthy();
        expect(resultFromEndpoint.payload).toBeTruthy();

        const mockEndpoint = getProfessionByTagMock(
            reqBody.state,
            reqBody.tag,
            insertedHealthProfessional
        );

        expect(resultFromEndpoint.payload).toStrictEqual(mockEndpoint);

        // test the actual endpoint to return an error message, when there
        // is no data from the given parameters
        reqBody.tag = 'not a real tag asdfghj';

        resultFromEndpoint =
            await healthProfessionalRepository.getProfessionByTag(
                reqBody.state,
                reqBody.tag
            );

        expect(resultFromEndpoint.message).toBe(
            'Cannot find any professions related to this tag!'
        );
    });

    // test getProfessionInfoByState endpoint
    it('Should get back all professionals related to the specifed state \
    and profession', async () => {
        const reqBody = {
            state: 'nsw',
            profession: 'physiotherapist',
        };

        // Call the mockEndpoint function in the repository file
        let resultFromEndpoint =
            await healthProfessionalRepository.getProfessionInfoByState(
                reqBody.state,
                reqBody.profession
            );
        expect(resultFromEndpoint.success).toBeTruthy();
        expect(resultFromEndpoint.payload).toBeTruthy();

        // compare this with the function in this file
        let mockEndpoint = getProfessionInfoByStateMock(
            reqBody.state,
            reqBody.profession,
            insertedHealthProfessional
        );

        expect(resultFromEndpoint.payload).toStrictEqual(mockEndpoint);

        // // Test another state
        reqBody.state = 'nt';
        reqBody.profession = 'dentist';
        resultFromEndpoint =
            await healthProfessionalRepository.getProfessionInfoByState(
                reqBody.state,
                reqBody.profession
            );
        expect(resultFromEndpoint.success).toBeTruthy();
        expect(resultFromEndpoint.payload).toBeTruthy();

        // compare this with the function in this file
        mockEndpoint = getProfessionInfoByStateMock(
            reqBody.state,
            reqBody.profession,
            insertedHealthProfessional
        );

        expect(resultFromEndpoint.payload).toStrictEqual(mockEndpoint);

        // Test generic tag
        reqBody.state = 'generic';
        reqBody.profession = 'maternal, child and family health nurse';
        resultFromEndpoint =
            await healthProfessionalRepository.getProfessionInfoByState(
                reqBody.state,
                reqBody.profession
            );
        expect(resultFromEndpoint.success).toBeTruthy();
        expect(resultFromEndpoint.payload).toBeTruthy();

        // compare this with the function in this file
        mockEndpoint = getProfessionInfoByStateMock(
            reqBody.state,
            reqBody.profession,
            insertedHealthProfessional
        );

        expect(resultFromEndpoint.payload).toStrictEqual(mockEndpoint);

        // test non-existant state, should expect a fail error message
        reqBody.state = 'Not REAL state asdfghj';
        reqBody.profession = 'dentist';

        const failedResult =
            healthProfessionalRepository.getProfessionInfoByState(
                reqBody.state,
                reqBody.profession
            );
        expect((await failedResult).message).toBe(
            'Cannot find specified health professional'
        );

        // Test public service
        reqBody.state = 'nt';
        reqBody.profession = 'dietitian';
        resultFromEndpoint =
            await healthProfessionalRepository.getProfessionInfoByState(
                reqBody.state,
                reqBody.profession
            );
        expect(resultFromEndpoint.success).toBeTruthy();
        expect(resultFromEndpoint.payload).toBeTruthy();

        // compare this with the function in this file
        mockEndpoint = getProfessionInfoByStateMock(
            reqBody.state,
            reqBody.profession,
            insertedHealthProfessional
        );

        expect(resultFromEndpoint.payload).toStrictEqual(mockEndpoint);
    });
});
