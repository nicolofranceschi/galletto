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
import { dataset } from "../components/dataset";

export default function B() {

  const [storedValues, setStoredValue] = useLocalStorage("da", {});

  const methods = useForm({ mode: "onChange", defaultValues: storedValues });

  const [files, setFiles] = useState([]);

  const [percent, setPercent] = useState(0);

  const [camp, setCamp] = useState([]);

  const [data, setData] = useState([]);

  const [age, setAge] = useState(0)

  const sendMail = useMutation(({ data }) => {
    return fetch("api/sendB", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });

  const isResident = camp.some(e => e === "R1")

  const addCamp = (camps) => {
    const tempCamp = [...camp]
    const newCamp = tempCamp.some(e => camps.some(el => el === e)) ? tempCamp.filter(e => !camps.some(el => el === e)) : [...camps, ...camp]
    setCamp(newCamp)
    const data = []
    if (newCamp.some(e => e === "B1") && newCamp.some(e => e === "B2")) {
      data = [...data, "TB1"]
      newCamp = newCamp.filter(e => e !== "B1" && e !== "B2")
    }
    if (newCamp.some(e => e === "B3") && newCamp.some(e => e === "B4")) {
      data = [...data, "TB2"]
      newCamp = newCamp.filter(e => e !== "B3" && e !== "B4")
    }
    if (newCamp.some(e => e === "B5") && newCamp.some(e => e === "B6")) {
      data = [...data, "TB3"]
      newCamp = newCamp.filter(e => e !== "B5" && e !== "B6")
    }
    if (newCamp.some(e => e === "B7") && newCamp.some(e => e === "B8")) {
      data = [...data, "TB4"]
      newCamp = newCamp.filter(e => e !== "B7" && e !== "B8")
    }
    if (newCamp.some(e => e === "B9") && newCamp.some(e => e === "B10")) {
      data = [...data, "TB5"]
      newCamp = newCamp.filter(e => e !== "B9" && e !== "B10")
    }
    if (newCamp.some(e => e === "B11") && newCamp.some(e => e === "B12")) {
      data = [...data, "TB6"]
      newCamp = newCamp.filter(e => e !== "B11" && e !== "B12")
    }
    if (newCamp.some(e => e === "S1") && newCamp.some(e => e === "S2")) {
      data = [...data, "TS1"]
      newCamp = newCamp.filter(e => e !== "S1" && e !== "S2")
    }
    if (newCamp.some(e => e === "S3") && newCamp.some(e => e === "S4")) {
      data = [...data, "TS2"]
      newCamp = newCamp.filter(e => e !== "S3" && e !== "S4")
    }
    if (newCamp.some(e => e === "S5") && newCamp.some(e => e === "S6")) {
      data = [...data, "TS3"]
      newCamp = newCamp.filter(e => e !== "S5" && e !== "S6")
    }
    if (newCamp.some(e => e === "S7") && newCamp.some(e => e === "S8")) {
      data = [...data, "TS4"]
      newCamp = newCamp.filter(e => e !== "S7" && e !== "S8")
    }
    if (newCamp.some(e => e === "S9") && newCamp.some(e => e === "S10")) {
      data = [...data, "TS5"]
      newCamp = newCamp.filter(e => e !== "S9" && e !== "S10")
    }
    if (newCamp.some(e => e === "S11") && newCamp.some(e => e === "S12")) {
      data = [...data, "TS6"]
      newCamp = newCamp.filter(e => e !== "S11" && e !== "S12")
    }
    if (newCamp.some(e => e === "C1") && newCamp.some(e => e === "C2")) {
      data = [...data, "TC1"]
      newCamp = newCamp.filter(e => e !== "C1" && e !== "C2")
    }
    if (newCamp.some(e => e === "C3") && newCamp.some(e => e === "C4")) {
      data = [...data, "TC2"]
      newCamp = newCamp.filter(e => e !== "C3" && e !== "C4")
    }
    if (newCamp.some(e => e === "C5") && newCamp.some(e => e === "C6")) {
      data = [...data, "TC3"]
      newCamp = newCamp.filter(e => e !== "C5" && e !== "C6")
    }
    if (newCamp.some(e => e === "C7") && newCamp.some(e => e === "C8")) {
      data = [...data, "TC4"]
      newCamp = newCamp.filter(e => e !== "C7" && e !== "C8")
    }
    if (newCamp.some(e => e === "C9") && newCamp.some(e => e === "C10")) {
      data = [...data, "TC5"]
      newCamp = newCamp.filter(e => e !== "C9" && e !== "C10")
    }
    if (newCamp.some(e => e === "C11") && newCamp.some(e => e === "C12")) {
      data = [...data, "TC6"]
      newCamp = newCamp.filter(e => e !== "C11" && e !== "C12")
    }
    data = [...data, ...newCamp]
    setData(data)
  }

  const fermata = methods.watch("fermata");
  const assicurazione = methods.watch("assicurazione");
  const fratelli = methods.watch("fratelli");
  const tesserato = methods.watch("tesserato");
  const conciliazione = methods.watch("conciliazione");
  const convenzione = methods.watch("convenzione");

  const saveSubmit = useMutation(({ data }) => createDocument("b", data));

  const onSubmit = async (datas) => {
    const API = { ...datas, files, camp: data };
    const valuetostore = Object.entries(data).reduce((acc, [key, val]) => {
      return key.startsWith("da") ? { ...acc, [key]: val } : acc;
    }, {});
    if (percent !== 0) {
      toast.error("Attendere il caricamento dei file");
      return;
    }
    if (files.length === 0) {
      toast.error("Il certificato medico è obbligatorio");
      return;
    }
    if (data.length === 0) {
      toast.error(
        "Devi Selezionare almeno un camp o una settimana personalazzita"
      );
      return;
    }
    setStoredValue(valuetostore);
    toast.success("Dati salvati sul tuo dispositivo");
    saveSubmit.mutate(
      { data: API },
      {
        onSuccess: (res) => {
          toast.success("Dati salvati sul server");
          toast.promise(
            sendMail.mutateAsync({ data: { ...API, key: res.id } }),
            {
              loading: "Caricamento..",
              success: <b>Form inviata</b>,
              error: <b>Ci dispiace qualcosa è andato storto</b>,
            }
          );
        },
      }
    );
  };

  function addTruni(accumulator, a) {
    return accumulator + dataset[a].price;
  }

  function addWeekg1(accumulator, a) {
    if (a.startsWith("C")) return accumulator + 115;
    else return accumulator + 145;
  }


  const week = data.filter(e => !e.startsWith("T") && !e.startsWith("R"))
  const turni = data.filter(e => e.startsWith("T")  || e.startsWith("R"))
  const g1 = week.slice(0, week.length - week.length % 2)
  const g2 = week.slice(week.length - week.length % 2)
  const virtualTurni = turni.length + Math.trunc(week.length / 2) + week.length % 2
  const tot = (turni.reduce(addTruni, 0)) + (g1.reduce(addWeekg1, 0)) + (g2.reduce(addTruni, 0)) + (assicurazione === "Yes" ? 10 * camp.length : 0) - ((tesserato === "Si" || data.length > 1) ? (30 * (virtualTurni + (tesserato === "Si" ? 1 : 0) - 1)) : 0) - (fratelli === "Si" ? data.filter(e => e.startsWith("T")).length * 10 + data.filter(e => !e.startsWith("T")).length * 5 : 0) - (conciliazione >= 1 ? (100 * conciliazione) : 0) - (convenzione === "FLORIM" ? 290 : 0)
  const minor = camp.length - (convenzione === "FLORIM" ? 2 : 0) >= 3 ? 3 : camp.length - (convenzione === "FLORIM" ? 2 : 0)
  if (conciliazione > minor) methods.setValue("conciliazione", minor)
  const coniliazione = []
  for (let i = 0; i < minor; i++) {
    coniliazione.push(camp[i])
  }


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
                  <h3>DOMANDA DI ISCRIZIONE CAMP SUMMER 2024</h3>
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
              <Section
                family="EM_"
                title="CONTATTI URGENTI (ALMENO UNO DEI DUE NUMERI DEVE ESSERE SEMPRE ATTIVO DURANTE IL CAMP) ( il numero emergenza 1 sarà utilizzato per le comunicazioni broadcast, salvare il numero 3240957228 )"
              >
                <Wrapper title="Numeri di emergenza">
                  <Number name="Emergenza1" />
                  <Number name="Emergenza2" />
                </Wrapper>
                <p>
                  in caso di necessità sarete contattati prima sul numero di emergenza 1 e poi sul numero di emergenza 1
                </p>
              </Section>
              <Section family="AL_" title="ALLERGIE, INTOLLERANZE ALIMENTARI">
                <Wrapper title="Allergie (se non presenti indicare nulla)">
                  <Input name="Allergie" />
                </Wrapper>
              </Section>
              <Section title="SIA ISCRITTO AL CAMP SUMMER 2024">
                <p className="px-4 py-2 bg-yellow-200 border-2 border-yellow-400 font-bold text-yellow-700 rounded-lg">Prenotazioni aperte solo per Galletto Resident</p>
                <div className="flex flex-col gap-4">
                  <p>Scegli la fascia di età</p>
                  <div className="flex flex-col items-start gap-2">
                    <div className={`flex gap-2  ${age === 0 ? "bg-pink-300 border-pink-700" : age === 1 ? "bg-orange-300 border-orange-700" : "bg-green-300 border-green-700"} text-white border-2  p-2 rounded-md`}>
                      <button type="button" onClick={() => { setAge(0); setCamp([]); setData([]) }} className={`px-4 p-1 ${age === 0 ? "bg-pink-700" : ""} rounded-md`}>
                        3-6 anni
                      </button>
                      <button type="button" onClick={() => { setAge(1); setCamp([]); setData([]) }} className={`px-4 p-1 ${age === 1 ? "bg-orange-700" : ""} rounded-md`}>
                        7-13 anni
                      </button>
                      <button type="button" onClick={() => { setAge(2); setCamp([]); setData([]) }} className={`px-4 p-1 ${age === 2 ? "bg-green-700" : ""} rounded-md`}>
                        14-15 anni
                      </button>
                    </div>
                  </div>
                  {age === 0 && <div>
                    <div className="flex gap-2 items-start">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-10 fill-pink-500">
                          <path d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25V288H128V251.7c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z" />
                        </svg>
                      </span>
                      <div className="flex flex-col ">
                        <h1 className="text-xl text-pink-500">GALLETTO BABY MAGIC SUMMER</h1>
                        <p className="text-[8px]">
                          torna il camp dai 3-6 anni che porta i bambini a scoprire gli sport e stare a contatto con la natura
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex flex-wrap text-left gap-2">
                      <Turno title={"1 TURNO"} desc={"NON DISPONIBILE"} disabled addCamp={() => addCamp(["B1", "B2"])} condi={camp.some(e => e === "B1") && camp.some(e => e === "B2")} color={"bg-pink-200"} />
                      <Turno title={"2 TURNO"} desc={"da lunedì 24/06 a venerdì 05/07"} addCamp={() => addCamp(["B3", "B4"])} condi={camp.some(e => e === "B3") && camp.some(e => e === "B4")} color={"bg-pink-200"} />
                      <Turno title={"3 TURNO"} desc={"da lunedì 08/07 a venerdì 19/07"} addCamp={() => addCamp(["B5", "B6"])} condi={camp.some(e => e === "B5") && camp.some(e => e === "B6")} color={"bg-pink-200"} />
                      <Turno title={"4 TURNO"} desc={"da lunedì 22/07 a venerdì 02/08"} addCamp={() => addCamp(["B7", "B8"])} condi={camp.some(e => e === "B7") && camp.some(e => e === "B8")} color={"bg-pink-200"} />
                      <Turno title={"5 TURNO"} desc={"da lunedì 05/08 a venerdì 16/08"} addCamp={() => addCamp(["B9", "B10"])} condi={camp.some(e => e === "B9") && camp.some(e => e === "B10")} color={"bg-pink-200"} />
                      <Turno title={"6 TURNO"} desc={"da lunedì 19/08 a venerdì 30/08"} addCamp={() => addCamp(["B11", "B12"])} condi={camp.some(e => e === "B11") && camp.some(e => e === "B12")} color={"bg-pink-200"} />
                    </div>
                    <p className="pt-4">oppure settimane personalizzate</p>
                    <div className="flex flex-wrap mt-2 gap-2">
                      <Week title={"1 SETTIMANA: NON DISPONIBILE"} disabled addCamp={() => addCamp(["B1"])} condi={camp.some(e => e === "B1")} color={"bg-pink-200"} />
                      <Week title={"2 SETTIMANA: NON DISPONIBILE"} disabled addCamp={() => addCamp(["B2"])} condi={camp.some(e => e === "B2")} color={"bg-pink-200"} />
                      <Week title={"3 SETTIMANA: 24/06 - 28/06"} addCamp={() => addCamp(["B3"])} condi={camp.some(e => e === "B3")} color={"bg-pink-200"} />
                      <Week title={"4 SETTIMANA: 01/07 - 05/07"} addCamp={() => addCamp(["B4"])} condi={camp.some(e => e === "B4")} color={"bg-pink-200"} />
                      <Week title={"5 SETTIMANA: 08/07 - 12/07"} addCamp={() => addCamp(["B5"])} condi={camp.some(e => e === "B5")} color={"bg-pink-200"} />
                      <Week title={"6 SETTIMANA: 15/07 - 19/07"} addCamp={() => addCamp(["B6"])} condi={camp.some(e => e === "B6")} color={"bg-pink-200"} />
                      <Week title={"7 SETTIMANA: 22/07 - 26/07"} addCamp={() => addCamp(["B7"])} condi={camp.some(e => e === "B7")} color={"bg-pink-200"} />
                      <Week title={"8 SETTIMANA: 29/07 - 02/08"} addCamp={() => addCamp(["B8"])} condi={camp.some(e => e === "B8")} color={"bg-pink-200"} />
                      <Week title={"9 SETTIMANA: 05/08 - 09/08"} addCamp={() => addCamp(["B9"])} condi={camp.some(e => e === "B9")} color={"bg-pink-200"} />
                      <Week title={"10 SETTIMANA: 12/08 - 16/08"} addCamp={() => addCamp(["B10"])} condi={camp.some(e => e === "B10")} color={"bg-pink-200"} />
                      <Week title={"11 SETTIMANA: 19/08 - 23/08"} addCamp={() => addCamp(["B11"])} condi={camp.some(e => e === "B11")} color={"bg-pink-200"} />
                      <Week title={"12 SETTIMANA: 26/08 - 30/08"} addCamp={() => addCamp(["B12"])} condi={camp.some(e => e === "B12")} color={"bg-pink-200"} />
                    </div>
                  </div>}
                  {age === 1 && <div>
                    <div className="flex gap-2 items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-10 w-14 fill-orange-500 ">
                        <path d="M371.5 429c-71.4 7-145.1-8.2-210-47.1c-8.8 14.8-16.2 30.3-22.3 46.3C172.5 450.8 212.7 464 256 464c42.7 0 82.5-12.9 115.5-35zm60.1-61.5c9.2-14.4 16.6-30.1 22.1-46.7c-65.9 7.3-134.5-4.3-197.1-37.1c-25.9 16.5-48.4 36.5-67.2 58.9c75.2 43.8 163.6 51 242.3 24.9zm31.8-96.4c.4-5 .5-10 .5-15.1c0-77.9-42.8-145.8-106.3-181.5c35.6 58.4 54.2 127.7 49.6 200.3c18.8 .5 37.6-.7 56.1-3.8zM101 394.7C127.6 334 172 280.5 231.7 242.7c-1.3-30-7.1-58.9-16.8-85.9C140.2 189.5 85.7 249.6 58.1 320.3c9 27.9 23.8 53.1 42.9 74.5zm-52-159.9C84.1 182.9 133.8 140 195.2 113c-8.7-15.7-18.7-30.4-29.9-44.2C101.9 99.6 56.5 161.6 49.1 234.8zM213.3 52.4c39.3 53.4 63.5 118.6 66.4 189.2c25.7 13.4 52.6 22.6 79.9 27.9c4.6-84.1-26.8-163-81.5-220.4c-7.2-.8-14.6-1.2-22.1-1.2c-14.6 0-28.9 1.5-42.7 4.4zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 0l0 0h0l0 0z" />
                      </svg>
                      <div className="flex flex-col">
                        <h1 className="text-xl text-orange-500">GALLETTO SPORT AVVENTURA</h1>
                        <p className="text-[8px]">
                          appassionati all'avventura, vivi in esperienza sportiva unica a contatto col verde
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex flex-wrap text-left gap-2">
                      <Turno title={"1 TURNO"} desc={"da lunedì 10/06 a venerdì 21/06"}  addCamp={() => addCamp(["S1", "S2"])} condi={camp.some(e => e === "S1") && camp.some(e => e === "S2")} color={"bg-orange-200"} />
                      <Turno title={"2 TURNO"} desc={"da lunedì 24/06 a venerdì 05/07"}  addCamp={() => addCamp(["S3", "S4"])} condi={camp.some(e => e === "S3") && camp.some(e => e === "S4")} color={"bg-orange-200"} />
                      <Turno title={"3 TURNO"} desc={"da lunedì 08/07 a venerdì 19/07"}  addCamp={() => addCamp(["S5", "S6"])} condi={camp.some(e => e === "S5") && camp.some(e => e === "S6")} color={"bg-orange-200"} />
                      <Turno title={"4 TURNO"} desc={"da lunedì 22/07 a venerdì 02/08"}  addCamp={() => addCamp(["S7", "S8"])} condi={camp.some(e => e === "S7") && camp.some(e => e === "S8")} color={"bg-orange-200"} />
                      <Turno title={"5 TURNO"} desc={"da lunedì 05/08 a venerdì 16/08"}  addCamp={() => addCamp(["S9", "S10"])} condi={camp.some(e => e === "S9") && camp.some(e => e === "S10")} color={"bg-orange-200"} />
                      <Turno title={"6 TURNO"} desc={"da lunedì 19/08 a venerdì 30/08"} addCamp={() => addCamp(["S11", "S12"])} condi={camp.some(e => e === "S11") && camp.some(e => e === "S12")} color={"bg-orange-200"} />
                    </div>
                    <p className="pt-4">oppure settimane personalizzate</p>
                    <div className="flex flex-wrap mt-2 gap-2">
                      <Week title={"1 SETTIMANA: 10/06 - 14/06"} addCamp={() => addCamp(["S1"])} condi={camp.some(e => e === "S1")} color={"bg-orange-200"} />
                      <Week title={"2 SETTIMANA: 17/06 - 21/06"} addCamp={() => addCamp(["S2"])} condi={camp.some(e => e === "S2")} color={"bg-orange-200"} />
                      <Week title={"3 SETTIMANA: 24/06 - 28/06"} addCamp={() => addCamp(["S3"])} condi={camp.some(e => e === "S3")} color={"bg-orange-200"} />
                      <Week title={"4 SETTIMANA: 01/07 - 05/07"} addCamp={() => addCamp(["S4"])} condi={camp.some(e => e === "S4")} color={"bg-orange-200"} />
                      <Week title={"5 SETTIMANA: 08/07 - 12/07"} addCamp={() => addCamp(["S5"])} condi={camp.some(e => e === "S5")} color={"bg-orange-200"} />
                      <Week title={"6 SETTIMANA: 15/07 - 19/07"} addCamp={() => addCamp(["S6"])} condi={camp.some(e => e === "S6")} color={"bg-orange-200"} />
                      <Week title={"7 SETTIMANA: 22/07 - 26/07"} addCamp={() => addCamp(["S7"])} condi={camp.some(e => e === "S7")} color={"bg-orange-200"} />
                      <Week title={"8 SETTIMANA: 29/07 - 02/08"} addCamp={() => addCamp(["S8"])} condi={camp.some(e => e === "S8")} color={"bg-orange-200"} />
                      <Week title={"9 SETTIMANA: 05/08 - 09/08"} addCamp={() => addCamp(["S9"])} condi={camp.some(e => e === "S9")} color={"bg-orange-200"} />
                      <Week title={"10 SETTIMANA: 12/08 - 16/08"} addCamp={() => addCamp(["S10"])} condi={camp.some(e => e === "S10")} color={"bg-orange-200"} />
                      <Week title={"11 SETTIMANA: 19/08 - 23/08"} addCamp={() => addCamp(["S11"])} condi={camp.some(e => e === "S11")} color={"bg-orange-200"} />
                      <Week title={"12 SETTIMANA: 26/08 - 30/08"} addCamp={() => addCamp(["S12"])} condi={camp.some(e => e === "S12")} color={"bg-orange-200"} />
                    </div>
                    <div className="flex gap-2 items-start mt-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-10 w-14 fill-orange-500"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
                      <div className="flex flex-col">
                        <h1 className="text-xl text-orange-500">GALLETTO RESIDENT</h1>
                        <p className="text-[8px]">
                          Il costo comprende la parte sportiva dell'evento.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex flex-wrap text-left gap-2">
                      <Turno title={"TURNO UNICO"} desc={"SOLD OUT"} disabled addCamp={() => addCamp(["R1"])} condi={camp.some(e => e === "R1")} color={"bg-orange-200"} />
                    </div>
                  </div>}
                  {
                    age === 2 &&
                    <div>
                      <div className="flex gap-2 items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-10 w-14 fill-green-500 ">
                          <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
                        </svg>
                        <div className="flex flex-col">
                          <h1 className="text-xl text-green-500">GALLETTO CRESCI CON NOI</h1>
                          <p className="text-[8px]">
                            GALLETTO CRESCI CON NOI PER RAGAZZI DAI 14 AI 15 ANNI
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 flex flex-wrap text-left gap-2">
                        <Turno title={"1 TURNO"} desc={"da lunedì 10/06 a venerdì 21/06"} addCamp={() => addCamp(["C1", "C2"])} condi={camp.some(e => e === "C1") && camp.some(e => e === "C2")} color={"bg-green-200"} />
                        <Turno title={"2 TURNO"} desc={"da lunedì 24/06 a venerdì 05/07"} addCamp={() => addCamp(["C3", "C4"])} condi={camp.some(e => e === "C3") && camp.some(e => e === "C4")} color={"bg-green-200"} />
                        <Turno title={"3 TURNO"} desc={"da lunedì 08/07 a venerdì 19/07"} addCamp={() => addCamp(["C5", "C6"])} condi={camp.some(e => e === "C5") && camp.some(e => e === "C6")} color={"bg-green-200"} />
                        <Turno title={"4 TURNO"} desc={"da lunedì 22/07 a venerdì 02/08"} addCamp={() => addCamp(["C7", "C8"])} condi={camp.some(e => e === "C7") && camp.some(e => e === "C8")} color={"bg-green-200"} />
                        <Turno title={"5 TURNO"} desc={"da lunedì 05/08 a venerdì 16/08"} addCamp={() => addCamp(["C9", "C10"])} condi={camp.some(e => e === "C9") && camp.some(e => e === "C10")} color={"bg-green-200"} />
                        <Turno title={"6 TURNO"} desc={"da lunedì 19/08 a venerdì 30/08"} addCamp={() => addCamp(["C11", "C12"])} condi={camp.some(e => e === "C11") && camp.some(e => e === "C12")} color={"bg-green-200"} />
                      </div>
                      <p className="pt-4">oppure settimane personalizzate</p>
                      <div className="flex flex-wrap mt-2 gap-2">
                        <Week title={"1 SETTIMANA: 10/06 - 14/06"} addCamp={() => addCamp(["C1"])} condi={camp.some(e => e === "C1")} color={"bg-green-200"} />
                        <Week title={"2 SETTIMANA: 17/06 - 21/06"} addCamp={() => addCamp(["C2"])} condi={camp.some(e => e === "C2")} color={"bg-green-200"} />
                        <Week title={"3 SETTIMANA: 24/06 - 28/06"} addCamp={() => addCamp(["C3"])} condi={camp.some(e => e === "C3")} color={"bg-green-200"} />
                        <Week title={"4 SETTIMANA: 01/07 - 05/07"} addCamp={() => addCamp(["C4"])} condi={camp.some(e => e === "C4")} color={"bg-green-200"} />
                        <Week title={"5 SETTIMANA: 08/07 - 12/07"} addCamp={() => addCamp(["C5"])} condi={camp.some(e => e === "C5")} color={"bg-green-200"} />
                        <Week title={"6 SETTIMANA: 15/07 - 19/07"} addCamp={() => addCamp(["C6"])} condi={camp.some(e => e === "C6")} color={"bg-green-200"} />
                        <Week title={"7 SETTIMANA: 22/07 - 26/07"} addCamp={() => addCamp(["C7"])} condi={camp.some(e => e === "C7")} color={"bg-green-200"} />
                        <Week title={"8 SETTIMANA: 29/07 - 02/08"} addCamp={() => addCamp(["C8"])} condi={camp.some(e => e === "C8")} color={"bg-green-200"} />
                        <Week title={"9 SETTIMANA: 05/08 - 09/08"} addCamp={() => addCamp(["C9"])} condi={camp.some(e => e === "C9")} color={"bg-green-200"} />
                        <Week title={"10 SETTIMANA: 12/08 - 16/08"} addCamp={() => addCamp(["C10"])} condi={camp.some(e => e === "C10")} color={"bg-green-200"} />
                        <Week title={"11 SETTIMANA: 19/08 - 23/08"} addCamp={() => addCamp(["C11"])} condi={camp.some(e => e === "C11")} color={"bg-green-200"} />
                        <Week title={"12 SETTIMANA: 26/08 - 30/08"} addCamp={() => addCamp(["C12"])} condi={camp.some(e => e === "C12")} color={"bg-green-200"} />
                      </div>
                    </div>
                  }
                </div>
              </Section>
              <Section family="AL_" title="RIMBORSO ASSENZA MALATTIA">
                <Wrapper title="INDICA IL NUMERO DELLE SETTIMANE SU CUI CALCOLARE IL RIMBORSO. La copertura prevede il
                    rimborso di 20€ per ogni giorno di assenza causa malattia
                    attestata da certificato medico. Il costo per ogni settimana è di 10 euro">
                  <select {...methods.register("assicurazione")}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </Wrapper>
              </Section>
              <Section title="UTENTE GIA' TESSERATO">
                <Wrapper title="L'ISCRITTO ERA GIA' TESSERATO NEL 2024 PRIMA DI QUESTA ISCRIZIONE ? (Es. Sei già tesserato nel 2024 se hai partecipato a Galletto Winter 2024)">
                  <select {...methods.register("tesserato")}>
                    <option value="No">No</option>
                    <option value="Si">Si</option>
                  </select>
                </Wrapper>
              </Section>
             {!isResident && <Section title="CONVENZIONI AZIENDALI">
                <Wrapper title="SEI DIPENDENTE DI UN AZIENDA CONVENZIONATA ?">
                  <select {...methods.register("convenzione")}>
                    <option value="none">No</option>
                    <option value="FLORIM">FLORIM</option>
                    <option value="CRAL">CRAL</option>
                  </select>
                </Wrapper>
              </Section>}
              <Section title="SCONTISTICHE APPLICABILI (non cumolabili tra loro)">
              {!isResident &&  <Wrapper title="N° SETTIMANE PROGETTO CONCILIAZIONE ">
                  <select defaultValue="0" {...methods.register("conciliazione")}>
                    <option value="0">0</option>
                    {fratelli === "No" &&
                      <>
                        {coniliazione.map((item, number) => (
                          <option key={"b" + item} value={number + 1}> {number + 1}</option>
                        ))}
                      </>
                    }
                  </select>
                </Wrapper>}
                <Wrapper title="HAI UN FRATELLO/SORELLA ISCRITTO ?">
                  <select {...methods.register("fratelli")}>
                    <option value="No">No</option>
                    {conciliazione === "0" && <option value="Si">Si</option>}
                  </select>
                </Wrapper>
              </Section>

              {!isResident && <Section title="Con servizio di trasporto">
                <Wrapper title="Indicare la fermata del Galletto Bus">
                  <select {...methods.register("fermata")}>
                    <option value="Nessun Servizio di Trasporto">
                      Nessun Servizio di Trasporto
                    </option>
                    <option value="Imola S.Zennaro">Imola S.Zennaro</option>
                    <option value="Imola Centro Sociale Tozzona">
                      Imola Centro Sociale Tozzona
                    </option>
                    <option value="Ponticelli">Ponticelli</option>
                    <option value="Fabbrica">Fabbrica</option>
                    <option value="Casalfiumanese SS Montanara">
                      Casalfiumanese SS Montanara
                    </option>
                    <option value="Borgo Riviera">Borgo Riviera</option>
                    <option value="Borgo Mescola">Borgo Mescola</option>
                    <option value="Borgo Centro">Borgo Centro</option>
                    <option value="Fontanelice S.Giovanni">
                      Fontanelice S.Giovanni
                    </option>
                    <option value="Fontanelice Centro">
                      Fontanelice Centro
                    </option>
                    <option value="Fontanelice 2D">Fontanelice 2D</option>
                    <option value="Fontanelice Campomoro">
                      Fontanelice Campomoro
                    </option>
                    <option value="Fermata Supplementare">
                      Fermata Supplementare
                    </option>
                  </select>
                </Wrapper>
                {fermata === "Fermata Supplementare" && (
                  <Wrapper title="Fermata supplementare (da concordare preventivamente con la direzione)">
                    <div className="flex flex-grow flex-col gap-1">
                      <input
                        type="text"
                        className="w-full p-2 rounded-md"
                        {...methods.register("fermatacustom")}
                      />
                      <span>Fermata Supplementare</span>
                    </div>
                  </Wrapper>
                )}
                <Wrapper title="Note Varie">
                  <div className="flex flex-grow flex-col gap-1">
                    <textarea
                      type="text"
                      className="w-full p-2 rounded-md"
                      {...methods.register("note")}
                    />
                    <span>Note</span>
                  </div>
                </Wrapper>
              </Section>}

              <Section title="Manifestazione del consenso e presa visione (Privacy, Regolamento UE n. 2016/679 - Regolamento SSD e Campi estivi)">
                <CheckBox
                  text={"DICHIARO di aver provveduto al tesseramento del partecipante. 2. DICHIARO di aver preso visione del regolamento del camp, del regolamento interno e dello statuto della GSA ssd a rl condividendone le finalità istituzionali e i valori. 3. CONFERMO che in caso di rinuncia la quota ora saldata sarà restituita decurtata di 30.00 euro nel caso in cui la disdetta pervenga alla direzione in forma scritta almeno 15gg prima dell’inizio del camp oppure nel caso in cui disposizioni anticovid impediscano la realizzazione del camp. In tutti gli altri casi non sono previsti rimborsi parziali o totali o recuperi per giorni di assenza. 4. AUTORIZZO ad inviare comunicazioni tramite Email / SMS / WhatsApp in merito allo svolgimento delle attività SPORTIVE al numero emergenza 1 indicato sopra alla voce contatti urgenti, utilizzato per comunicazioni broadcast. A tale scopo si richiede di salvare tra i propri contatti il numero 324 0957228, diversamente non sarà possibile ricevere i messaggi WhatsApp inviati tramite liste broadcast. 5. ACCETTO i termini e le condizioni della Privacy Policy."}
                  label="Presa visione e accettazione dei"
                  registername="accetto"
                >
                  <a href="http://www.gallettovacanze.it/privacy-policy/">
                    termini e condizioni della Privacy Policy
                  </a>
                </CheckBox>
              </Section>
              <Section title="Carica copia del certificato medico-sportivo del partecipante al Camp (esonerati i bimbi sotto i 6 anni). Se il partecipante è residente in Emilia Romagna, vale COPIA DEL LIBRETTO DELLO SPORTIVO in corso di validità alla fine del camp. Tali documenti hanno scadenza 365gg dopo la visita medica.">
                <p>Caricare sia la pagina con i dati anagrafici sia quella dell'ultima visita medica</p>
                <FileUploader {...{ files, setFiles, percent, setPercent }} />
              </Section>
              <Section title="Carrello della spesa">
                <div className="flex flex-col gap-2">
                  <table className="border-collapse">
                    <thead>
                      <tr className="border-b-2 text-left">
                        <th className="py-2">Descrizione</th>
                        <th className="py-2">Prezzo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turni.map((val, i) => (
                        <tr key={i} className="border-b-2 text-left">
                          <td className="py-2">{dataset[val].desc}</td>
                          <td className="py-2">{dataset[val].price} €</td>
                        </tr>
                      ))}
                      {g1.map((val, i) => (
                        <tr key={i} className="border-b-2 text-left">
                          <td className="py-2">{dataset[val].desc}</td>
                          <td className="py-2">{val.startsWith("C") ? "115 €" : "145 €"}</td>
                        </tr>
                      ))}
                      {g2.map((val, i) => (
                        <tr key={i} className="border-b-2 text-left">
                          <td className="py-2">{dataset[val].desc}</td>
                          <td className="py-2">{dataset[val].price} €</td>
                        </tr>
                      ))}
                      {(assicurazione === "Yes" && camp.length > 0) && (
                        <tr className="border-b-2 text-left">
                          <td className="py-2">Rimborso per malattia</td>
                          <td className="py-2">{10 * camp.length} €</td>
                        </tr>
                      )}
                      {(tesserato === "Si" || virtualTurni > 1) && (
                        <tr className="border-b-2 text-left">
                          <td className="py-2">Sconto tesseramento</td>
                          <td className="py-2 "> - {30 * (virtualTurni + (tesserato === "Si" ? 1 : 0) - 1)} €</td>
                        </tr>
                      )}
                      {fratelli === "Si" && (
                        <tr className="border-b-2 text-left">
                          <td className="py-2">Sconto Fratelli</td>
                          <td className="py-2"> - {turni.length * 10 + Math.trunc(week.length / 2) * 10} € </td>
                        </tr>
                      )}
                      {convenzione === "FLORIM" && (
                        <tr className="border-b-2 text-left">
                          <td className="py-2">Sconto Dipendenti Florim</td>
                          <td className="py-2">- 290 €</td>
                        </tr>
                      )}
                      {convenzione === "CRAL" && (turni.length > 0 || week.length > 1) && (
                        <tr className="border-b-2 text-left">
                          <td className="py-2">Sconto Dipendenti Cral</td>
                          <td className="py-2">- {turni.length * 10 + Math.trunc(week.length / 2) * 10} €</td>
                        </tr>
                      )}
                      {conciliazione >= 1 && (
                        <tr className="border-b-2 text-left">
                          <td className="py-2">Sconto Progetto Conciliazione</td>
                          <td className="py-2"> - {100 * conciliazione} €</td>
                        </tr>
                      )}
                      <tr className="text-left">
                        <th className="py-2 text-xl font-black">TOTALE</th>
                        <th className="py-2">{tot < 0 ? 0 : tot} €</th>
                      </tr>
                    </tbody>
                  </table>
                  <p className="xs">se il totale della spesa non ritorna con il tuo calcolo o con la tua idea di spesa puoi contattarci per farlo insieme al 324 0957228</p>
                  <p>
                    IBAN: IT79Q 08542 36700 0000 0031 0763<br />
                    Galletto Sport Academy ssd a rl<br />
                    Via Ambrogini, 5 -40022 Castel del Rio BO<br />
                    P.Iva/CF: 03812341208<br />
                  </p>
                </div>
              </Section>
              {!isResident && <Section title="Manifestazione del consenso e presa visione termini del Progetto Conciliazione">
                <CheckBox
                  text="Nel caso non si disponga dei diritti per aderire al progetto conciliazione, il genitore accetta a provvedere al pagamento completo dell'iscrizione entro 5 giorni dalla pubblicazione del bando, altrimenti la prenotazione verrà cancellata"
                  label="Accetto"
                  registername="conciliazioneAccept"
                />
              </Section>}
              <Section
                family="BC_"
                title="Dati relativi al pagamento effettuato a mezzo bonifico bancario che il genitore si impegna a effettuare subito dopo l'iscrizione."
              >
                <Wrapper title="BONIFICO BANCARIO ORDINANTE (Cognome e Nome)">
                  <Input name="Intestatario" />
                </Wrapper>
                <Wrapper title="BONIFICO BANCARIO (Data Valuta ovvero Data di accredito nel c/c della SSD) ">
                  <DatePicker name="data" />
                </Wrapper>
                <Wrapper title="BONIFICO BANCARIO (Importo Pagato)">
                  <div className="flex flex-grow flex-col gap-1">
                    <input
                      type="text"
                      className="w-full p-2 rounded-md"
                      {...methods.register("bc_euro", { required: true })}
                    />
                    <span>euro</span>
                    {methods.formState.errors["bc_euro"] && (
                      <span className="text-red-500 text-sm">
                        Questo campo è obbligatorio
                      </span>
                    )}
                  </div>
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
                      <p className="text-black font-bold ">Torna alla home per una nuova iscrizione o se hai finito</p>
                    </a>
                  </Link>
                </>
              ) : (
                <button className={"w-full p-4 bg-sky-600 disabled:animate-pulse drop-shadow-2xl rounded-xl text-white font-bold"} type="submit" disabled={sendMail.isLoading} >
                  {sendMail.isLoading ? "Caricamento, attendi l' invio dei dati rimanendo su questa pagina" : "INVIA"}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}



const Turno = ({ color, condi, title, desc, addCamp, disabled }) => (
  <button disabled={disabled} onClick={addCamp} type="button" className={` ${condi ? `${color}` : disabled ? "" : "hover:bg-slate-200"}  p-2 flex grow items-start w-[50%] sm:w-[30%] text-left  flex-col gap-1 rounded-md`}>
    <p className="font-bold">{title}</p>
    <p className="text-xs">{desc}</p>
  </button>
)

const Week = ({ color, condi, title, addCamp, disabled }) => (
  <button disabled={disabled} onClick={addCamp} type="button" className={` ${condi ? `${color}` : disabled ? "" : "hover:bg-slate-200"}  p-2 flex grow items-start sm:w-[30%] flex-col gap-1 rounded-md `}>
    <p className="font-xs">{title}</p>
  </button>
)