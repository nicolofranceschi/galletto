import { useFormContext } from "react-hook-form";
import { useFamily } from "./Section";

export default function Number(props) {

    const { register , formState: { errors } } = useFormContext();

    const f = useFamily()

    const registername = f + props.name.replaceAll(" ","_").toLowerCase()

    return (
        <div className="flex flex-grow flex-col gap-1">
            <div className="flex gap-1">
            <span className="grid place-content-center px-2 rounded-md border border-gray-300 bg-gray-50 text-gray-500 ">+39 </span>
            <input type="tel" {...props} className="w-full p-2 rounded-md" {...register(registername, { required: true })} />
            </div>
            <span>{props.name}</span>
            {errors[registername] && <span className="text-red-500 text-sm">Questo campo è obbligatorio</span>}
        </div>
    )
}