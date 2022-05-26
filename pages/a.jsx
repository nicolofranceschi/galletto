import DatiAnagrafici from '../forms/DatiAnagrafici';
import { useForm, FormProvider } from 'react-hook-form';
import Section from '../components/Section';
import CheckBox from '../components/CheckBox';
import toast from 'react-hot-toast';
import useLocalStorage from '../hooks/useLocalStorage';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { createDocument } from '../firebase/db';
import { HomeIcon, ModuloBIcon, ResetIcon, SuccessIcon } from '../components/Icons';

export default function A() {
  const [storedValues, setStoredValue] = useLocalStorage('da', {});

  const methods = useForm({ mode: 'onChange', defaultValues: storedValues });

  const { mutateAsync, isSuccess, isLoading } = useMutation(({ data }) =>
    fetch('api/sendA', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  );

  const saveSubmit = useMutation(data => createDocument('a', data));

  const onSubmit = async sub => {
    const valuetostore = Object.entries(sub).reduce((acc, [key, val]) => (key.startsWith('da') ? { ...acc, [key]: val } : acc), {});
    setStoredValue(valuetostore);
    toast.success('Dati salvati sul tuo dispositivo');
    saveSubmit.mutate(sub, {
      onSuccess: res => {
        toast.success('Dati salvati sul server');
        toast.promise(mutateAsync({ data: { ...sub, key: res.id } }), {
          loading: 'Caricamento..',
          success: <b>Form inviata</b>,
          error: <b>Ci dispiace qualcosa è andato storto</b>,
        });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form className='text-sm' onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='bg-slate-50'>
          <div className='fixed top-0 sm:w-2/5 h-screen w-screen'>
            <div className='relative p-4 h-full'>
              <div className='bg-[#DBBDC4] relative overflow-hidden rounded-xl  h-full'>
                <p className='text-[115vh] absolute top-[50%] right-[-20%] font-bold text-[#693A44]'>A</p>
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
                  <h3>DOMANDA DI TESSERAMENTO ALLA GSA SSD RL</h3>
                  <p>Mod.A</p>
                </div>
              </div>
              <button type='reset' className=' btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-slate-400 hover:bg-slate-600 '>
                <p className='text-slate-300 font-bold '>Svuota il form</p>
                <div type='reset' className='p-3 w-10 h-10 bg-slate-300 rounded-md'>
                  <ResetIcon />
                </div>
              </button>
              <DatiAnagrafici />
              <Section title='SIA ISCRITTO ALLA GALLETTO SPORT ACCADEMY SSD a RL'>
                <CheckBox
                  text='DICHIARA INOLTRE DI ESSERE A CONOSCENZA CHE SARÀ TESSERATO PER L’ASI-ASSOCIAZIONI SPORTIVE E SOCIALI ITALIANE, SU RICHIESTA SOTTOSCRITTA E INOLTRATA PER IL TRAMITE DELLA SOCIETÀ SPORTIVA DILETTANTISTICA GALLETTO SPORT ACADEMY SSD A RL, PER LA QUALE INTENDE SVOLGERE L’ATTIVITÀ SPORTIVA. DICHIARA, DI AVER PRESO VISIONE DELLO STATUTO SOCIALE E DEL REGOLAMENTO INTERNO. DICHIARA, ALTRESÌ DI ACCETTARE E DI RISPETTARE INTEGRALMENTE LO STATUTO SOCIALE ED IL REGOLAMENTO, CONDIVIDENDONE LE FINALITÀ ISTITUZIONALI ED I VALORI'
                  label='Accettazione di presa visione del'
                  name='regolamento'
                >
                  <a href='http://www.gallettovacanze.it/wp-content/uploads/2022/05/REGOLAMENTO.GSA_.SSD_.2022.pdf'>Regolamento ssd</a>
                </CheckBox>
              </Section>
              <Section title='Manifestazione del consenso (art. 7 Regolamento UE n. 2016/679)'>
                <CheckBox
                  text='IO SOTTOSCRITTO/A, LETTA L’INFORMATIVA EX ART 13 DEL REGOLAMENTO UE 2016/679, DICHIARO DI ESSERE STATO INFORMATO SULLE FINALITÀ E LE MODALITÀ DI TRATTAMENTO CUI SONO DESTINATI I DATI, I SOGGETTI A CUI GLI STESSI POTRANNO ESSERE COMUNICATI, ANCHE IN QUALITÀ DI INCARICATI, NONCHÉ SUI DIRITTI DI ACCESSO AI DATI PERSONALI FORNITI CON FACOLTÀ DI CHIEDERNE L’AGGIORNAMENTO, LA RETTIFICA, L’INTEGRAZIONE E LA CANCELLAZIONE O OPPORSI ALL’INVIO DI COMUNICAZIONI COMMERCIALI. PER QUANTO SOPRA ESPRIMO IL MIO CONSENSO AL TRATTAMENTO DEI MIEI DATI PERSONALI NELLE MODALITÀ E PER LE FINALITÀ STRETTAMENTE CONNESSE E STRUMENTALI AI FINI STATUTARI DELLA SOCIETÀ.'
                  label='Accetto'
                  name='accetto1'
                />
                <CheckBox
                  text='QUANTO AL TRATTAMENTO EVENTUALE DEI MIEI DATI MEDICI, DA SVOLGERSI IN CONFORMITÀ A QUANTO INDICATO NELLA BACHECA DELL’ENTE SPORTIVO E NELLA SUDDETTA INFORMATIVA, CHE POTREBBERO VENIRE RICHIESTI AI SOLI FINI DELLO SVOLGIMENTO DA PARTE MIA DELL’ATTIVITÀ SPORTIVA (AGONISTICA E NON).'
                  label='Accetto'
                  name='accetto2'
                />
                <CheckBox
                  text='QUANTO, INFINE, ALLA RIPRESA DI IMMAGINI E DI VIDEO DURANTE GLI EVENTI SPORTIVI CUI L’ENTE PARTECIPA, IN MERITO ALL’AUTORIZZAZIONE AD ESSERE RIPRESO IN IMMAGINI E VIDEO, NONCHÉ IN MERITO ALLA PUBBLICAZIONE DELLE IMMAGINI SCATTATE E DEI VIDEO RIPRESI IN TALI OCCASIONI, SUI SITI WEB E SUI SOCIAL, IL TUTTO SEMPRE IN CONFORMITÀ A QUANTO INDICATO NELLA BACHECA DELL’ENTE SPORTIVO E NELLA SUDDETTA INFORMATIVA.'
                  label='Accetto'
                  name='accetto3'
                />
                <CheckBox
                  text='QUANTO ALLA PUBBLICAZIONE SUI SITI WEB E SUI SOCIAL, DELLE STESSE FOTOGRAFIE E VIDEO, CON MODALITÀ DI RICONOSCIMENTO, CONTRASSEGNATURA E TAGGATURA DELLE IMMAGINI, COSÌ DA RIPORTARE AVVISO PUBBLICO DEL MATERIALE PUBBLICATO NELLE PAGINE PERSONALI DEL TESSERATO SUL SOCIAL NETWORK.'
                  label='Accetto'
                  name='accetto4'
                />
                <CheckBox
                  text='FIRMANDO LA PRESENTE DICHIARO DI AVER LETTO ATTENTAMENTE IL CONTENUTO DELL’INFORMATIVA FORNITA AI SENSI DEL REGOLAMENTO UE N° 2016/679 E DI AVERNE RICEVUTO COPIA. INOLTRE MI IMPEGNO A LEGGERE QUANTO VERRÀ PUBBLICATO E SPECIFICATO NELLA BACHECA DELL’ENTE IN MERITO ALLO SVOLGIMENTO DEGLI EVENTI SPORTIVI CUI L’ENTE DECIDERÀ DI ADERIRE E AD EVENTUALE ULTERIORE NECESSARIA INFORMATIVA PRIVACY E RACCOLTA DI CONSENSO. MI IMPEGNO ALTRESÌ A COMUNICARE TEMPESTIVAMENTE LE EVENTUALI VARIAZIONI DEI DATI.'
                  label='Accetto'
                  name='accetto5'
                />
              </Section>
              {isSuccess ? (
                <>
                  <div className=' btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-green-600 '>
                    <p className='text-green-100 font-bold '>Hai compilato con successo il modulo A !!!</p>
                    <div className='p-2 w-10 h-10 flex items-center bg-green-300 rounded-md'>
                      <SuccessIcon />
                    </div>
                  </div>
                  <Link href='/b'>
                    <a className=' btn flex gap-2 p-4 rounded-xl drop-shadow-lg justify-between items-center bg-[#1E137C] '>
                      <p className='text-[#c8c5e6] font-bold '>Compila il modulo B</p>
                      <div className='p-3 w-10 h-10 flex items-center bg-[#9E95EE] rounded-md '>
                        <ModuloBIcon />
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
                <button
                  className={isLoading ? 'w-full p-4 bg-sky-900 drop-shadow-2xl rounded-xl text-white font-bold' : 'w-full p-4 bg-sky-600 drop-shadow-2xl rounded-xl text-white font-bold'}
                  type='submit'
                  disabled={isLoading}
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
