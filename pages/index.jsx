import Link from "next/link";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="p-4 bg-slate-100 flex flex-col gap-4">
      <div className="drop-shadow-lg  p-4 rounded-xl text-white bg-indigo-700">
        <h2>Benvenuto alle iscrizioni per Galletto Summer 2022</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href="/a">
          <a className="flex text-black flex-grow flex-col p-4 rounded-xl drop-shadow-lg hover:drop-shadow-2xl bg-white justify-between">
            <p className="p-1 font-bold">
              DOMANDA DI TESSERAMENTO ALLA GSA SSD RL - MODULO A
            </p>
            <div className="bg-[#DBBDC4] relative overflow-hidden rounded-xl h-[70vh]">
              <p className="text-[115vh] absolute top-[-60%] right-[-10%] font-bold text-[#693A44]">
                A
              </p>
            </div>
          </a>
        </Link>
        <Link href="/b">
          <a className="flex text-black flex-grow flex-col p-4 rounded-xl drop-shadow-lg hover:drop-shadow-2xl bg-white justify-between">
            <p className="p-1 font-bold">
              DOMANDA DI ISCRIZIONE CAMP SUMMER 2022 - MODULO B
            </p>
            <div className="bg-[#9E95EE] relative overflow-hidden rounded-xl h-[70vh]">
              <p className="text-[115vh] absolute top-[-60%] right-[-10%] font-bold text-[#1E137C]">
                B
              </p>
            </div>
          </a>
        </Link>
      </div>
      <div className="drop-shadow-lg flex flex-col gap-2 p-4 rounded-xl bg-white">
        <p>
          Compilando i seguenti Moduli A e/o B, ti dichiari genitore o tutore
          del minore che intendi iscrivere ad uno dei nostri Camp sportivi.
        </p>
        <p>
          Sarà necessario effettuare <strong>IN ANTICIPO</strong> il Bonifico
          della quota risultante dopo aver consultato alla pagina info e costi
          le varie proposte e i relativi sconti/agevolazioni riportando negli
          appositi campi il nome dell’Ordinante e la data in cui è stato
          effettuato il bonifico.
        </p>
        <hr></hr>
        <p>
          Dati di <strong>Galletto Sport Academy:</strong>
        </p>
        <p>
          IBAN: <strong>IT79Q 08542 36700 0000 0031 0763</strong>
        </p>
        <p> Galletto Sport Academy ssd a rl</p>
        <p> Via Ambrogini, 5 -40022 Castel del Rio BO</p>
        <p> P.Iva/CF: 03812341208</p>
      </div>
      <div className="p-4 rounded-xl drop-shadow-lg bg-white flex justify-between items-center">
        <p>Powerd by</p>
        <div className="flex gap-4 items-center">
          <Link href="https://www.pineappsrl.com/">
            <a target="_blank">
             <Logo />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
