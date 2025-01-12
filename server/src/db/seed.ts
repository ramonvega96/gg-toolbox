import { MongoClient } from 'mongodb';
import config from '../../config.json';
import { getCSVContents } from './generateCSVContent';
import bcrypt from 'bcrypt';

const seedDB = async () => {
    // Mongo data connection here.
    const client = new MongoClient(config.DATABASE_URL);
    await client.connect();

    try {
        if (!client) throw new Error('Database connection error');

        const db = client.db(config.DATABASE_NAME);
        const csvContents = await getCSVContents();

        const insertToDbResources = await db
            .collection('resources')
            .insertMany(csvContents.resourceCollection);
        const insertToDbHeathProfessions = await db
            .collection('healthProfessions')
            .insertMany(csvContents.healthProfessionalCollection);
        const insertToDbGGAdminUser = await db.collection('user').replaceOne(
            { username: 'adminUser', project: 'GG' },
            {
                username: 'adminUser',
                password:
                    '$2b$12$Ng0aTU1298oqWrP7wBGf8e3iA/MtVlmUwD43VbXqyW/eyMq1BpCaW',
                project: 'GG',
            },
            { upsert: true }
        );
        const insertToDbTBAdminUser = await db.collection('user').replaceOne(
            { username: 'adminUserTB', project: 'TB' },
            {
                username: 'adminUserTB',
                password:
                    '$2b$12$AdWHYh/f2h4Gu78X2r28ruQ0r0OGPlV93VqgivuCbcm0C288w51xa',
                project: 'TB',
            },
            { upsert: true }
        );

        if (config.NODE_ENV === 'development') {
            const salt = await bcrypt.genSalt(12);
            const hashPwd = await bcrypt.hash('cypressAdminPwd', salt);
            await db.collection('user').replaceOne(
                { username: 'cypressAdminUser' },
                {
                    username: 'cypressAdminUser',
                    password: hashPwd,
                    project: 'GG',
                },
                { upsert: true }
            );
        }

        if (
            insertToDbResources.acknowledged === true &&
            insertToDbHeathProfessions.acknowledged === true &&
            insertToDbGGAdminUser.acknowledged === true &&
            insertToDbTBAdminUser.acknowledged === true
        ) {
            console.info('Seed files inserted ✨');
            await client.close();
            process.exit(0);
        } else throw new Error('Failed to insert seed files');
    } catch (error) {
        console.error(error.message);
        await client.close();
        process.exit(1);
    }
};

seedDB();
