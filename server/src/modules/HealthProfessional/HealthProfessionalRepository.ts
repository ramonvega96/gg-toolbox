import { FailReturn, failure, success } from '../../helpers/Result';
import { SuccessReturn } from '../../helpers/Result';
import { Collection } from 'mongodb';
import { IHealthProfession } from './HealthProfessional';

export interface IHealthProfessionRespository {
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
    healthProfessionCollection: Collection
): IHealthProfessionRespository => {
    return {
        /**
         * This function returns selected profession information based off
         * their job title and state
         * @param state the state
         * @param profession the job title (i.e dentist)
         * @returns information related to the profession
         */
        getProfessionInfoByState: async (state: string, profession: string) => {
            const professionsRaw = await healthProfessionCollection
                .find(
                    {
                        $and: [
                            { state: state.toLowerCase() },
                            {
                                profession: {
                                    $regex: new RegExp(
                                        profession.toLowerCase(),
                                        'i'
                                    ),
                                },
                            },
                        ],
                    },
                    { projection: { _id: 0 } }
                )
                .toArray();

            if (professionsRaw.length === 0)
                return failure('Cannot find specified health professional');

            const professionsMapped: IHealthProfession[] = professionsRaw.map(
                (profession: unknown) => {
                    return profession as IHealthProfession;
                }
            );

            const valueToRemove = 'null';

            for (const result of professionsMapped) {
                if (result.description === 'null') {
                    const genericDocument =
                        await healthProfessionCollection.findOne({
                            $and: [
                                { state: 'generic' },
                                {
                                    profession: result.profession.toLowerCase(),
                                },
                            ],
                        });

                    result.description = genericDocument.description;
                }
                Object.keys(result)
                    .filter(
                        (key) =>
                            result[key as keyof IHealthProfession] ===
                            valueToRemove
                    )
                    .forEach(
                        (key) => delete result[key as keyof IHealthProfession]
                    );
            }

            return success(professionsMapped);
        },

        /**
         * This function retrieves a list of professions based off the tag value
         * Tags refer to categories like "Breastfeeding", "Forumula feeding" etc
         * @param state the state selected
         * @param tag the category selected
         * @returns a list of job professions
         */
        getProfessionByTag: async (state: string, tag: string) => {
            const professions = await healthProfessionCollection
                .find(
                    {
                        $and: [
                            {
                                $or: [
                                    { state: state.toLowerCase() },
                                    { state: 'generic' },
                                ],
                            },
                            { tags: { $in: [tag.toLowerCase()] } },
                        ],
                    },
                    { projection: { _id: 0 } }
                )
                .toArray();

            if (professions.length === 0)
                return failure(
                    'Cannot find any professions related to this tag!'
                );

            const professionsMapped: IHealthProfession[] = professions.map(
                (profession: unknown) => {
                    return profession as IHealthProfession;
                }
            );

            const results = professionsMapped.filter(
                (result: IHealthProfession) => {
                    const length = professionsMapped.filter(
                        (item: IHealthProfession) =>
                            item.profession === result.profession
                    ).length;
                    return length === 1 || result.state !== 'generic';
                }
            );

            const valueToRemove = 'null';

            for (const result of results) {
                if (result.description === 'null') {
                    const genericDocument =
                        await healthProfessionCollection.findOne(
                            {
                                $and: [
                                    { state: 'generic' },
                                    {
                                        profession:
                                            result.profession.toLowerCase(),
                                    },
                                    { tags: { $in: [tag.toLowerCase()] } },
                                ],
                            },
                            { projection: { _id: 0 } }
                        );

                    result.description = genericDocument.description;
                }

                Object.keys(result)
                    .filter(
                        (key) =>
                            result[key as keyof IHealthProfession] ===
                            valueToRemove
                    )
                    .forEach(
                        (key) => delete result[key as keyof IHealthProfession]
                    );
            }

            return success(results);
        },
    };
};
