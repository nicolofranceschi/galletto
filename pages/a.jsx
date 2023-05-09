import DatiAnagrafici from "../forms/DatiAnagrafici";
import { useForm, FormProvider } from "react-hook-form";
import Section from "../components/Section";
import CheckBox from "../components/CheckBox";
import toast from "react-hot-toast";
import useLocalStorage from "../hooks/useLocalStorage";
import Link from "next/link";
import { useMutation } from "react-query";
import { createDocument } from "../firebase/db";

export default function A() {
  const [storedValues, setStoredValue] = useLocalStorage("da", {});

  const methods = useForm({ mode: "onChange", defaultValues: storedValues });

  const sendMail = useMutation(({ data }) => {
    return fetch("api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });

  const saveSubmit = useMutation((data) => createDocument("a",data));

  const onSubmit = async (sub) => {
    const valuetostore = Object.entries(sub).reduce((acc, [key, val]) => {
      return key.startsWith("da") ? { ...acc, [key]: val } : acc;
    }, {});
    setStoredValue(valuetostore);
    toast.success("Dati salvati sul tuo dispositivo");
    saveSubmit.mutate(sub,{
        onSuccess:(res) => {
        toast.success("Dati salvati sul server")
        toast.promise(sendMail.mutateAsync({ data: {...sub,key:res.id}}), {
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
              <div className="bg-[#DBBDC4] relative overflow-hidden rounded-xl  h-full">
                <p className="text-[115vh] absolute top-[50%] right-[-20%] font-bold text-[#693A44]">
                  A
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
                  <h3>DOMANDA DI TESSERAMENTO ALLA GSA SSD RL</h3>
                  <p>Mod.A</p>
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
              <Section title="SIA ISCRITTO ALLA GALLETTO SPORT ACCADEMY SSD a RL">
                <CheckBox
                  text="DICHIARA INOLTRE DI ESSERE A CONOSCENZA CHE SARÀ TESSERATO PER L’ASI-ASSOCIAZIONI SPORTIVE E SOCIALI ITALIANE, SU RICHIESTA SOTTOSCRITTA E INOLTRATA PER IL TRAMITE DELLA SOCIETÀ SPORTIVA DILETTANTISTICA GALLETTO SPORT ACADEMY SSD A RL, PER LA QUALE INTENDE SVOLGERE L’ATTIVITÀ SPORTIVA. DICHIARA, DI AVER PRESO VISIONE DELLO STATUTO SOCIALE E DEL REGOLAMENTO INTERNO. DICHIARA, ALTRESÌ DI ACCETTARE E DI RISPETTARE INTEGRALMENTE LO STATUTO SOCIALE ED IL REGOLAMENTO, CONDIVIDENDONE LE FINALITÀ ISTITUZIONALI ED I VALORI"
                  label="Accettazione di presa visione del"
                  registername="regolamento"
                >
                  <a href="http://www.gallettovacanze.it/wp-content/uploads/2023/05/REGOLAMENTO.GSA_.SSD_.2023.pdf">
                    Regolamento ssd
                  </a>
                </CheckBox>
              </Section>
              <Section title="Manifestazione del consenso (art. 7 Regolamento UE n. 2016/679)">
                <CheckBox
                  text="IO SOTTOSCRITTO/A, LETTA L’INFORMATIVA EX ART 13 DEL REGOLAMENTO UE 2016/679, DICHIARO DI ESSERE STATO INFORMATO SULLE FINALITÀ E LE MODALITÀ DI TRATTAMENTO CUI SONO DESTINATI I DATI, I SOGGETTI A CUI GLI STESSI POTRANNO ESSERE COMUNICATI, ANCHE IN QUALITÀ DI INCARICATI, NONCHÉ SUI DIRITTI DI ACCESSO AI DATI PERSONALI FORNITI CON FACOLTÀ DI CHIEDERNE L’AGGIORNAMENTO, LA RETTIFICA, L’INTEGRAZIONE E LA CANCELLAZIONE O OPPORSI ALL’INVIO DI COMUNICAZIONI COMMERCIALI. PER QUANTO SOPRA ESPRIMO IL MIO CONSENSO AL TRATTAMENTO DEI MIEI DATI PERSONALI NELLE MODALITÀ E PER LE FINALITÀ STRETTAMENTE CONNESSE E STRUMENTALI AI FINI STATUTARI DELLA SOCIETÀ."
                  label="Accetto"
                  registername="accetto1"
                />
                <CheckBox
                  text="QUANTO AL TRATTAMENTO EVENTUALE DEI MIEI DATI MEDICI, DA SVOLGERSI IN CONFORMITÀ A QUANTO INDICATO NELLA BACHECA DELL’ENTE SPORTIVO E NELLA SUDDETTA INFORMATIVA, CHE POTREBBERO VENIRE RICHIESTI AI SOLI FINI DELLO SVOLGIMENTO DA PARTE MIA DELL’ATTIVITÀ SPORTIVA (AGONISTICA E NON)."
                  label="Accetto"
                  registername="accetto2"
                />
                <CheckBox
                  text="QUANTO, INFINE, ALLA RIPRESA DI IMMAGINI E DI VIDEO DURANTE GLI EVENTI SPORTIVI CUI L’ENTE PARTECIPA, IN MERITO ALL’AUTORIZZAZIONE AD ESSERE RIPRESO IN IMMAGINI E VIDEO, NONCHÉ IN MERITO ALLA PUBBLICAZIONE DELLE IMMAGINI SCATTATE E DEI VIDEO RIPRESI IN TALI OCCASIONI, SUI SITI WEB E SUI SOCIAL, IL TUTTO SEMPRE IN CONFORMITÀ A QUANTO INDICATO NELLA BACHECA DELL’ENTE SPORTIVO E NELLA SUDDETTA INFORMATIVA."
                  label="Accetto"
                  registername="accetto3"
                />
                <CheckBox
                  text="QUANTO ALLA PUBBLICAZIONE SUI SITI WEB E SUI SOCIAL, DELLE STESSE FOTOGRAFIE E VIDEO, CON MODALITÀ DI RICONOSCIMENTO, CONTRASSEGNATURA E TAGGATURA DELLE IMMAGINI, COSÌ DA RIPORTARE AVVISO PUBBLICO DEL MATERIALE PUBBLICATO NELLE PAGINE PERSONALI DEL TESSERATO SUL SOCIAL NETWORK."
                  label="Accetto"
                  registername="accetto4"
                />
                <CheckBox
                  text="FIRMANDO LA PRESENTE DICHIARO DI AVER LETTO ATTENTAMENTE IL CONTENUTO DELL’INFORMATIVA FORNITA AI SENSI DEL REGOLAMENTO UE N° 2016/679 E DI AVERNE RICEVUTO COPIA. INOLTRE MI IMPEGNO A LEGGERE QUANTO VERRÀ PUBBLICATO E SPECIFICATO NELLA BACHECA DELL’ENTE IN MERITO ALLO SVOLGIMENTO DEGLI EVENTI SPORTIVI CUI L’ENTE DECIDERÀ DI ADERIRE E AD EVENTUALE ULTERIORE NECESSARIA INFORMATIVA PRIVACY E RACCOLTA DI CONSENSO. MI IMPEGNO ALTRESÌ A COMUNICARE TEMPESTIVAMENTE LE EVENTUALI VARIAZIONI DEI DATI."
                  label="Accetto"
                  registername="accetto5"
                />
              </Section>
              {sendMail.isSuccess ? (
                <>
                  <div className=" btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-green-600 ">
                    <p className="text-green-100 font-bold ">
                      Hai compilato con sucesso il modulo A !!!
                    </p>
                    <div className="p-2 w-10 h-10 flex items-center bg-green-300 rounded-md">
                     <svg xmlns="http://www.w3.org/2000/svg" className="fill-green-600" viewBox="0 0 640 512">
                         <path className="opacity-40" d="M51.26 152.2L31.26 100.3C46.62 71.85 66.04 45.97 88.75 23.39L132 37.81C96.46 68.47 68.47 107.7 51.26 152.2zM55.14 12.18C40.89 27.64 27.99 44.36 16.6 62.14L1.067 21.74C-1.156 15.97 .1552 9.423 4.433 4.947C8.71 .4702 15.19-1.136 21.06 .8215L55.14 12.18zM182.4 236.8C175.3 231.5 173.9 221.5 179.2 214.4C209.6 173.9 270.4 173.9 300.8 214.4C306.1 221.5 304.7 231.5 297.6 236.8C290.5 242.1 280.5 240.7 275.2 233.6C257.6 210.1 222.4 210.1 204.8 233.6C199.5 240.7 189.5 242.1 182.4 236.8V236.8zM342.4 236.8C335.3 231.5 333.9 221.5 339.2 214.4C369.6 173.9 430.4 173.9 460.8 214.4C466.1 221.5 464.7 231.5 457.6 236.8C450.5 242.1 440.5 240.7 435.2 233.6C417.6 210.1 382.4 210.1 364.8 233.6C359.5 240.7 349.5 242.1 342.4 236.8zM512 255.1C512 229.5 533.5 207.1 560 207.1H592C618.5 207.1 640 229.5 640 255.1V319.1C640 346.5 618.5 368 592 368H400C391.2 368 384 360.8 384 352C384 343.2 391.2 336 400 336H592C600.8 336 608 328.8 608 319.1V255.1C608 247.2 600.8 239.1 592 239.1H560C551.2 239.1 544 247.2 544 255.1C544 264.8 551.2 271.1 560 271.1H576C584.8 271.1 592 279.2 592 287.1C592 296.8 584.8 303.1 576 303.1H560C533.5 303.1 512 282.5 512 255.1z"/>
                         <path className="opacity-100" d="M531.7 400C485.6 467.6 407.1 512 320 512C178.6 512 64 397.4 64 256C64 114.6 178.6 0 320 0C433.4 0 529.7 73.79 563.3 176H560C515.8 176 480 211.8 480 256C480 274 485.1 290.6 495.1 304H416C414.1 304 413.1 304 412.1 304.1C411.8 301.8 410.3 299.7 408.7 297.7C404.4 292.5 398.5 287.1 391.9 284.3C378.7 276.9 361.4 272 344 272C340.4 272 337.2 274.5 336.3 277.1C335.3 281.5 336.9 285.2 340.1 286.1L340.1 286.1L340.3 287.1C340.5 287.2 340.8 287.4 341.2 287.7C342 288.1 343.2 288.9 344.6 289.8C347.4 291.6 351.2 294.3 354.8 297.4C358.6 300.5 362 303.1 364.5 307.4C366.1 310.1 368 313.8 368 315.1C368 318.2 366.1 321 364.5 324.6C362 328 358.6 331.5 354.8 334.6C351.2 337.7 347.4 340.4 344.6 342.2C343.2 343.1 342 343.9 341.2 344.3C340.8 344.6 340.5 344.8 340.3 344.9L340.1 345L340.1 345C337.6 346.4 336 349.1 336 352C336 354.9 337.6 357.6 340.1 358.1L340.1 358.1L340.3 359.1C340.5 359.2 340.8 359.4 341.2 359.7C342 360.1 343.2 360.9 344.6 361.8C347.4 363.6 351.2 366.3 354.8 369.4C358.6 372.5 362 375.9 364.5 379.4C366.1 382.1 368 385.8 368 388C368 390.2 366.1 393 364.5 396.6C362 400 358.6 403.5 354.8 406.6C351.2 409.7 347.4 412.4 344.6 414.2C343.2 415.1 342 415.9 341.2 416.3C340.8 416.6 340.5 416.8 340.3 416.9L340.1 417L340.1 417C336.9 418.8 335.3 422.5 336.3 426C337.2 429.5 340.4 431.1 344 431.1C361.4 431.1 378.7 427.1 391.9 419.7C398.5 416 404.4 411.5 408.7 406.3C410.3 404.3 411.8 402.2 412.1 399.9C413.1 399.1 414.1 399.1 416 399.1L531.7 400zM297.6 236.8C304.7 231.5 306.1 221.5 300.8 214.4C270.4 173.9 209.6 173.9 179.2 214.4C173.9 221.5 175.3 231.5 182.4 236.8C189.5 242.1 199.5 240.7 204.8 233.6C222.4 210.1 257.6 210.1 275.2 233.6C280.5 240.7 290.5 242.1 297.6 236.8zM364.8 233.6C382.4 210.1 417.6 210.1 435.2 233.6C440.5 240.7 450.5 242.1 457.6 236.8C464.7 231.5 466.1 221.5 460.8 214.4C430.4 173.9 369.6 173.9 339.2 214.4C333.9 221.5 335.3 231.5 342.4 236.8C349.5 242.1 359.5 240.7 364.8 233.6z"/>
                     </svg>
                    </div>
                  </div>
                  <Link href="/b">
                  <a className=" btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-[#1E137C] ">
                    <p className="text-[#c8c5e6] font-bold ">
                      Compila il modulo B
                    </p>
                    <div className="p-3 w-10 h-10 flex items-center bg-[#9E95EE] rounded-md ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-[#1E137C]"
                        viewBox="0 0 320 512"
                      >
                        <path d="M257.1 242.4C276.1 220.1 288 191.6 288 160c0-70.58-57.42-128-128-128H32c-17.67 0-32 14.33-32 32v384c0 17.67 14.33 32 32 32l160-.0049c70.58 0 128-57.42 128-128C320 305.3 294.6 264.8 257.1 242.4zM64 96.01h96c35.3 0 64 28.7 64 64s-28.7 64-64 64H64V96.01zM192 416H64v-128h128c35.3 0 64 28.7 64 64S227.3 416 192 416z" />
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
              ):(
              <button
                className={sendMail.isLoading ?"w-full p-4 bg-sky-900 drop-shadow-2xl rounded-xl text-white font-bold" : "w-full p-4 bg-sky-600 drop-shadow-2xl rounded-xl text-white font-bold"}
                type="submit"
                disabled={sendMail.isLoading}
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
