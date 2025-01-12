import { useNavigate } from 'react-router-dom';
import { exportTBAnalitycs } from '../utils/NetworkCalls';

/**
 * This page renders the administrator panel.
 * @returns a page that displays administrator panel
 */
function AdministratorPanelTB() {
    const navigate = useNavigate();

    const logOut = () => {
        document.cookie =
            'ADMIN_ACCESS=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/login');
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
                        exportTBAnalitycs();
                    }}
                >
                    <span className="text-xl">Export analytics data</span>
                </button>
            </div>
        </div>
    );
}
export default AdministratorPanelTB;
