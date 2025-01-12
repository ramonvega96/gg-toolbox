import { Response } from 'express';
import { success, failure } from './Result';
import { HttpStatusCode } from '../util/http/HttpStatusCode';

function failResponse(
    response: Response,
    httpStatus: (typeof HttpStatusCode)[keyof typeof HttpStatusCode],
    message?: string
): Response {
    const returnCode =
        httpStatus?.code || HttpStatusCode.InternalServerError_500.code;
    const returnMessage =
        message ||
        httpStatus?.phrase ||
        HttpStatusCode.InternalServerError_500.phrase;

    return response.status(returnCode).json(failure(returnMessage));
}

function successResponse<T>(
    response: Response,
    payload?: T,
    httpStatus?: (typeof HttpStatusCode)[keyof typeof HttpStatusCode],
    message?: string
): Response {
    const successOk = HttpStatusCode.OK_200;

    const returnCode = httpStatus?.code || successOk.code;
    const returnMessage = message || httpStatus?.phrase || successOk.phrase;

    if (payload) {
        return response
            .status(returnCode)
            .json(success(payload, returnMessage));
    }

    return response.status(returnCode).json(success());
}

const ControllerHelper = {
    failResponse,
    successResponse,
};

export default ControllerHelper;
