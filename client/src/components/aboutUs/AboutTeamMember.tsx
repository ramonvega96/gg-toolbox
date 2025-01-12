import { useIntl } from 'react-intl';

interface AboutTeamMemberInterface {
    imgSrc: string;
    imgAlt: string;
    teamMemberName: string;
    teamMemberRole: string;
    teamMemberDesc: string;
    imageAlignment?: string;
    descTextSize?: string;
}

function AboutTeamMember({
    imgSrc,
    imgAlt,
    teamMemberName,
    teamMemberRole,
    teamMemberDesc,
    imageAlignment,
}: AboutTeamMemberInterface) {
    const messages = useIntl();

    return (
        <div>
            <div className="xl:flex md:flex xs:hidden flex-row gap-4 mb-10">
                <div className="w-2/5">
                    <img
                        src={imgSrc}
                        alt={imgAlt}
                        className={`rounded-full object-cover ${
                            imageAlignment ? imageAlignment : 'object-right'
                        } w-full aspect-square`}
                    />
                </div>
                <div className="w-full">
                    <h3 className="font-forma font-bold text-white">
                        {teamMemberName}
                    </h3>
                    <p className="text-lg text-white font-light">
                        {messages.formatMessage({
                            id: teamMemberRole,
                        })}
                    </p>
                    <p className="text-lg text-white">
                        {messages.formatMessage({
                            id: teamMemberDesc,
                        })}
                    </p>
                </div>
            </div>
            <div className="xl:hidden md:hidden xs:block mb-10">
                <div className="w-full mb-4">
                    <img
                        src={imgSrc}
                        alt={imgAlt}
                        className={`rounded-full object-cover ${
                            imageAlignment ? imageAlignment : 'object-right'
                        } w-full aspect-square`}
                    />
                </div>
                <div className="w-full">
                    <h3 className="font-forma font-bold text-white">
                        {teamMemberName}
                    </h3>
                    <p className="text-lg text-white font-light">
                        {messages.formatMessage({
                            id: teamMemberRole,
                        })}
                    </p>
                    <p className="text-lg text-white">
                        {messages.formatMessage({
                            id: teamMemberDesc,
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default AboutTeamMember;
