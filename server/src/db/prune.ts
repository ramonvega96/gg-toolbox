import { MongoClient } from 'mongodb';
import config from '../../config.json';

const confirm = (callback: (confirmed: boolean) => void) => {
    const stdin = process.stdin;
    const stdout = process.stdout;

    stdin.resume();
    stdout.write(
        'You will remove nutritious database. Are you willing to proceed? (yes/no): '
    );

    stdin.on('data', (data) => {
        const input = data.toString().trim().toLowerCase();
        if (input === 'yes') {
            console.info(
                // eslint-disable-next-line max-len
                '\u2139 This script will NOT remove analytics or user collection - You will need to do it manually'
            );
            callback(true);
        } else if (input === 'no') {
            callback(false);
        } else {
            stdout.write('Please enter a valid response (yes/no): ');
        }
    });
};

const pruneDatabase = () => {
    // Mongo data connection here.
    const client = new MongoClient(config.DATABASE_URL);

    confirm(async (confirmed: boolean) => {
        try {
            await client.connect();
            if (!client) throw new Error('Database connection error');
            else {
                if (confirmed) {
                    const db = client.db(config.DATABASE_NAME);
                    await db.dropCollection('resources');
                    console.info('\u2713 resources collection removed');
                    await db.dropCollection('healthProfessions');
                    console.info('\u2713 healthProfessions collection removed');
                } else {
                    console.info('Script execution aborted by user.');
                }
                await client.close();
                process.exit(0);
            }
        } catch (error) {
            console.error(
                'Execution failed: The database collections might not exist.'
            );
            await client.close();
            process.exit(1);
        }
    });
};

pruneDatabase();
