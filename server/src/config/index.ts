import { success } from '../helpers/Result';
import { failure } from '../helpers/Result';
import { ConfigType } from './config.schema';

export function getConfig(config: ConfigType) {
    const errorMessage =
        'Configuration file could not be parsed. Please ensure that config.json ' +
        'file is present at project root and is configured correctly.';
    if (!config) {
        console.error(errorMessage);
        return failure(errorMessage);
    }

    return success(config);
}
