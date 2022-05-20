import { useFormContext } from "react-hook-form";
import { useFamily } from "../components/Section";

export default function Input({ minore, name, ...props }) {

    const { register , formState: { errors } } = useFormContext();

    const f = useFamily()

    const registername = minore ? f + name + "_minore" : "DA_" + name

    return (
        <div className="flex flex-grow flex-col gap-1">
            <input type="text" {...props} className="w-full p-2 rounded-md" {...register(registername, { required: true })} />
            <span>{name}</span>
            {errors[registername] && <span className="text-red-500 text-sm">Questo campo è obbligatorio</span>}
        </div>
    )
}