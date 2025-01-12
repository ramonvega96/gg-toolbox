import { FailReturn, SuccessReturn } from '../../helpers/Result';
import { IHealthProfession } from './HealthProfessional';
import { IHealthProfessionRespository } from './HealthProfessionalRepository';

export interface IHealthProfessionService {
    getProfessionInfoByState(
        state: string,
        profession: string
    ): Promise<SuccessReturn<IHealthProfession[]> | FailReturn>;
    getProfessionByTag(
        state: string,
        tag: string
    ): Promise<SuccessReturn<IHealthProfession[]> | FailReturn>;
}

export default (
    healthProfessionalRepository: IHealthProfessionRespository
): IHealthProfessionService => {
    return {
        getProfessionInfoByState: async (state: string, profession: string) =>
            await healthProfessionalRepository.getProfessionInfoByState(
                state,
                profession
            ),

        getProfessionByTag: async (state: string, tag: string) =>
            await healthProfessionalRepository.getProfessionByTag(state, tag),
    };
};
