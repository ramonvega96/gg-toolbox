interface FormHeaderProps {
    title: string;
}

const FormHeader = ({ title }: FormHeaderProps) => {
    return (
        <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-3xl font-normal border-b-2 border-black pb-2 text-black w-full">
                {title}
            </h2>
        </div>
    );
};

export default FormHeader;
