import { MongoClient, Collection } from 'mongodb';
import * as fs from 'fs/promises';
import config from '../../../config.json';
import path from 'path';
import { rawResourceKeys } from './types/RawResource';
import pipelines from './pipelines.json';
import { sendMail } from '../../helpers/EmailHelper';

const parentDir = path.dirname(__dirname);
const dumpDataFiles = `${parentDir}/data/dump-data-files`;
const backupDataFiles = `${parentDir}/data/backup-data-files`;

const getCollectionDocuments = async (
    collection: Collection,
    includeId: boolean
) => {
    const docs = includeId
        ? await collection.find({}).toArray()
        : await collection
              .find(
                  {},
                  {
                      projection: {
                          _id: 0,
                      },
                  }
              )
              .toArray();

    return docs;
};

const exportResources = async (collection: Collection, filePath: string) => {
    // All collection objects
    const docs = await getCollectionDocuments(collection, false);

    // The resources csv headers
    const csvKeys = rawResourceKeys;

    // Create the file with the headers
    await fs.writeFile(filePath, `${'\ufeff' + csvKeys.toString()}\n`);

    // Abort if collection is empty
    if (docs.length === 0) return;

    // The resource document keys in resource collection
    const docKeys = Object.keys(docs[0]);

    // Stores csv content. Each field and row is appended here
    let csvContent = '';

    // Convert each resource into a valid csv record
    for (const doc of docs) {
        for (const key of docKeys) {
            if (key === '_id') {
                csvContent += `${doc[key].toString()},`;
            } else if (key === 'tags') {
                csvContent += `"${doc[key].join(', ')}",`;
            } else if (key === 'scoreCriteria') {
                csvContent += `${doc[key].join(',')}\n`;
            } else if (csvKeys.includes(key)) {
                switch (typeof doc[key]) {
                    case 'string':
                        csvContent += `"${doc[key].replace(/"/g, '""')}",`;
                        break;
                    case 'number':
                        csvContent += `${doc[key]},`;
                        break;
                    case 'boolean':
                        csvContent += `${doc[key]},`;
                        break;
                }
            }
        }
    }

    await fs.appendFile(filePath, csvContent.slice(0, -1));
};

const fromDBtoCSV = async (collection: Collection, filePath: string) => {
    // All collection objects
    const objects = await getCollectionDocuments(collection, false);

    // Abort if collection is empty
    if (objects.length === 0) return;

    // The csv headers matching the obj interface
    const keys = Object.keys(objects[0]);

    // Create the file with the headers
    await fs.writeFile(filePath, `${keys.toString()}\n`);

    // Convert each obj into a valid csv record
    for (const obj of objects) {
        for (const key of keys) {
            let line = '';

            switch (typeof obj[key]) {
                case 'string':
                    line = `"${obj[key].replace(/"/g, '""')}",`;
                    break;
                case 'object':
                    line = `"${JSON.stringify(obj[key], null, 2).replace(
                        /"/g,
                        '""'
                    )}",`;
                    break;
                default:
                    line = `"${obj[key]}",`;
                    break;
            }

            await fs.appendFile(filePath, line);
        }
        await fs.appendFile(filePath, '\n');
    }
};

export const exportData = async (collection: string = '', backUp?: boolean) => {
    // Connect to database
    const client = new MongoClient(config.DATABASE_URL);

    try {
        await client.connect();
        if (!client) throw new Error('Database connection error');

        // GrowGo database
        const isTest = process.argv.indexOf('--forceExit') !== -1;
        const db = client.db(
            isTest ? config.DATABASE_TEST_NAME : config.DATABASE_NAME
        );

        if (!collection || collection === 'resources') {
            // Reference to the resources collection
            const resourcesCollection = db.collection('resources');

            // Function to format the date as dd/mm/yyyy - HH:mm
            const formatDate = (date: Date) =>
                `${date.getDate().toString().padStart(2, '0')}-${(
                    date.getMonth() + 1
                )
                    .toString()
                    .padStart(2, '0')}-${date.getFullYear()} - ${date
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`;

            // Generate the current date and time
            const currentDate = new Date();
            const formattedDate = formatDate(currentDate);

            // File name with formatted date
            const fileName = `resources_data_${formattedDate}.csv`;

            await exportResources(
                resourcesCollection,
                backUp
                    ? `${backupDataFiles}/${fileName}`
                    : `${dumpDataFiles}/resources_data.csv`
            );
        }

        if (!collection || collection === 'healthProfessions') {
            //Reference to the health professions collection
            const healthProfessionsCollection =
                db.collection('healthProfessions');
            await fromDBtoCSV(
                healthProfessionsCollection,
                `${dumpDataFiles}/fhp_data.csv`
            );
        }

        if (!collection || collection === 'analytics') {
            //Reference to the analytics collection
            const analyticsCollection = db.collection('analytics');
            await fromDBtoCSV(
                analyticsCollection,
                `${dumpDataFiles}/analytics_data.csv`
            );
        }

        await client.close();
    } catch (error) {
        await client.close();
        throw new Error(error.message);
    }
};

