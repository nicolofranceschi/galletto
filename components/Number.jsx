import { useFormContext } from "react-hook-form";
import { Family } from "./Section";

export default function Number(props) {

    const { register , formState: { errors } } = useFormContext();

    const f = Family()

    return (
        <div className="flex flex-grow flex-col gap-1">
            <div className="flex gap-1">
            <span className="grid place-content-center px-2 rounded-md border border-gray-300 bg-gray-50 text-gray-500 ">+39 </span>
            <input type="tel" {...props} className="w-full p-2 rounded-md" {...register(f+props.name, { required: true })} />
            </div>
            <span>{props.name}</span>
            {errors[props.name] && <span className="text-red-500 text-sm">Questo campo è obbligatorio</span>}
        </div>
    )
}