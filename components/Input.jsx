import { useFormContext } from "react-hook-form";
import { useFamily } from "../components/Section";

export default function Input({ minore, name, hidden=false, ...props }) {

    const { register , formState: { errors } } = useFormContext();

    const f = useFamily()

    const temp = minore ? f + name + "_minore" : f + name

    const registername = temp.toLowerCase().replaceAll(" ","_")

    return (
        <div className="flex flex-grow flex-col gap-1">
            <input type="text" {...props} className="w-full p-2 rounded-md" {...register(registername, { required: true })} />
            {!hidden ? <span>{name}</span> : null}
            {errors[registername] && <span className="text-red-500 text-sm">Questo campo è obbligatorio</span>}
        </div>
    )
}