export const exportTBAnalitycs = async () => {
    // Connect to database
    const client = new MongoClient(config.DATABASE_URL);

    try {
        await client.connect();
        if (!client) throw new Error('Database connection error');

        // GrowGo database
        const isTest = process.argv.indexOf('--forceExit') !== -1;
        const db = client.db(
            isTest ? config.DATABASE_TEST_NAME : config.DATABASE_NAME
        );

        const analyticsCollection = db.collection('analytics');
        const objects = await analyticsCollection
            .find(
                { type: 2 },
                {
                    projection: {
                        _id: 0,
                        type: 0,
                    },
                }
            )
            .toArray();

        const filePath = `${dumpDataFiles}/analitycs_data_tb.csv`;

        // Abort if collection is empty
        if (objects.length === 0) return;

        // The csv headers matching the obj interface
        const keys = Object.keys(objects[0]);

        // Create the file with the headers
        await fs.writeFile(filePath, `${keys.toString()}\n`);

        // Convert each obj into a valid csv record
        for (const obj of objects) {
            for (const key of keys) {
                const line = `"${obj[key]}",`;
                await fs.appendFile(filePath, line);
            }
            await fs.appendFile(filePath, '\n');

            await client.close();
        }
    } catch (error) {
        await client.close();
        throw new Error(error.message);
    }
};

export const runGGAnalitycs = async () => {
    // Connect to database
    const client = new MongoClient(config.DATABASE_URL);

    try {
        await client.connect();
        if (!client) throw new Error('Database connection error');

        // GrowGo database
        const isTest = process.argv.indexOf('--forceExit') !== -1;
        const db = client.db(
            isTest ? config.DATABASE_TEST_NAME : config.DATABASE_NAME
        );

        const analyticsCollection = db.collection('analytics');

        let objects = await analyticsCollection
            .aggregate(pipelines.gg_resources_analytics)
            .toArray();
        const searchAnalitycsDataFile = `${dumpDataFiles}/search_analitycs_data_gg.csv`;
        let keys = Object.keys(objects[0]);

        await fs.writeFile(searchAnalitycsDataFile, `${keys.toString()}\n`);

        // Convert each obj into a valid csv record
        for (const obj of objects) {
            for (const key of keys) {
                const line = `"${obj[key]}",`;
                await fs.appendFile(searchAnalitycsDataFile, line);
            }
            await fs.appendFile(searchAnalitycsDataFile, '\n');
        }

        objects = await analyticsCollection
            .find({ type: 1 }, { projection: { _id: 0, type: 0 } })
            .toArray();
        const pagesAnalitycsDataFile = `${dumpDataFiles}/pages_analitycs_data_gg.csv`;
        keys = Object.keys(objects[0]);

        await fs.writeFile(pagesAnalitycsDataFile, `${keys.toString()}\n`);

        // Convert each obj into a valid csv record
        for (const obj of objects) {
            for (const key of keys) {
                const line = `"${obj[key]}",`;
                await fs.appendFile(pagesAnalitycsDataFile, line);
            }
            await fs.appendFile(pagesAnalitycsDataFile, '\n');
        }

        sendMail(
            'Analytics - Result',
            'Analytics extraction script execution SUCCEED. Find results attached.\n',
            [
                {
                    filename: 'search_analitycs_data_gg.csv',
                    path: searchAnalitycsDataFile,
                },
                {
                    filename: 'pages_analitycs_data_gg.csv',
                    path: pagesAnalitycsDataFile,
                },
            ]
        );

        await client.close();
    } catch (error) {
        await client.close();
        sendMail(
            'Analytics - Result',
            'Analytics extraction script execution FAILED. Access admin panel to execuite it again.'
        );
    }
};
