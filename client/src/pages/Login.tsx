import { useIntl } from 'react-intl';
import FormInput, { FormErrors } from '../components/home/Contact/FormInput';
import { IUserLoginForm, submitLoginForm } from '../utils/NetworkCalls';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../assets/images/icons/svg/right_arrow_svgrepo_com.svg';
import { verifyCookie } from '../utils/ProtectedRoute';
import ggLogo from '../assets/images/nutbox/grow_and_go_logo.png';
import tbLogo from '../assets/images/nutbox/tiny_bites.png';

/**
 * This page renders the login page.
 * @returns a page that displays a login form
 */
function Login() {
    const messages = useIntl();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<IUserLoginForm>({
        username: '',
        password: '',
        project: 'GG',
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [blockSubmit, setBlockSubmit] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
    const [currProject, setCurrProject] = useState<string>('GG');
    const [loginError, setLoginError] = useState<string>('');

    const ggName = 'Grow&Go';
    const tbName = 'Tiny Bites';

    const getChangeProTxt = () =>
        `To access ${
            currProject === 'GG' ? tbName : ggName
        } administrator panel, please click `;

    const handleProjChange = () => {
        if (currProject === 'GG') {
            setCurrProject('TB');
            setFormValues((prevState) => ({
                ...prevState,
                project: 'TB',
            }));
        } else {
            setCurrProject('GG');
            setFormValues((prevState) => ({
                ...prevState,
                project: 'GG',
            }));
        }
    };

    const verifyAuth = async () => {
        const cookieSet = await verifyCookie(currProject);
        setIsAuthenticated(cookieSet);
    };

    useEffect(() => {
        verifyAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const isFormValid = () => {
            for (const key in formValues) {
                if (
                    formValues[key as keyof IUserLoginForm] === '' ||
                    Object.keys(formErrors).length > 0
                ) {
                    return true;
                }
            }
            return false;
        };

        setBlockSubmit(isFormValid());
    }, [formValues, formErrors]);

    async function login() {
        const res = await submitLoginForm(formValues);
        if (res.success)
            navigate(
                `${
                    currProject === 'GG'
                        ? '/administrator-panel'
                        : '/administrator-panel-tb'
                }`
            );
        else setLoginError('Unable to authenticate - Please verify details');
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to="/administrator-panel"
                replace={true}
            />
        );
    }

    return (
        <div
            id="login-container"
            className="flex flex-col justify-center items-center py-12 h-screen bg-white xs:px-16 md:px-20 xl:px-36"
        >
            <h2 className="font-omnes xs:text-xl md:text-4xl font-bold text-center text-primaryBlueDark">
                {`${
                    currProject === 'GG' ? ggName : tbName
                } ${messages.formatMessage({ id: 'adminLogin' })}`}
            </h2>
            <img
                className="my-8 w-64"
                src={currProject === 'GG' ? ggLogo : tbLogo}
                alt="Project logo"
            />
            <span className="xs:text-md md:text-xl grid content-center text-center">
                <p>
                    {messages.formatMessage({
                        id: 'loginDescription',
                    })}
                    <a href="/">
                        {messages.formatMessage({
                            id: 'here',
                        })}
                    </a>
                </p>
            </span>
            <span className="xs:text-md md:text-xl grid content-center text-center">
                <p>
                    {getChangeProTxt()}
                    <span
                        className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
                        onClick={() => handleProjChange()}
                    >
                        {messages.formatMessage({
                            id: 'here',
                        })}
                    </span>
                </p>
            </span>
            <div className="md:w-3/5 xs:w-full flex flex-col py-10 text-formTextGrey gap-4">
                <FormInput
                    type="text"
                    styling="h-12"
                    width="w-full"
                    labelId="username"
                    value={formValues.username}
                    onChange={(value: string) =>
                        setFormValues((prevState) => {
                            return {
                                ...prevState,
                                username: value,
                            };
                        })
                    }
                    maxLength={35}
                    setFormErrors={setFormErrors}
                    mandatory={true}
                />
                <FormInput
                    type="password"
                    styling="h-12"
                    width="w-full"
                    labelId="password"
                    value={formValues.password}
                    onChange={(value: string) =>
                        setFormValues((prevState) => {
                            return {
                                ...prevState,
                                password: value,
                            };
                        })
                    }
                    maxLength={35}
                    setFormErrors={setFormErrors}
                    mandatory={true}
                />
                <button
                    id="login-button"
                    className={`${
                        blockSubmit
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                    } bg-primaryBlue mt-2 text-white p-6 flex justify-between items-center hover:bg-primaryBlueDark 
                    w-full`}
                    onClick={() => {
                        if (!blockSubmit) {
                            login();
                        }
                    }}
                >
                    <span className="text-xl">
                        {messages.formatMessage({ id: 'login' })}
                    </span>
                    <Arrow
                        fill="white"
                        width="2em"
                    />
                </button>
                {loginError && <p className="text-red-400">{loginError}</p>}
            </div>
        </div>
    );
}
export default Login;
