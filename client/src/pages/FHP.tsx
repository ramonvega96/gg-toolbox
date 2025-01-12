import { useState, useContext } from 'react';
import { PathwayContext } from '../utils/Contexts';
import IntroPage from '../components/FHP/IntroPage';
import Information from '../components/FHP/Information';
import Australia from '../components/FHP/Australia';
import FindProfessional from '../components/FHP/HealthProfessional';
import NeedHelp from '../components/FHP/NeedHelp';
import Suggested from '../components/FHP/Suggested';
import DisplayProfession from '../components/FHP/DisplayProfession';

/**
 * This page renders everything in the FHP pathway.
 * @returns conditional components based on users input
 */
function FHP() {
    const { path } = useContext(PathwayContext);
    const [professionalPathway, setProfessionalPathway] = useState<string>('');
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [profession, setProfession] = useState<string>('');
    return (
        <div
            id="FHP-default-bg"
            className={`flex bg-primaryBlueDark text-white ${
                path !== 'suggested' && path !== 'displayProfession'
                    ? 'h-screen'
                    : ''
            } ${path === 'displayProfession' && 'min-h-screen'}`}
        >
            {/* this renders the first page you see for the FHP */}
            {path === 'firstPage' && <IntroPage />}

            {/* this renders the second page you see for FHP */}
            {path === 'informationPage' && (
                <Information setProfessionalPathway={setProfessionalPathway} />
            )}

            {/* this renders the australian map */}
            {path === 'australia' && (
                <Australia
                    professionalPathway={professionalPathway}
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                />
            )}

            {/* this renders the need help with pages */}
            {path === 'needHelp' && (
                <div
                    id="needHelpWithSection"
                    className="flex flex-col h-full justify-between"
                >
                    <NeedHelp setTopic={setSelectedTopic} />
                    <FindProfessional setProfession={setProfession} />{' '}
                </div>
            )}

            {/* this renders the suggested topics */}
            {path === 'suggested' && (
                <Suggested
                    tag={selectedTopic}
                    state={selectedState}
                />
            )}

            {/* this renders the professions */}
            {path === 'displayProfession' && (
                <DisplayProfession
                    state={selectedState}
                    profession={profession}
                />
            )}
        </div>
    );
}
export default FHP;
