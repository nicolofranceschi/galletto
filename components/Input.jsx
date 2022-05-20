import { useFormContext } from "react-hook-form";
import { Family } from "../components/Section";

export default function Input(props) {

    const { register , formState: { errors } } = useFormContext();

    const f = Family()

    const registername = Boolean(props.minore) ? f + props.name + "_minore" : "DA_" + props.name

    return (
        <div className="flex flex-grow flex-col gap-1">
            <input type="text" {...props} className="w-full p-2 rounded-md" {...register(registername, { required: true })} />
            <span>{props.name}</span>
            {errors[registername] && <span className="text-red-500 text-sm">Questo campo è obbligatorio</span>}
        </div>
    )
}