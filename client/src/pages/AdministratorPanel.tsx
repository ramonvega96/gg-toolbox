import { useEffect, useState } from 'react';
import FileDragAndDrop from '../components/home/Upload/FileDragAndDrop';
import {
    confirmResourcesUpdate,
    exportResourcesData,
    findBrokenLinks,
    getBrokenLinksReport,
    submitResourcesUpdate,
    runGGAnalitycs,
} from '../utils/NetworkCalls';
import MultiPurposeModal from '../components/FHP/modals/MultiPurposeModal';
import ResourceCard from '../components/resourceCard/ResourceCard';
import {
    Resource,
    UpdatedResource,
} from '../components/resourceCard/types/Resource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

/**
 * This page renders the administrator panel.
 * @returns a page that displays administrator panel
 */
function AdministratorPanel() {
    const [resourcesFile, setResourcesFile] = useState<File>();
    const [updateReport, setUpdateReport] = useState<UpdatedResource[]>([]);
    const [updateSummary, setUpdateSummary] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalContent, setModalContent] = useState<React.ReactNode>();
    const [diplayedIndex, setDiplayedIndex] = useState<number>(-1);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const informativeModalContent: React.ReactNode = (
        <div className="w-full px-4">
            <div
                className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
            >
                <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="w-full">{errorMessage}</div>
            </div>
        </div>
    );

    const summaryModalContent: React.ReactNode = (
        <div className="w-full px-4">
            <div
                className="flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
                role="alert"
            >
                <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">
                        The following changes have been applied:
                    </span>
                    <ul className="mt-1.5 list-disc list-inside">
                        {updateSummary.map((change: string) => (
                            <li>{change}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                id="done-button"
                className={`mt-4 text-white p-3 flex justify-center items-center w-full bg-primaryBlue cursor-pointer hover:bg-primaryBlueDark`}
                onClick={() => {
                    setModal(false);
                }}
            >
                <span className="text-xl">Done!</span>
            </button>
        </div>
    );

    const updatesModalContent = (): React.ReactNode => {
        const addCases = ['a', 'b', 'c'];
        return (
            <div className="w-full px-4">
                <div
                    className={`flex items-center p-4 text-sm ${
                        addCases.includes(
                            updateReport[diplayedIndex].case.caseId
                        )
                            ? 'text-blue-800 bg-blue-50'
                            : 'text-red-800 bg-red-50'
                    } rounded-lg mb-4`}
                    role="alert"
                >
                    <svg
                        className="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div id="update-preview-summary">
                        <span className="font-medium">
                            {`${updateReport[diplayedIndex].case.caseOverview}: `}
                        </span>
                        {updateReport[diplayedIndex].case.caseDetail}
                    </div>
                </div>
                <ResourceCard
                    {...(updateReport[diplayedIndex] as Resource)}
                    key={diplayedIndex}
                />
                <div
                    id="resource-slider-container"
                    className="flex flex-row flex justify-between items-center max-mymd:px-4 mymd:px-20 xl:px-36 mt-4"
                >
                    <FontAwesomeIcon
                        id="left-arrow"
                        icon={faAngleLeft}
                        className={`text-4xl ${
                            diplayedIndex > 0
                                ? 'cursor-pointer'
                                : 'pointer-events-none opacity-50'
                        } w-10 pr-2`}
                        onClick={() => {
                            if (diplayedIndex > 0)
                                setDiplayedIndex(diplayedIndex - 1);
                        }}
                    />
                    <div className="text-xs whitespace-nowrap">{`Change ${
                        diplayedIndex + 1
                    } of ${updateReport.length}`}</div>
                    <FontAwesomeIcon
                        id="right-arrow"
                        icon={faAngleRight}
                        className={`text-4xl ${
                            diplayedIndex + 1 < updateReport.length
                                ? 'cursor-pointer'
                                : 'pointer-events-none opacity-50'
                        } w-10 pl-2`}
                        onClick={() => {
                            if (diplayedIndex < updateReport.length)
                                setDiplayedIndex(diplayedIndex + 1);
                        }}
                    />
                </div>
                <button
                    className={`mt-4 text-white p-3 flex justify-center items-center w-full bg-primaryBlue ${
                        diplayedIndex + 1 !== updateReport.length
                            ? 'cursor-default opacity-50'
                            : 'cursor-pointer hover:bg-primaryBlueDark'
                    }`}
                    disabled={diplayedIndex + 1 !== updateReport.length}
                    id="confirm-resources-data-update"
                    onClick={() => {
                        confirmUpdateResources();
                    }}
                >
                    <span className="text-xl">Confirm changes</span>
                </button>
            </div>
        );
    };

    useEffect(() => {
        if (updateReport.length > 0) {
            setErrorMessage('');
            setModal(true);
            setDiplayedIndex(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateReport]);

    useEffect(() => {
        if (errorMessage) {
            setUpdateReport([]);
            setModal(true);
            setModalContent(informativeModalContent);
            setDiplayedIndex(-1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMessage]);

    useEffect(() => {
        if (updateSummary.length > 0) {
            setModalContent(summaryModalContent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateSummary]);

    useEffect(() => {
        if (diplayedIndex !== -1) setModalContent(updatesModalContent());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [diplayedIndex]);

    useEffect(() => {
        if (!modal) {
            setUpdateReport([]);
            setUpdateSummary([]);
            setErrorMessage('');
            setModalContent(undefined);
            setResourcesFile(undefined);
            setDiplayedIndex(-1);
        }
    }, [modal]);

    const submitUpdatedResources = async () => {
        const report = await submitResourcesUpdate(resourcesFile as File);
        if (report.success) {
            setUpdateReport(report.payload);
        } else {
            setErrorMessage(`Data error: ${report.message}`);
        }
    };

    const confirmUpdateResources = async () => {
        const summary = await confirmResourcesUpdate(updateReport);
        if (summary.success) {
            setUpdateSummary(summary.payload);
        } else {
            const noEditMsg =
                'Data error: Data integrity error detected. Make sure you are not updating rows - Rows can be added or removed but never updated. ';
            setErrorMessage(noEditMsg + summary.message);
        }
    };

    const logOut = () => {
        document.cookie =
            'ADMIN_ACCESS=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/login');
    };

    const downloadBrokenLinksReport = async () => {
        const resp = await getBrokenLinksReport();
        if (resp && !resp.success) {
            setErrorMessage(
                'Data error: Unable to find a report. Please run the broken links finder script first.'
            );
        }
    };

    return (
        <div className="min-h-screen">
            <div className="flex justify-end w-full pt-8 pr-8">
                <button
                    id="admin-logout"
                    className={`cursor-pointer mt-2 text-white py-2 px-4 flex justify-center items-center bg-red-500 hover:bg-red-700`}
                    onClick={() => {
                        logOut();
                    }}
                >
                    <span className="text-xl">Log out</span>
                </button>
            </div>
            <div
                id="login-container"
                className="flex flex-col justify-center py-12 items-center bg-white xs:px-16 md:px-20 xl:px-36"
            >
                <button
                    id="export-resources-data-button"
                    className={`cursor-pointer bg-primaryBlue mt-2 text-white py-2 px-4 flex justify-center items-center hover:bg-primaryBlueDark 
                    max-md:w-full md:w-2/3`}
                    onClick={() => {
                        exportResourcesData();
                    }}
                >
                    <span className="text-xl">Export resources data</span>
                </button>
                <div className="flex gap-2 max-md:w-full md:w-2/3">
                    <button
                        id="run-broken-links-finder-button"
                        className={`cursor-pointer bg-primaryBlue mt-2 text-white py-2 px-4 flex justify-center items-center hover:bg-primaryBlueDark w-full`}
                        onClick={() => {
                            findBrokenLinks();
                            setErrorMessage(
                                'Done! The broken links finder has been triggered, and an email will be sent to the admin once the process is finished.'
                            );
                        }}
                    >
                        <span className="text-xl">Run broken links finder</span>
                    </button>
                    <button
                        id="get-broken-links-report-button"
                        className={`cursor-pointer bg-primaryBlue mt-2 text-white py-2 px-4 flex justify-center items-center hover:bg-primaryBlueDark w-full`}
                        onClick={() => {
                            downloadBrokenLinksReport();
                        }}
                    >
                        <span className="text-xl">
                            Download broken links report
                        </span>
                    </button>
                </div>
                <div className="max-md:w-full md:w-2/3 mt-4">
                    <FileDragAndDrop
                        type="file"
                        width="w-full"
                        styling="h-64 mb-8"
                        labelId="updateRes"
                        value={resourcesFile}
                        mandatory={false}
                        accept=".csv"
                        onChange={(value: File | undefined) =>
                            setResourcesFile(value)
                        }
                    />
                </div>
                <div className="flex justify-end max-md:w-full md:w-2/3 mt-4">
                    <button
                        id="update-resources-data-button"
                        className={`${
                            !resourcesFile
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                        } bg-primaryBlue text-white py-2 px-4 flex justify-center items-center hover:bg-primaryBlueDark 
                        max-md:w-1/2 md:w-1/3`}
                        onClick={() => {
                            submitUpdatedResources();
                        }}
                    >
                        <span className="text-xl">Submit resources update</span>
                    </button>
                </div>
                <hr />
                <button
                    id="run-analytics-button"
                    className={`cursor-pointer bg-primaryBlue mt-2 text-white py-2 px-4 flex justify-center items-center hover:bg-primaryBlueDark 
                    max-md:w-full md:w-2/3`}
                    onClick={() => {
                        runGGAnalitycs();
                        setErrorMessage(
                            'Done! The analytics execution has been triggered, and an email will be sent to the admin once the process is finished.'
                        );
                    }}
                >
                    <span className="text-xl">Run Analytics</span>
                </button>
                <div
                    id="resources-update-modal"
                    className="relative z-[50]"
                >
                    {modalContent && modal && (
                        <MultiPurposeModal
                            toggleModal={setModal}
                            modalContent={modalContent}
                            modalHeader={'Action Summary'}
                            maxModalWidth="max-w-[500px]"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
export default AdministratorPanel;
