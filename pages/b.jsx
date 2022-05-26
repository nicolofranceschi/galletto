import DatiAnagrafici from '../forms/DatiAnagrafici';
import { useForm, FormProvider } from 'react-hook-form';
import Section from '../components/Section';
import CheckBox from '../components/CheckBox';
import toast from 'react-hot-toast';
import useLocalStorage from '../hooks/useLocalStorage';
import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import Link from 'next/link';
import { useMutation } from 'react-query';
import Number from '../components/Number';
import Wrapper from '../components/Wrapper';
import Input from '../components/Input';
import DatePicker from '../components/Date';
import { createDocument } from '../firebase/db';
import { classes } from '../utils';
import { HomeIcon, ModuloAIcon, ResetIcon, ResidenceIcon, Sport2Icon, Sport3Icon, Sport4Icon, SuccessIcon } from '../components/Icons';

const toggleValue = e => value => e.some(a => a === value) ? e.filter(a => a !== value) : [...e, value];

export default function B() {
  const [storedValues, setStoredValue] = useLocalStorage('da', {});

  const methods = useForm({ mode: 'onChange', defaultValues: storedValues });

  const [files, setFiles] = useState([]);

  const [percent, setPercent] = useState(0);

  const [camp, setCamp] = useState([]);

  const { mutateAsync, isSuccess, isLoading } = useMutation(({ data }) =>
    fetch('api/sendB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  );

  const saveSubmit = useMutation(({ data }) => createDocument('b', data));

  const onSubmit = async data => {
    const API = { ...data, files, camp };
    const valuetostore = Object.entries(data).reduce((acc, [key, val]) => (key.startsWith('da') ? { ...acc, [key]: val } : acc), {});
    if (percent !== 0) {
      toast.error('Attendere il caricamento dei file');
      return;
    }
    if (files.length === 0) {
      toast.error('Il certificato medico è obbligatorio');
      return;
    }
    if (camp.length === 0 && data.Settimanepersonalizzate === '') {
      toast.error('Devi Selezionare almeno un camp o una settimana personalazzita');
      return;
    }
    setStoredValue(valuetostore);
    toast.success('Dati salvati sul tuo dispositivo');
    saveSubmit.mutate(
      { data: API },
      {
        onSuccess: res => {
          toast.success('Dati salvati sul server');
          toast.promise(mutateAsync({ data: { ...API, key: res.id } }), {
            loading: 'Caricamento..',
            success: <b>Form inviata</b>,
            error: <b>Ci dispiace qualcosa è andato storto</b>,
          });
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form className='text-sm' onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='bg-slate-50'>
          <div className='fixed top-0 sm:w-2/5 h-screen w-screen'>
            <div className='relative p-4 h-full'>
              <div className='bg-[#9E95EE] relative overflow-hidden rounded-xl  h-full'>
                <p className='text-[115vh] absolute top-[50%] right-[-20%] font-bold text-[#1E137C]'>B</p>
              </div>
            </div>
          </div>
          <div className='absolute right-0 top-0 p-2 md:p-4 sm:w-3/5 h-screen w-screen'>
            <div className='p-2 md:p-4 flex flex-col gap-4'>
              <div className='flex flex-wrap gap-4'>
                <Link href='/'>
                  <a className='btn flex p-4 flex-grow rounded-xl drop-shadow-lg justify-start md:justify-center items-center bg-white '>
                    <HomeIcon />
                  </a>
                </Link>
                <div className='flex flex-grow gap-2 flex-col bg-white p-4 rounded-xl drop-shadow-lg  '>
                  <h3>DOMANDA DI ISCRIZIONE CAMP SUMMER 2022</h3>
                  <p>Mod.B</p>
                </div>
              </div>
              <button type='reset' className=' btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-slate-400 hover:bg-slate-600 '>
                <p className='text-slate-300 font-bold '>Svuota il form</p>
                <div type='reset' className='p-3 w-10 h-10 bg-slate-300 rounded-md'>
                  <ResetIcon />
                </div>
              </button>
              <DatiAnagrafici />
              <Section family='EM_' title='CONTATTI URGENTI (ALMENO UNO DEI DUE NUMERI DEVE ESSERE SEMPRE ATTIVO DURANTE IL CAMP) (QUESTO TELEFONO SARÀ UTILIZZATO PER LE COMUNICAZIONI BROADCAST)'>
                <Wrapper title='Numeri di emergenza'>
                  <Number name='Emergenza1' />
                  <Number name='Emergenza2' />
                </Wrapper>
              </Section>
              <Section family='AL_' title='ALLERGIE, INTOLLERANZE ALIMENTARI'>
                <Wrapper title='Allergie (se non presenti indicare nulla)'>
                  <Input name='Allergie' />
                </Wrapper>
              </Section>
              <Section title='SIA ISCRITTO AL CAMP SUMMER 2022'>
                <div className='flex flex-col gap-3'>
                  <Item
                    value='Galletto Residence'
                    activeClassName='bg-cyan-900 border-cyan-500'
                    inactiveClassName='border-cyan-700 bg-cyan-700 hover:bg-cyan-800'
                    dates='12/06 - 19/06'
                    price='400€'
                    infoClassName='text-cyan-500'
                    camp={camp}
                    setCamp={setCamp}
                  />

                  <div className='flex flex-wrap gap-3'>
                    <Item
                      value='Galletto Sport 1 Turno'
                      activeClassName='bg-orange-900 border-orange-500'
                      inactiveClassName='border-orange-700 bg-orange-700 hover:bg-orange-800'
                      dates='da lunedì 06/06 a venerdì 17/06'
                      price='280€'
                      infoClassName='text-orange-500'
                      camp={camp}
                      setCamp={setCamp}
                      Icon={ResidenceIcon}
                    />
                    <Item
                      value='Galletto Sport 2 Turno'
                      activeClassName='bg-orange-900 border-orange-500'
                      inactiveClassName='border-orange-700 bg-orange-700 hover:bg-orange-800'
                      dates='da lunedì 20/06 a venerdì 01/07'
                      price='280€'
                      infoClassName='text-orange-500'
                      camp={camp}
                      setCamp={setCamp}
                      Icon={Sport2Icon}
                    />
                    <Item
                      value='Galletto Sport 3 Turno'
                      activeClassName='bg-orange-900 border-orange-500'
                      inactiveClassName='border-orange-700 bg-orange-700 hover:bg-orange-800'
                      dates='da lunedì 04/07 a venerdì 15/07'
                      price='280€'
                      infoClassName='text-orange-500'
                      camp={camp}
                      setCamp={setCamp}
                      Icon={Sport3Icon}
                    />
                    <Item
                      value='Galletto Sport 4 Turno'
                      activeClassName='bg-orange-900 border-orange-500'
                      inactiveClassName='border-orange-700 bg-orange-700 hover:bg-orange-800'
                      dates='da lunedì 18/07 a venerdì 29/07'
                      price='280€'
                      infoClassName='text-orange-500'
                      camp={camp}
                      setCamp={setCamp}
                      Icon={Sport4Icon}
                    />
                  </div>
                  <div className='flex flex-col flex-grow gap-2 justify-center p-4 border-4 border-slate-700 bg-slate-700 rounded-lg cursor-pointer'>
                    <h3 className='text-white'>oppure scegli una range di date peronalizzato</h3>
                    <div className='flex flex-grow flex-col gap-1'>
                      <input type='text' className='w-full p-2 rounded-md bg-slate-400 text-white' {...methods.register('Settimanepersonalizzate')} />
                      <span className='text-slate-500 text-sm font-bold'>Inserisci le date che preferiresti</span>
                    </div>
                  </div>
                </div>
              </Section>
              <Section title='Con servizio di trasporto'>
                <Wrapper title='Indicare la fermata del Galletto Bus'>
                  <select {...methods.register('fermata')}>
                    <option value='Nessun Servizio di Trasporto'>Nessun Servizio di Trasporto</option>
                    <option value='Imola S.Zennaro'>Imola S.Zennaro</option>
                    <option value='Imola Centro Sociale Tozzona'>Imola Centro Sociale Tozzona</option>
                    <option value='Ponticelli'>Ponticelli</option>
                    <option value='Fabbrica'>Fabbrica</option>
                    <option value='Casalfiumanese SS Montanara'>Casalfiumanese SS Montanara</option>
                    <option value='Borgo Riviera'>Borgo Riviera</option>
                    <option value='Borgo Mescola'>Borgo Mescola</option>
                    <option value='Borgo Centro'>Borgo Centro</option>
                    <option value='Fontanelice S.Giovanni'>Fontanelice S.Giovanni</option>
                    <option value='Fontanelice Centro'>Fontanelice Centro</option>
                    <option value='Fontanelice 2D'>Fontanelice 2D</option>
                    <option value='Fontanelice Campomoro'>Fontanelice Campomoro</option>
                  </select>
                </Wrapper>
                <Wrapper title='Fermata supplementare (da concordare preventivamente con la direzione)'>
                  <div className='flex flex-grow flex-col gap-1'>
                    <input type='text' className='w-full p-2 rounded-md' {...methods.register('fermatacustom')} />
                    <span>Fermata Supplementare</span>
                  </div>
                </Wrapper>
                <Wrapper title='Note Varie'>
                  <div className='flex flex-grow flex-col gap-1'>
                    <textarea type='text' className='w-full p-2 rounded-md' {...methods.register('note')} />
                    <span>Note</span>
                  </div>
                </Wrapper>
              </Section>
              <Section title='Manifestazione del consenso e presa visione (Privacy, Regolamento UE n. 2016/679 - Regolamento SSD e Campi estivi)'>
                <CheckBox
                  text='DICHIARO di aver provveduto al tesseramento del partecipante. 2. DICHIARO di aver preso visione del regolamento del camp, del regolamento interno e dello statuto della GSA ssd a rl condividendone le finalità istituzionali e i valori. 3. CONFERMO che in caso di rinuncia la quota ora saldata sarà restituita decurtata di 30.00 euro nel caso in cui la disdetta pervenga alla direzione in forma scritta almeno 15gg prima dell’inizio del camp oppure nel caso in cui disposizioni anticovid impediscano la realizzazione del camp. In tutti gli atri casi non sono previsti rimborsi parziali o totali o recuperi per giorni di assenza. 4. AUTORIZZO ad inviare comunicazioni tramite Email / SMS / WhatsApp in merito allo svolgimento delle attività SPORTIVE al telefono indicato sopra alla voce telefono principale utilizzato per comunicazioni broadcast. A tale scopo si richiede di salvare tra i propri contatti il numero 324 0957228, diversamente non sarà possibile ricevere i messaggi WhatsApp inviati tramite liste broadcast. 5. ACCETTO i termini e le condizioni della Privacy Policy'
                  label='Presa visione e accettazione dei'
                  name='accetto'
                >
                  <a href='http://www.gallettovacanze.it/privacy-policy/'>termini e condizioni della Privacy Policy</a>
                </CheckBox>
                <div className='flex flex-col gap-2'>
                  <span>
                    Assicurazione: rimborso dei giorni di assenza per malattia al costo di 10€ a settimana. La copertura prevede il rimborso di 20€ per ogni giorno di assenza causa malattia attestata
                    da certificato medico
                  </span>
                  <div className='flex gap-2 items-center'>
                    <input type='checkbox' id='assicurazione' name='assicurazione' {...methods.register('assicurazione')} />
                    <label htmlFor='assicurazione' className='flex flex-wrap gap-1'>
                      Attiva
                    </label>
                  </div>
                </div>
              </Section>
              <Section title='Carica copia del certificato medico-sportivo del partecipante al Camp (esonerati i bimbi sotto i 6 anni). Se il partecipante è residente in Emilia Romagna, vale COPIA DEL LIBRETTO DELLO SPORTIVO in corso di validità alla fine del camp. Tali documenti hanno scadenza 365gg dopo la visita medica.'>
                <FileUploader {...{ files, setFiles, percent, setPercent }} />
              </Section>
              <Section family='BC_' title='Dati relativi al pagamento effettuato a mezzo bonifico'>
                <Wrapper title='BONIFICO BANCARIO ORDINANTE (Cognome e Nome)'>
                  <Input name='Intestatario' />
                </Wrapper>
                <Wrapper title='BONIFICO BANCARIO (Data Valuta ovvero Data di accredito nel c/c della SSD) '>
                  <DatePicker name='data' />
                </Wrapper>
                <Wrapper title='BONIFICO BANCARIO (Importo Pagato)'>
                  <Input name='euro' />
                </Wrapper>
              </Section>

              {isSuccess ? (
                <>
                  <div className=' btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-green-600 '>
                    <p className='text-green-100 font-bold '>Hai compilato con successo il modulo B !!!</p>
                    <div className='p-2 w-10 h-10 flex items-center bg-green-300 rounded-md'>
                      <SuccessIcon />
                    </div>
                  </div>
                  <Link href='/a'>
                    <a className=' btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-[#693A44] '>
                      <p className='text-[#DBBDC4] font-bold '>Compila il modulo A</p>
                      <div className='p-3 w-10 h-10 flex items-center bg-[#DBBDC4] rounded-md '>
                        <ModuloAIcon />
                      </div>
                    </a>
                  </Link>
                  <Link href='/'>
                    <a className=' btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-white '>
                      <div className='p-3 flex items-center w-10 h-10 bg-slate-200 rounded-md'>
                        <HomeIcon />
                      </div>
                      <p className='text-black font-bold '>Torna alla home</p>
                    </a>
                  </Link>
                </>
              ) : (
                <button className='w-full p-4 bg-sky-600 drop-shadow-2xl rounded-xl text-white font-bold' type='submit'>
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

function Item({ value, dates, price, infoClassName, camp, setCamp, activeClassName, inactiveClassName, Icon }) {
  return (
    <div
      onClick={() => setCamp(toggleValue(value))}
      className={classes('flex flex-col flex-grow gap-2 justify-center items-center p-4 cursor-pointer rounded-lg border-4', camp.includes(value) ? activeClassName : inactiveClassName)}
    >
      <Icon />
      <h3 className='text-white'>{value}</h3>
      <h5 className={classes('font-bold', infoClassName)}>{dates}</h5>
      <p className={infoClassName}>{price}</p>
    </div>
  );
}
