import { useIntl } from 'react-intl';
import { ResourceIcons } from '../localIcon/LocalIcon';
import FeedbackRatings, {
    getItemFeedback,
    handleFeedbackChange,
} from '../home/Feedback/FeedbackRatings';
import { useEffect, useState } from 'react';
import LanguagesDropdown from './LanguagesDropdown';
import { Resource } from './types/Resource';
import { Tooltip } from 'react-tooltip';
import { updateResourceUserScore } from '../../utils/NetworkCalls';

function ResourceCard(resource: Resource) {
    const messages = useIntl();

    const [feedback, setFeedback] = useState<boolean | null>();
    const [selectedLanguageResourceLink, setSelectedLanguageResourceLink] =
        useState<string>('');
    const [selectedLanguageResourceDesc, setSelectedLanguageResourceDesc] =
        useState<string>('');

    useEffect(() => {
        setFeedback(
            getItemFeedback(
                resource.resourceId,
                'likedResources',
                'dislikedResources'
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resource]);

    useEffect(() => {
        if (feedback !== undefined)
            handleFeedbackChange(
                feedback as boolean | null,
                resource.resourceId,
                'likedResources',
                'dislikedResources',
                updateResourceUserScore as (
                    item: string | number,
                    caseNum: number
                ) => Promise<void>
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feedback]);

    const formatResourceTitle = (originalTitle: string): string => {
        const trimmedTitle = originalTitle.trim();
        const wordsArr: string[] = trimmedTitle.split(/\s+/);
        const maxLength = 10;

        if (wordsArr.length > maxLength) {
            const lastWord = wordsArr[maxLength - 1];
            wordsArr[maxLength - 1] = lastWord.replace(/[.,!?;:]/g, '');
        }

        return (
            wordsArr.slice(0, maxLength).join(' ') +
            (wordsArr.length > maxLength ? ' ...' : '')
        );
    };

    const {
        resourceId,
        resourceTitle,
        suite,
        publicationDate,
        resourceDescription,
        resourceLink,
        suiteLink,
        publisherLogo,
        translatedVersions,
    } = resource;

    return (
        <div
            id={`resource-card-container-${resourceId}`}
            className="flex flex-col h-full w-full bg-white px-4 py-10 col-span-2 border-[0.25px] border-gray-300 shadow-[0px_3px_2px_#00000054]"
        >
            <div
                id="header-publication-date-container"
                className="min-h-40 flex flex-col justify-center"
            >
                <div
                    id="resource-card-header-container"
                    className="flex flex-row gap-2 h-28 items-center"
                >
                    <div className="w-2/4">
                        <img
                            className="h-36 w-auto object-contain"
                            alt="pub-logo"
                            src={publisherLogo}
                        />
                    </div>
                    <div className="flex flex-col w-3/4 pl-2">
                        <a
                            href={
                                selectedLanguageResourceLink
                                    ? selectedLanguageResourceLink
                                    : resourceLink
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="no-underline"
                            id={`resource-title-${resourceId}`}
                            data-tooltip-id="title-tooltip"
                            data-tooltip-content={resourceTitle}
                        >
                            <h3
                                className={`main-heading font-omnes max-md:text-m max-lg:text-lg text-xl`}
                            >
                                {formatResourceTitle(resourceTitle)}
                            </h3>
                            <Tooltip
                                id="title-tooltip"
                                className="text-black font-sans text-xs max-w-[15%]"
                                noArrow
                                style={{ backgroundColor: '#F2F2F2' }}
                            />
                        </a>
                        <a
                            href={suiteLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <h4
                                id="suite-name"
                                className={`sub-heading link text-sm`}
                            >
                                {suite}
                            </h4>
                        </a>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center pt-6">
                    <div
                        id={`resource-publication-date-${resourceId}`}
                        className="text-xs font-thin text-slate-800 w-full"
                    >
                        {messages.formatMessage({
                            id: 'publicationDate',
                        }) +
                            (publicationDate > 0
                                ? publicationDate
                                : messages.formatMessage({
                                      id: 'notAvailable',
                                  }))}
                    </div>
                    {translatedVersions && translatedVersions.length > 0 && (
                        <div
                            className="w-full"
                            id={`resource-translated-versions-${resourceId}`}
                        >
                            <LanguagesDropdown
                                translatedVersions={translatedVersions}
                                resourceId={resourceId}
                                onChange={(translatedVersion) => {
                                    setSelectedLanguageResourceLink(
                                        translatedVersion.resourceLink
                                    );
                                    setSelectedLanguageResourceDesc(
                                        translatedVersion.resourceDescription
                                    );
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <hr className="mt-0 mb-0 h-px bg-gray-500 border-0 dark:bg-gray-700" />
            <div
                id={`resource-description-${resourceId}`}
                className="text-slate-800 min-h-36 h-48 overflow-y-auto pt-3"
            >
                {selectedLanguageResourceDesc
                    ? selectedLanguageResourceDesc
                    : resourceDescription}
            </div>
            <hr className="mt-1 mb-2 h-px bg-gray-500 border-0 dark:bg-gray-700" />
            <div
                id="go-to-resource-and-feedback-ratings-container"
                className="flex flex-row justify-between items-end"
            >
                <div id="resource-card-icons">
                    {ResourceIcons(resource, {
                        className: 'mr-1 inline w-[2.5em] max-md:w-[2em]',
                    })}
                </div>
                <div
                    id="feedback-ratings-container"
                    className="flex flex-col justify-center items-center text-center"
                >
                    <span
                        id="was-this-helpful-label"
                        className="text-black font-thin text-center text-xs mb-[3px]"
                    >
                        {messages.formatMessage({
                            id: 'wasThisHelpful',
                        })}
                    </span>
                    {feedback !== undefined && (
                        <FeedbackRatings
                            feedback={feedback}
                            setFeedback={setFeedback}
                            mode="resourceCard"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResourceCard;
