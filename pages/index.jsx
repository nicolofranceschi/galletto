export default function Home() {
  return (
    <div className="p-4 sm:h-screen bg-slate-100 flex flex-col gap-4">
      <div className="drop-shadow-lg  p-4 rounded-xl text-white bg-indigo-700">
        <h2>Benvenuto nelle iscrizoni per Galleto Summer 2020</h2>
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
          IBAN: <strong>IT22D 08542 36700 0540 00310763</strong>
        </p>
        <p> Galletto Sport Academy ssd a rl</p>
        <p> Via Ambrogini, 5 -40022 Castel del Rio BO</p>
        <p> P.Iva/CF: 03812341208</p>
      </div>
      <div className="flex flex-col sm:flex-row h-full gap-4">
        <div className=" flex flex-col flex-grow gap-4 ">
          <div className="flex flex-grow flex-col p-4 rounded-xl drop-shadow-lg bg-white justify-between">
            <p className="top-4 left-4 font-bold">
              DOMANDA DI TESSERAMENTO ALLA GSA SSD RL
            </p>
            <div className="flex justify-end">
              <div className="hover:drop-shadow-xl cursor-pointer flex gap-2 items-center bg-[#DBBDC4] p-2 rounded-xl ">
                <h3 className="text-white">Modulo</h3>
                <h2 className="font-bold text-2xl text-[#693A44]">A</h2>
              </div>
            </div>
          </div>
          <div className=" flex flex-grow flex-col p-4 rounded-xl drop-shadow-lg bg-white justify-between">
            <p className="top-4 left-4 font-bold">
              DOMANDA DI ISCRIZIONE CAMP SUMMER 2022
            </p>
            <div className="flex justify-end">
              <div className="hover:drop-shadow-xl cursor-pointer bottom-4 right-4 flex gap-2 items-center bg-[#9E95EE] p-2 rounded-xl ">
                <h3 className="text-white">Modulo</h3>
                <h2 className="font-bold text-2xl text-[#1E137C]">B</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow flex flex-col gap-8 p-4 rounded-xl drop-shadow-lg bg-white justify-between">
          <div className="font-bold flex flex-col gap-2 pr-4">
            <p>
              DOMANDA DI TESSERAMENTO ALLA GSA SSD RL e DOMANDA DI ISCRIZIONE
              CAMP SUMMER 2022
            </p>
            <div className="drop-shadow-lg p-4 rounded-xl text-white bg-indigo-400">
              <p>
                Se non sei ancora tesseraro oppure è passato più di un anno dal
                tuo ultimo tesseremanto e vuoi iscriverti a Galletto Summer 2022
                compila questo modulo
              </p>
            </div>
          </div>
          <div className="hover:drop-shadow-xl cursor-pointer flex gap-2 items-center justify-end">
            <div className="  flex gap-2 items-center bg-[#DBBDC4] p-2 rounded-xl ">
              <h3 className="text-white">Modulo</h3>
              <h2 className="font-bold text-2xl text-[#693A44]">A</h2>
            </div>
            <p className="font-bold text-lg">+</p>
            <div className="  flex gap-2 items-center bg-[#9E95EE] p-2 rounded-xl ">
              <h3 className="text-white">Modulo</h3>
              <h2 className="font-bold text-2xl text-[#1E137C]">B</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
