import {
    ForwardRefRenderFunction,
    InputHTMLAttributes,
    forwardRef,
    useId,
} from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
    { label, type = 'text', className = '', ...props },
    ref
) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
            />
        </div>
    );
};
Input.displayName = 'Input';

export default forwardRef(Input);
