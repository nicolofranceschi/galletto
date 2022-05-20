
import DatiAnagrafici from "../forms/DatiAnagrafici";
import { useForm, FormProvider } from "react-hook-form";
import Section from "../components/Section";
import CheckBox from "../components/CheckBox";
import toast from "react-hot-toast";
import useLocalStorage from "../hooks/useLocalStorage";
import { upload } from "../firebase/storage";
import { useState, useCallback } from "react";
import Compressor from 'compressorjs';
import { useDropzone } from "react-dropzone";

const compressFile = async (file) =>
  new Promise((success, error) => {
    new Compressor(file, { quality: 0.1, success, error });
  });

export default function A() {

  const [storedValues,setStoredValue] = useLocalStorage("DA", {});

  const methods = useForm({ mode: "onChange" , defaultValues: storedValues});
  const [files, setFiles] = useState([]);
  
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const files = await Promise.all(
        acceptedFiles.map(async file => ({
          file: !file.type.startsWith('image') ? file : await compressFile(file),
          preview: URL.createObjectURL(file),
        })),
      );
      const urls = await Promise.all(files.map(({ file }) => upload({ file, name: file.name, setPercent })));
      console.log(urls)
      setFiles(files.map(({ preview }, i) => ({ preview, url: urls[i] })));
    },
    [],
    );
    
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = (data) => {
    const valuetostore = Object.entries(data).reduce((acc, [key,val]) => {return key.startsWith("DA") ? { ...acc,[key]: val} : acc},{})
    console.log(valuetostore);
    setStoredValue(valuetostore);
    toast.success("Dati salvati sul tuo dispositivo");
  };

  const [percent, setPercent] = useState(0);

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
          <div className="absolute right-0 top-0  p-4 sm:w-3/5 h-screen w-screen">
            <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2 bg-white p-4 rounded-xl drop-shadow-lg ">
                <h3>DOMANDA DI TESSERAMENTO ALLA GSA SSD RL</h3>
                <p>Mod.A</p>
                <p onClick={()=> methods.reset()}>reset</p>
              </div>
              <DatiAnagrafici />
              <Section>
                <CheckBox
                  text="DICHIARA INOLTRE DI ESSERE A CONOSCENZA CHE SARÀ TESSERATO PER L’ASI-ASSOCIAZIONI SPORTIVE E SOCIALI ITALIANE, SU RICHIESTA SOTTOSCRITTA E INOLTRATA PER IL TRAMITE DELLA SOCIETÀ SPORTIVA DILETTANTISTICA GALLETTO SPORT ACADEMY SSD A RL, PER LA QUALE INTENDE SVOLGERE L’ATTIVITÀ SPORTIVA. DICHIARA, DI AVER PRESO VISIONE DELLO STATUTO SOCIALE E DEL REGOLAMENTO INTERNO. DICHIARA, ALTRESÌ DI ACCETTARE E DI RISPETTARE INTEGRALMENTE LO STATUTO SOCIALE ED IL REGOLAMENTO, CONDIVIDENDONE LE FINALITÀ ISTITUZIONALI ED I VALORI"
                  label="Accettazione di presa visione del"
                  registername="regolamento"
                >
                  <a href="http://www.gallettovacanze.it/wp-content/uploads/2022/05/REGOLAMENTO.GSA_.SSD_.2022.pdf">
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
              <div {...getRootProps()} className="w-52 h-32 border-2 border-gray-600">
                <input {...getInputProps()} />
              </div>
              {percent}
              <input type="submit" />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
