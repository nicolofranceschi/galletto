import DatiAnagrafici from "../forms/DatiAnagrafici";
import { useForm, FormProvider } from "react-hook-form";
import Section from "../components/Section";
import CheckBox from "../components/CheckBox";
import toast from "react-hot-toast";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Link from "next/link";
import { useMutation } from "react-query";
import Number from "../components/Number";
import Wrapper from "../components/Wrapper";
import Input from "../components/Input";
import DatePicker from "../components/Date";
import { createDocument } from "../firebase/db";

export default function A() {
  const [storedValues, setStoredValue] = useLocalStorage("da", {});

  const methods = useForm({ mode: "onChange", defaultValues: storedValues });

  const [files, setFiles] = useState([]);

  const [percent, setPercent] = useState(0);

  const [camp,setCamp] = useState([])

  const sendMail = useMutation(({ data }) => {
    return fetch("api/sendB", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });

  const fermata = methods.watch("fermata");

  const saveSubmit = useMutation(({ data }) => createDocument("b",data));

  const onSubmit = async (data) => {
    const API = {...data,files,camp}
    const valuetostore = Object.entries(data).reduce((acc, [key, val]) => {
      return key.startsWith("da") ? { ...acc, [key]: val } : acc;
    }, {});
    if (percent !== 0 ){toast.error("Attendere il caricamento dei file");return}
    if (files.length === 0 ){toast.error("Il certificato medico è obbligatorio");return}
    if (camp.length === 0 && data.Settimanepersonalizzate === "" ){toast.error("Devi Selezionare almeno un camp o una settimana personalazzita");return}
    setStoredValue(valuetostore);
    toast.success("Dati salvati sul tuo dispositivo");
    saveSubmit.mutate({ data:API },{
      onSuccess:(res) => {
      toast.success("Dati salvati sul server")
      toast.promise(sendMail.mutateAsync({data:{...API,key:res.id}}), {
        loading: "Caricamento..",
        success: <b>Form inviata</b>,
        error: <b>Ci dispiace qualcosa è andato storto</b>,
      });
    }})
  };

  console.log(sendMail.isLoading, sendMail.isSuccess);

  return (
    <FormProvider {...methods}>
      <form className="text-sm" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="bg-slate-50">
          <div className="fixed top-0 sm:w-2/5 h-screen w-screen">
            <div className="relative p-4 h-full">
              <div className="bg-[#9E95EE] relative overflow-hidden rounded-xl  h-full">
                <p className="text-[115vh] absolute top-[50%] right-[-20%] font-bold text-[#1E137C]">
                  B
                </p>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 p-2 md:p-4 sm:w-3/5 h-screen w-screen">
            <div className="p-2 md:p-4 flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <Link href="/">
                  <a className="btn flex p-4 flex-grow rounded-xl drop-shadow-lg justify-start md:justify-center items-center bg-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      height="30px"
                      className="fill-slate-400 hover:fill-slate-600"
                      viewBox="0 0 256 512"
                    >
                      <path d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z" />
                    </svg>
                  </a>
                </Link>
                <div className="flex flex-grow gap-2 flex-col bg-white p-4 rounded-xl drop-shadow-lg  ">
                  <h3>DOMANDA DI ISCRIZIONE CAMP SUMMER 2022</h3>
                  <p>Mod.B</p>
                </div>
              </div>
              <button
                type="reset"
                className=" btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-slate-400 hover:bg-slate-600 "
              >
                <p className="text-slate-300 font-bold ">Svuota il form</p>
                <div
                  type="reset"
                  className="p-3 w-10 h-10 bg-slate-300 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      className="opacity-40"
                      d="M284.2 0C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2z"
                    />
                    <path
                      className="opacity-100"
                      d="M32 96H416L394.6 466.8C393.1 492.2 372.1 512 346.7 512H101.3C75.87 512 54.86 492.2 53.39 466.8L32 96z"
                    />
                  </svg>
                </div>
              </button>
              <DatiAnagrafici />
              <Section family="EM_" title="CONTATTI URGENTI (ALMENO UNO DEI DUE NUMERI DEVE ESSERE SEMPRE ATTIVO DURANTE IL CAMP) (QUESTO TELEFONO SARÀ UTILIZZATO PER LE COMUNICAZIONI BROADCAST)">
                <Wrapper title="Numeri di emergenza">
                  <Number name="Emergenza1" />
                  <Number name="Emergenza2" />
                </Wrapper>
                  <p>il primo numero sarà utilizzato come principale, il secondo solo in caso di emergenza</p>
              </Section>
              <Section family="AL_" title="ALLERGIE, INTOLLERANZE ALIMENTARI">
                <Wrapper title="Allergie (se non presenti indicare nulla)">
                  <Input name="Allergie" />
                </Wrapper>
              </Section>
              <Section title="SIA ISCRITTO AL CAMP SUMMER 2022">
              <div className="flex flex-col gap-3">
                  <div onClick={() => setCamp(e => e.some(a => a === "Galletto Residence") ? e.filter(a=> a !== "Galletto Residence") : [...e,"Galletto Residence"])} className={camp.some(a => a === "Galletto Residence") ? "flex flex-col flex-grow gap-2 justify-center items-center p-4 bg-cyan-900 rounded-lg cursor-pointer border-4 border-cyan-500" : "flex flex-col flex-grow gap-2 justify-center items-center p-4 border-4 border-cyan-700 bg-cyan-700 hover:bg-cyan-800 rounded-lg cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-cyan-500" width="50px" viewBox="0 0 576 512">
                    <path className="opacity-40" d="M565.1 231.9C578.4 243.6 579.7 263.8 568.1 277.1C556.4 290.4 536.2 291.7 522.9 280.1L288 74.52L53.07 280.1C39.77 291.7 19.56 290.4 7.917 277.1C-3.72 263.8-2.372 243.6 10.93 231.9L266.9 7.918C278.1-2.639 297-2.639 309.1 7.918L565.1 231.9zM276.7 428.7L184 336C161.9 313.9 161.9 278.1 184 256C206.1 233.9 241.9 233.9 264 256L288 280L312 256C334.1 233.9 369.9 233.9 392 256C414.1 278.1 414.1 313.9 392 336L299.3 428.7C293.1 434.9 282.9 434.9 276.7 428.7H276.7z"/>
                    <path className="opacity" d="M64.07 448L64.02 270.5L288 74.52L512.1 270.6L512.5 447.9C512.6 483.3 483.9 512 448.5 512H128.1C92.74 512 64.09 483.4 64.07 448L64.07 448zM299.3 428.7L392 336C414.1 313.9 414.1 278.1 392 256C369.9 233.9 334.1 233.9 312 256L288 280L264 256C241.9 233.9 206.1 233.9 184 256C161.9 278.1 161.9 313.9 184 336L276.7 428.7C282.9 434.9 293.1 434.9 299.3 428.7H299.3z"/>
                  </svg>
                    <h3 className="text-white">Galletto Residence</h3>
                    <h5 className="text-cyan-500 font-bold">12/06 - 19/06</h5>
                    <p className="text-cyan-500">400€</p>
                  </div>
                <div className="flex flex-wrap gap-3">
                  <div onClick={() => setCamp(e => e.some(a => a === "Galletto Sport 1 Turno") ? e.filter( a=> a !== "Galletto Sport 1 Turno") : [...e,"Galletto Sport 1 Turno"])} className={camp.some(a => a === "Galletto Sport 1 Turno") ? "flex flex-col flex-grow gap-2 justify-center items-center p-4 bg-orange-900 rounded-lg cursor-pointer border-4 border-orange-500" : "flex flex-col flex-grow gap-2 justify-center items-center p-4 border-4 border-orange-700 bg-orange-700 hover:bg-orange-800 rounded-lg cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg"className="fill-orange-500" width="50px" viewBox="0 0 512 512">
                    <path className="opacity-40" d="M355.5 45.53L342.4 14.98c-27.95-9.983-57.18-14.98-86.42-14.98c-29.25 0-58.51 4.992-86.46 14.97L156.5 45.53l99.5 55.13L355.5 45.53zM86.78 96.15L53.67 99.09c-34.79 44.75-53.67 99.8-53.67 156.5L.0001 256c0 2.694 .0519 5.379 .1352 8.063l24.95 21.76l83.2-77.67L86.78 96.15zM318.8 336L357.3 217.4L255.1 144L154.7 217.4l38.82 118.6L318.8 336zM512 255.6c0-56.7-18.9-111.8-53.72-156.5L425.6 96.16L403.7 208.2l83.21 77.67l24.92-21.79C511.1 260.1 512 258.1 512 255.6zM51.77 367.7l-7.39 32.46c33.48 49.11 82.96 85.07 140 101.7l28.6-16.99l-48.19-103.3L51.77 367.7zM347.2 381.5l-48.19 103.3l28.57 17c57.05-16.66 106.5-52.62 140-101.7l-7.38-32.46L347.2 381.5z"/>
                    <path className="opacity" d="M458.3 99.08L458.3 99.08L458.3 99.08zM511.8 264c-1.442 48.66-16.82 95.87-44.28 136.1l-7.38-32.46l-113 13.86l-48.19 103.3l28.22 16.84c-23.48 6.78-47.67 10.2-71.85 10.2c-23.76 0-47.51-3.302-70.58-9.962l28.23-17.06l-48.19-103.3l-113-13.88l-7.39 32.46c-27.45-40.19-42.8-87.41-44.25-136.1l24.95 21.76l83.2-77.67L86.78 96.15L53.67 99.09c29.72-38.29 69.67-67.37 115.2-83.88l.3613 .2684L156.5 45.53l99.5 55.13l99.5-55.13L342.4 14.98c45.82 16.48 86 45.64 115.9 84.11L425.6 96.16L403.7 208.2l83.21 77.67L511.8 264zM357.3 217.4L255.1 144L154.7 217.4l38.82 118.6L318.8 336L357.3 217.4z"/>
                  </svg>
                    <h3 className="text-white">Galletto Sport 1° Turno</h3>
                    <h5 className="text-orange-500 font-bold">da lunedì 06/06 a venerdì 17/06</h5>
                    <p className="text-orange-500">280€</p>
                  </div>
                  <div onClick={() => setCamp(e => e.some(a => a === "Galletto Sport 2 Turno") ? e.filter( a=> a !== "Galletto Sport 2 Turno") : [...e,"Galletto Sport 2 Turno"])} className={camp.some(a => a === "Galletto Sport 2 Turno") ? "flex flex-col flex-grow gap-2 justify-center items-center p-4 bg-orange-900 rounded-lg cursor-pointer border-4 border-orange-500" : "flex flex-col flex-grow gap-2 justify-center items-center p-4 border-4 border-orange-700 bg-orange-700 hover:bg-orange-800 rounded-lg cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg"className="fill-orange-500" width="50px" viewBox="0 0 512 512">
                    <path className="opacity-40" d="M355.5 45.53L342.4 14.98c-27.95-9.983-57.18-14.98-86.42-14.98c-29.25 0-58.51 4.992-86.46 14.97L156.5 45.53l99.5 55.13L355.5 45.53zM86.78 96.15L53.67 99.09c-34.79 44.75-53.67 99.8-53.67 156.5L.0001 256c0 2.694 .0519 5.379 .1352 8.063l24.95 21.76l83.2-77.67L86.78 96.15zM318.8 336L357.3 217.4L255.1 144L154.7 217.4l38.82 118.6L318.8 336zM512 255.6c0-56.7-18.9-111.8-53.72-156.5L425.6 96.16L403.7 208.2l83.21 77.67l24.92-21.79C511.1 260.1 512 258.1 512 255.6zM51.77 367.7l-7.39 32.46c33.48 49.11 82.96 85.07 140 101.7l28.6-16.99l-48.19-103.3L51.77 367.7zM347.2 381.5l-48.19 103.3l28.57 17c57.05-16.66 106.5-52.62 140-101.7l-7.38-32.46L347.2 381.5z"/>
                    <path className="opacity" d="M458.3 99.08L458.3 99.08L458.3 99.08zM511.8 264c-1.442 48.66-16.82 95.87-44.28 136.1l-7.38-32.46l-113 13.86l-48.19 103.3l28.22 16.84c-23.48 6.78-47.67 10.2-71.85 10.2c-23.76 0-47.51-3.302-70.58-9.962l28.23-17.06l-48.19-103.3l-113-13.88l-7.39 32.46c-27.45-40.19-42.8-87.41-44.25-136.1l24.95 21.76l83.2-77.67L86.78 96.15L53.67 99.09c29.72-38.29 69.67-67.37 115.2-83.88l.3613 .2684L156.5 45.53l99.5 55.13l99.5-55.13L342.4 14.98c45.82 16.48 86 45.64 115.9 84.11L425.6 96.16L403.7 208.2l83.21 77.67L511.8 264zM357.3 217.4L255.1 144L154.7 217.4l38.82 118.6L318.8 336L357.3 217.4z"/>
                  </svg>
                    <h3 className="text-white">Galletto Sport 2° Turno</h3>
                    <h5 className="text-orange-500 font-bold">da lunedì 20/06 a venerdì 01/07</h5>
                    <p className="text-orange-500">280€</p>
                  </div>
                  <div onClick={() => setCamp(e => e.some(a => a === "Galletto Sport 3 Turno") ? e.filter( a=> a !== "Galletto Sport 3 Turno") : [...e,"Galletto Sport 3 Turno"])} className={camp.some(a => a === "Galletto Sport 3 Turno") ? "flex flex-col flex-grow gap-2 justify-center items-center p-4 bg-orange-900 rounded-lg cursor-pointer border-4 border-orange-500" : "flex flex-col flex-grow gap-2 justify-center items-center p-4 border-4 border-orange-700 bg-orange-700 hover:bg-orange-800 rounded-lg cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg"className="fill-orange-500" width="50px" viewBox="0 0 512 512">
                    <path className="opacity-40" d="M355.5 45.53L342.4 14.98c-27.95-9.983-57.18-14.98-86.42-14.98c-29.25 0-58.51 4.992-86.46 14.97L156.5 45.53l99.5 55.13L355.5 45.53zM86.78 96.15L53.67 99.09c-34.79 44.75-53.67 99.8-53.67 156.5L.0001 256c0 2.694 .0519 5.379 .1352 8.063l24.95 21.76l83.2-77.67L86.78 96.15zM318.8 336L357.3 217.4L255.1 144L154.7 217.4l38.82 118.6L318.8 336zM512 255.6c0-56.7-18.9-111.8-53.72-156.5L425.6 96.16L403.7 208.2l83.21 77.67l24.92-21.79C511.1 260.1 512 258.1 512 255.6zM51.77 367.7l-7.39 32.46c33.48 49.11 82.96 85.07 140 101.7l28.6-16.99l-48.19-103.3L51.77 367.7zM347.2 381.5l-48.19 103.3l28.57 17c57.05-16.66 106.5-52.62 140-101.7l-7.38-32.46L347.2 381.5z"/>
                    <path className="opacity" d="M458.3 99.08L458.3 99.08L458.3 99.08zM511.8 264c-1.442 48.66-16.82 95.87-44.28 136.1l-7.38-32.46l-113 13.86l-48.19 103.3l28.22 16.84c-23.48 6.78-47.67 10.2-71.85 10.2c-23.76 0-47.51-3.302-70.58-9.962l28.23-17.06l-48.19-103.3l-113-13.88l-7.39 32.46c-27.45-40.19-42.8-87.41-44.25-136.1l24.95 21.76l83.2-77.67L86.78 96.15L53.67 99.09c29.72-38.29 69.67-67.37 115.2-83.88l.3613 .2684L156.5 45.53l99.5 55.13l99.5-55.13L342.4 14.98c45.82 16.48 86 45.64 115.9 84.11L425.6 96.16L403.7 208.2l83.21 77.67L511.8 264zM357.3 217.4L255.1 144L154.7 217.4l38.82 118.6L318.8 336L357.3 217.4z"/>
                  </svg>
                    <h3 className="text-white">Galletto Sport 3° Turno</h3>
                    <h5 className="text-orange-500 font-bold">da lunedì 04/07 a venerdì 15/07</h5>
                    <p className="text-orange-500">280€</p>
                  </div>
                  <div onClick={() => setCamp(e => e.some(a => a === "Galletto Sport 4 Turno") ? e.filter( a=> a !== "Galletto Sport 4 Turno") : [...e,"Galletto Sport 4 Turno"])} className={camp.some(a => a === "Galletto Sport 4 Turno") ? "flex flex-col flex-grow gap-2 justify-center items-center p-4 bg-orange-900 rounded-lg cursor-pointer border-4 border-orange-500" : "flex flex-col flex-grow gap-2 justify-center items-center p-4 border-4 border-orange-700 bg-orange-700 hover:bg-orange-800 rounded-lg cursor-pointer"}>
                  <svg xmlns="http://www.w3.org/2000/svg"className="fill-orange-500" width="50px" viewBox="0 0 512 512">
                    <path className="opacity-40" d="M355.5 45.53L342.4 14.98c-27.95-9.983-57.18-14.98-86.42-14.98c-29.25 0-58.51 4.992-86.46 14.97L156.5 45.53l99.5 55.13L355.5 45.53zM86.78 96.15L53.67 99.09c-34.79 44.75-53.67 99.8-53.67 156.5L.0001 256c0 2.694 .0519 5.379 .1352 8.063l24.95 21.76l83.2-77.67L86.78 96.15zM318.8 336L357.3 217.4L255.1 144L154.7 217.4l38.82 118.6L318.8 336zM512 255.6c0-56.7-18.9-111.8-53.72-156.5L425.6 96.16L403.7 208.2l83.21 77.67l24.92-21.79C511.1 260.1 512 258.1 512 255.6zM51.77 367.7l-7.39 32.46c33.48 49.11 82.96 85.07 140 101.7l28.6-16.99l-48.19-103.3L51.77 367.7zM347.2 381.5l-48.19 103.3l28.57 17c57.05-16.66 106.5-52.62 140-101.7l-7.38-32.46L347.2 381.5z"/>
                    <path className="opacity" d="M458.3 99.08L458.3 99.08L458.3 99.08zM511.8 264c-1.442 48.66-16.82 95.87-44.28 136.1l-7.38-32.46l-113 13.86l-48.19 103.3l28.22 16.84c-23.48 6.78-47.67 10.2-71.85 10.2c-23.76 0-47.51-3.302-70.58-9.962l28.23-17.06l-48.19-103.3l-113-13.88l-7.39 32.46c-27.45-40.19-42.8-87.41-44.25-136.1l24.95 21.76l83.2-77.67L86.78 96.15L53.67 99.09c29.72-38.29 69.67-67.37 115.2-83.88l.3613 .2684L156.5 45.53l99.5 55.13l99.5-55.13L342.4 14.98c45.82 16.48 86 45.64 115.9 84.11L425.6 96.16L403.7 208.2l83.21 77.67L511.8 264zM357.3 217.4L255.1 144L154.7 217.4l38.82 118.6L318.8 336L357.3 217.4z"/>
                  </svg>
                    <h3 className="text-white">Galletto Sport 4° Turno</h3>
                    <h5 className="text-orange-500 font-bold">da lunedì 18/07 a venerdì 29/07</h5>
                    <p className="text-orange-500">280€</p>
                  </div>
                </div>
                <div className="flex flex-col flex-grow gap-2 justify-center p-4 border-4 border-slate-700 bg-slate-700 rounded-lg cursor-pointer" >
                    <h3 className="text-white">oppure GALLETTO SPORT SETTIMANE PERSONALIZZATE</h3>
                    <div className="flex flex-grow flex-col gap-1">
                        <input type="text" className="w-full p-2 rounded-md bg-slate-400 text-white" {...methods.register("Settimanepersonalizzate")} />
                        <span className="text-slate-500 text-sm font-bold">Inserisci le date che preferiresti</span>  
                    </div>
                  </div>
                </div>
              </Section>
              <Section title="Con servizio di trasporto">
                <Wrapper title="Indicare la fermata del Galletto Bus">
                  <select {...methods.register("fermata")} >
                    <option value="Nessun Servizio di Trasporto">Nessun Servizio di Trasporto</option>
                    <option value="Imola S.Zennaro">Imola S.Zennaro</option>
                    <option value="Imola Centro Sociale Tozzona">Imola Centro Sociale Tozzona</option>
                    <option value="Ponticelli">Ponticelli</option>
                    <option value="Fabbrica">Fabbrica</option>
                    <option value="Casalfiumanese SS Montanara">Casalfiumanese SS Montanara</option>
                    <option value="Borgo Riviera">Borgo Riviera</option>
                    <option value="Borgo Mescola">Borgo Mescola</option>
                    <option value="Borgo Centro">Borgo Centro</option>
                    <option value="Fontanelice S.Giovanni">Fontanelice S.Giovanni</option>
                    <option value="Fontanelice Centro">Fontanelice Centro</option>
                    <option value="Fontanelice 2D">Fontanelice 2D</option>
                    <option value="Fontanelice Campomoro">Fontanelice Campomoro</option>
                    <option value="Fermata Supplementare">Fermata Supplementare</option>
                  </select>
                </Wrapper>
                {fermata === "Fermata Supplementare" && (
                <Wrapper title="Fermata supplementare (da concordare preventivamente con la direzione)">
                <div className="flex flex-grow flex-col gap-1">
                  <input type="text" className="w-full p-2 rounded-md" {...methods.register("fermatacustom")} />
                   <span>Fermata Supplementare</span>
                </div>
                </Wrapper>
                )}
                <Wrapper title="Note Varie">
                <div className="flex flex-grow flex-col gap-1">
                  <textarea type="text" className="w-full p-2 rounded-md" {...methods.register("note")} />
                   <span>Note</span>
                </div>
                </Wrapper>
              </Section>
              <Section title="Manifestazione del consenso e presa visione (Privacy, Regolamento UE n. 2016/679 - Regolamento SSD e Campi estivi)"> 
              <CheckBox
                  text="DICHIARO di aver provveduto al tesseramento del partecipante. 2. DICHIARO di aver preso visione del regolamento del camp, del regolamento interno e dello statuto della GSA ssd a rl condividendone le finalità istituzionali e i valori. 3. CONFERMO che in caso di rinuncia la quota ora saldata sarà restituita decurtata di 30.00 euro nel caso in cui la disdetta pervenga alla direzione in forma scritta almeno 15gg prima dell’inizio del camp oppure nel caso in cui disposizioni anticovid impediscano la realizzazione del camp. In tutti gli altri casi non sono previsti rimborsi parziali o totali o recuperi per giorni di assenza. 4. AUTORIZZO ad inviare comunicazioni tramite Email / SMS / WhatsApp in merito allo svolgimento delle attività SPORTIVE al telefono indicato sopra alla voce telefono principale utilizzato per comunicazioni broadcast. A tale scopo si richiede di salvare tra i propri contatti il numero 324 0957228, diversamente non sarà possibile ricevere i messaggi WhatsApp inviati tramite liste broadcast. 5. ACCETTO i termini e le condizioni della Privacy Policy"
                  label="Presa visione e accettazione dei"
                  registername="accetto"
                >
                 <a href="http://www.gallettovacanze.it/privacy-policy/">
                  termini e condizioni della Privacy Policy
                </a>
                </CheckBox>
                <div className="flex flex-col gap-2">
                  <span>Assicurazione: rimborso dei giorni di assenza per malattia al costo di 10€ a settimana. La copertura prevede il rimborso di 20€ per ogni giorno di assenza causa malattia attestata da certificato medico</span>
                <div className="flex gap-2 items-center">
                  <input type="checkbox" id="assicurazione" name={"assicurazione"} {...methods.register("assicurazione")} />
                  <label htmlFor="assicurazione" className="flex flex-wrap gap-1">Attiva</label>
                </div>
                </div>
              </Section>
              <Section title="Carica copia del certificato medico-sportivo del partecipante al Camp (esonerati i bimbi sotto i 6 anni). Se il partecipante è residente in Emilia Romagna, vale COPIA DEL LIBRETTO DELLO SPORTIVO in corso di validità alla fine del camp. Tali documenti hanno scadenza 365gg dopo la visita medica.">
                <FileUploader {...{files,setFiles, percent, setPercent}} />
              </Section>
              <Section family="BC_" title="Dati relativi al pagamento effettuato a mezzo bonifico">
                <Wrapper title="BONIFICO BANCARIO ORDINANTE (Cognome e Nome)">
                  <Input name="Intestatario" />
                </Wrapper>
                <Wrapper title="BONIFICO BANCARIO (Data Valuta ovvero Data di accredito nel c/c della SSD) ">
                  <DatePicker name="data" />
                </Wrapper>
                <Wrapper title="BONIFICO BANCARIO (Importo Pagato)">
                  <Input name="euro" />
                </Wrapper>
              </Section>

              {sendMail.isSuccess ? (
                <>
                  <div className=" btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-green-600 ">
                    <p className="text-green-100 font-bold ">
                      Hai compilato con sucesso il modulo B !!!
                    </p>
                    <div className="p-2 w-10 h-10 flex items-center bg-green-300 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-green-600"
                        viewBox="0 0 640 512"
                      >
                        <path
                          className="opacity-40"
                          d="M51.26 152.2L31.26 100.3C46.62 71.85 66.04 45.97 88.75 23.39L132 37.81C96.46 68.47 68.47 107.7 51.26 152.2zM55.14 12.18C40.89 27.64 27.99 44.36 16.6 62.14L1.067 21.74C-1.156 15.97 .1552 9.423 4.433 4.947C8.71 .4702 15.19-1.136 21.06 .8215L55.14 12.18zM182.4 236.8C175.3 231.5 173.9 221.5 179.2 214.4C209.6 173.9 270.4 173.9 300.8 214.4C306.1 221.5 304.7 231.5 297.6 236.8C290.5 242.1 280.5 240.7 275.2 233.6C257.6 210.1 222.4 210.1 204.8 233.6C199.5 240.7 189.5 242.1 182.4 236.8V236.8zM342.4 236.8C335.3 231.5 333.9 221.5 339.2 214.4C369.6 173.9 430.4 173.9 460.8 214.4C466.1 221.5 464.7 231.5 457.6 236.8C450.5 242.1 440.5 240.7 435.2 233.6C417.6 210.1 382.4 210.1 364.8 233.6C359.5 240.7 349.5 242.1 342.4 236.8zM512 255.1C512 229.5 533.5 207.1 560 207.1H592C618.5 207.1 640 229.5 640 255.1V319.1C640 346.5 618.5 368 592 368H400C391.2 368 384 360.8 384 352C384 343.2 391.2 336 400 336H592C600.8 336 608 328.8 608 319.1V255.1C608 247.2 600.8 239.1 592 239.1H560C551.2 239.1 544 247.2 544 255.1C544 264.8 551.2 271.1 560 271.1H576C584.8 271.1 592 279.2 592 287.1C592 296.8 584.8 303.1 576 303.1H560C533.5 303.1 512 282.5 512 255.1z"
                        />
                        <path
                          className="opacity-100"
                          d="M531.7 400C485.6 467.6 407.1 512 320 512C178.6 512 64 397.4 64 256C64 114.6 178.6 0 320 0C433.4 0 529.7 73.79 563.3 176H560C515.8 176 480 211.8 480 256C480 274 485.1 290.6 495.1 304H416C414.1 304 413.1 304 412.1 304.1C411.8 301.8 410.3 299.7 408.7 297.7C404.4 292.5 398.5 287.1 391.9 284.3C378.7 276.9 361.4 272 344 272C340.4 272 337.2 274.5 336.3 277.1C335.3 281.5 336.9 285.2 340.1 286.1L340.1 286.1L340.3 287.1C340.5 287.2 340.8 287.4 341.2 287.7C342 288.1 343.2 288.9 344.6 289.8C347.4 291.6 351.2 294.3 354.8 297.4C358.6 300.5 362 303.1 364.5 307.4C366.1 310.1 368 313.8 368 315.1C368 318.2 366.1 321 364.5 324.6C362 328 358.6 331.5 354.8 334.6C351.2 337.7 347.4 340.4 344.6 342.2C343.2 343.1 342 343.9 341.2 344.3C340.8 344.6 340.5 344.8 340.3 344.9L340.1 345L340.1 345C337.6 346.4 336 349.1 336 352C336 354.9 337.6 357.6 340.1 358.1L340.1 358.1L340.3 359.1C340.5 359.2 340.8 359.4 341.2 359.7C342 360.1 343.2 360.9 344.6 361.8C347.4 363.6 351.2 366.3 354.8 369.4C358.6 372.5 362 375.9 364.5 379.4C366.1 382.1 368 385.8 368 388C368 390.2 366.1 393 364.5 396.6C362 400 358.6 403.5 354.8 406.6C351.2 409.7 347.4 412.4 344.6 414.2C343.2 415.1 342 415.9 341.2 416.3C340.8 416.6 340.5 416.8 340.3 416.9L340.1 417L340.1 417C336.9 418.8 335.3 422.5 336.3 426C337.2 429.5 340.4 431.1 344 431.1C361.4 431.1 378.7 427.1 391.9 419.7C398.5 416 404.4 411.5 408.7 406.3C410.3 404.3 411.8 402.2 412.1 399.9C413.1 399.1 414.1 399.1 416 399.1L531.7 400zM297.6 236.8C304.7 231.5 306.1 221.5 300.8 214.4C270.4 173.9 209.6 173.9 179.2 214.4C173.9 221.5 175.3 231.5 182.4 236.8C189.5 242.1 199.5 240.7 204.8 233.6C222.4 210.1 257.6 210.1 275.2 233.6C280.5 240.7 290.5 242.1 297.6 236.8zM364.8 233.6C382.4 210.1 417.6 210.1 435.2 233.6C440.5 240.7 450.5 242.1 457.6 236.8C464.7 231.5 466.1 221.5 460.8 214.4C430.4 173.9 369.6 173.9 339.2 214.4C333.9 221.5 335.3 231.5 342.4 236.8C349.5 242.1 359.5 240.7 364.8 233.6z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className=" btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-green-600 ">
                    <p className="text-green-100 font-bold ">
                      Riceverai un e-mail di conferma entro 48H
                    </p>
                    <div className="p-2 w-10 h-10 flex items-center bg-green-300 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-green-600"
                        viewBox="0 0 640 512"
                      >
                        <path
                          className="opacity-40"
                          d="M51.26 152.2L31.26 100.3C46.62 71.85 66.04 45.97 88.75 23.39L132 37.81C96.46 68.47 68.47 107.7 51.26 152.2zM55.14 12.18C40.89 27.64 27.99 44.36 16.6 62.14L1.067 21.74C-1.156 15.97 .1552 9.423 4.433 4.947C8.71 .4702 15.19-1.136 21.06 .8215L55.14 12.18zM182.4 236.8C175.3 231.5 173.9 221.5 179.2 214.4C209.6 173.9 270.4 173.9 300.8 214.4C306.1 221.5 304.7 231.5 297.6 236.8C290.5 242.1 280.5 240.7 275.2 233.6C257.6 210.1 222.4 210.1 204.8 233.6C199.5 240.7 189.5 242.1 182.4 236.8V236.8zM342.4 236.8C335.3 231.5 333.9 221.5 339.2 214.4C369.6 173.9 430.4 173.9 460.8 214.4C466.1 221.5 464.7 231.5 457.6 236.8C450.5 242.1 440.5 240.7 435.2 233.6C417.6 210.1 382.4 210.1 364.8 233.6C359.5 240.7 349.5 242.1 342.4 236.8zM512 255.1C512 229.5 533.5 207.1 560 207.1H592C618.5 207.1 640 229.5 640 255.1V319.1C640 346.5 618.5 368 592 368H400C391.2 368 384 360.8 384 352C384 343.2 391.2 336 400 336H592C600.8 336 608 328.8 608 319.1V255.1C608 247.2 600.8 239.1 592 239.1H560C551.2 239.1 544 247.2 544 255.1C544 264.8 551.2 271.1 560 271.1H576C584.8 271.1 592 279.2 592 287.1C592 296.8 584.8 303.1 576 303.1H560C533.5 303.1 512 282.5 512 255.1z"
                        />
                        <path
                          className="opacity-100"
                          d="M531.7 400C485.6 467.6 407.1 512 320 512C178.6 512 64 397.4 64 256C64 114.6 178.6 0 320 0C433.4 0 529.7 73.79 563.3 176H560C515.8 176 480 211.8 480 256C480 274 485.1 290.6 495.1 304H416C414.1 304 413.1 304 412.1 304.1C411.8 301.8 410.3 299.7 408.7 297.7C404.4 292.5 398.5 287.1 391.9 284.3C378.7 276.9 361.4 272 344 272C340.4 272 337.2 274.5 336.3 277.1C335.3 281.5 336.9 285.2 340.1 286.1L340.1 286.1L340.3 287.1C340.5 287.2 340.8 287.4 341.2 287.7C342 288.1 343.2 288.9 344.6 289.8C347.4 291.6 351.2 294.3 354.8 297.4C358.6 300.5 362 303.1 364.5 307.4C366.1 310.1 368 313.8 368 315.1C368 318.2 366.1 321 364.5 324.6C362 328 358.6 331.5 354.8 334.6C351.2 337.7 347.4 340.4 344.6 342.2C343.2 343.1 342 343.9 341.2 344.3C340.8 344.6 340.5 344.8 340.3 344.9L340.1 345L340.1 345C337.6 346.4 336 349.1 336 352C336 354.9 337.6 357.6 340.1 358.1L340.1 358.1L340.3 359.1C340.5 359.2 340.8 359.4 341.2 359.7C342 360.1 343.2 360.9 344.6 361.8C347.4 363.6 351.2 366.3 354.8 369.4C358.6 372.5 362 375.9 364.5 379.4C366.1 382.1 368 385.8 368 388C368 390.2 366.1 393 364.5 396.6C362 400 358.6 403.5 354.8 406.6C351.2 409.7 347.4 412.4 344.6 414.2C343.2 415.1 342 415.9 341.2 416.3C340.8 416.6 340.5 416.8 340.3 416.9L340.1 417L340.1 417C336.9 418.8 335.3 422.5 336.3 426C337.2 429.5 340.4 431.1 344 431.1C361.4 431.1 378.7 427.1 391.9 419.7C398.5 416 404.4 411.5 408.7 406.3C410.3 404.3 411.8 402.2 412.1 399.9C413.1 399.1 414.1 399.1 416 399.1L531.7 400zM297.6 236.8C304.7 231.5 306.1 221.5 300.8 214.4C270.4 173.9 209.6 173.9 179.2 214.4C173.9 221.5 175.3 231.5 182.4 236.8C189.5 242.1 199.5 240.7 204.8 233.6C222.4 210.1 257.6 210.1 275.2 233.6C280.5 240.7 290.5 242.1 297.6 236.8zM364.8 233.6C382.4 210.1 417.6 210.1 435.2 233.6C440.5 240.7 450.5 242.1 457.6 236.8C464.7 231.5 466.1 221.5 460.8 214.4C430.4 173.9 369.6 173.9 339.2 214.4C333.9 221.5 335.3 231.5 342.4 236.8C349.5 242.1 359.5 240.7 364.8 233.6z"
                        />
                      </svg>
                    </div>
                  </div>
                  <Link href="/a">
                  <a className=" btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-[#693A44] ">
                    <p className="text-[#DBBDC4] font-bold ">
                      Compila il modulo A
                    </p>
                    <div className="p-3 w-10 h-10 flex items-center bg-[#DBBDC4] rounded-md ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#693A44]" viewBox="0 0 384 512">
                        <path d="M381.5 435.7l-160-384C216.6 39.78 204.9 32.01 192 32.01S167.4 39.78 162.5 51.7l-160 384c-6.797 16.31 .9062 35.05 17.22 41.84c16.38 6.828 35.08-.9219 41.84-17.22l31.8-76.31h197.3l31.8 76.31c5.109 12.28 17.02 19.7 29.55 19.7c4.094 0 8.266-.7969 12.3-2.484C380.6 470.7 388.3 452 381.5 435.7zM119.1 320L192 147.2l72 172.8H119.1z"/>
                    </svg>
                    </div>
                  </a>
                  </Link>
                  <Link href="/">
                    <a className=" btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-white ">
                      <div className="p-3 flex items-center w-10 h-10 bg-slate-200 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30px"
                          height="30px"
                          className="fill-slate-400 hover:fill-slate-600"
                          viewBox="0 0 256 512"
                        >
                          <path d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z" />
                        </svg>
                      </div>
                      <p className="text-black font-bold ">Torna alla home</p>
                    </a>
                  </Link>
                </>
              ) : (
                <button
                className={
                  "w-full p-4 bg-sky-600 drop-shadow-2xl rounded-xl text-white font-bold"
                }
                type="submit"
              >
                INVIA
              </button>
              )}
               
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}


