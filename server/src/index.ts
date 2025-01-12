import { getConfig } from './config';
import { ApplicationServer } from './ApplicationServer';
import configFile from '../config.json';
import { Container } from './Container';
import { ConfigType } from './config/config.schema';

function fatalExit(message?: string) {
    console.error((message || '') + 'Fatal. Exiting ...');
    process.exit(1);
}

async function startServer(configurationFile: ConfigType) {
    const validatedConfig = getConfig(configurationFile);

    if (!validatedConfig?.success || !validatedConfig?.payload) {
        console.error(validatedConfig?.message);
        process.exit(1);
    }

    // Initialize services
    const moduleContainer = await Container(validatedConfig.payload);

    if (!moduleContainer.success) return fatalExit(moduleContainer.message);

    // Start server
    const applicationServer = await ApplicationServer(
        validatedConfig.payload,
        moduleContainer.payload
    );

    if (!applicationServer.success) {
        return fatalExit(applicationServer.message);
    }

    applicationServer.payload.start();
}

startServer(configFile);
