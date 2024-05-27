import * as postmark from "postmark";
import { toArray } from 'streamtoarray';
import googleAuthConfig from "../../utils/google-auth-config";
const { google } = require("googleapis");

const PDFDocument = require("pdfkit");

if (!process.env.SENDGRID_API_KEY) throw new Error("Sendgrid API key not found.");

var months = { "Gennaio": "01", "Febbraio": "02", "Marzo": "03", "Aprile": "04", "Maggio": "05", "Giugno": "06", "Luglio": "07", "Agosto": "08", "Settembre": "09", "Ottobre": "10", "Novembre": "11", "Dicembre": "12" };

export default async function sendA(req, res) {

  const {
    da_cognome
    , da_cap
    , da_cap_minore
    , da_città
    , da_città_di_nascita
    , da_città_di_nascita_minore
    , da_città_minore
    , da_codice_fiscale
    , da_codice_fiscale_minore
    , da_cognome_minore
    , da_email
    , da_nome
    , da_nome_minore
    , da_numero_civico
    , da_numero_civico_minore
    , da_provincia
    , da_provincia_minore
    , da_provincia_di_nascita
    , da_provincia_di_nascita_minore
    , da_via
    , da_via_minore
    , da_cellulare
    , da_anno_datadinascitadelminore
    , da_anno_datadinascitadeltutore
    , da_giorno_datadinascitadelminore
    , da_giorno_datadinascitadeltutore
    , da_mese_datadinascitadelminore
    , da_mese_datadinascitadeltutore,
    key
  } = req.body;


  const auth = new google.auth.GoogleAuth({
    ...googleAuthConfig,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const authClientObject = await auth.getClient();
  const googleSheetsInstance = google.sheets({
    version: "v4",
    auth: authClientObject,
  });

  const spreadsheetId = "1gsSQ5pMJUjkBjr9eYkSbQ5nqpZ0ZVIwJg81qKujm5Nc";

  await googleSheetsInstance.spreadsheets.values.append({
    auth, //auth object
    spreadsheetId, //spreadsheet id
    range: "a!A:B", //sheet name and range of cells
    valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[
        new Date,
        da_cognome,
        da_nome,
        da_città_di_nascita,
        da_provincia_di_nascita,
        `0${da_giorno_datadinascitadeltutore}-0${months[da_mese_datadinascitadeltutore]}-${da_anno_datadinascitadeltutore}`,
        da_codice_fiscale,
        da_via,
        da_numero_civico,
        da_città,
        da_cap,
        da_provincia,
        da_cellulare,
        da_email,
        da_cognome_minore,
        da_nome_minore,
        da_città_di_nascita_minore,
        da_provincia_di_nascita_minore,
        `0${da_giorno_datadinascitadelminore}-0${months[da_mese_datadinascitadelminore]}-${da_anno_datadinascitadelminore}`,
        da_codice_fiscale_minore,
        da_via_minore,
        da_numero_civico_minore,
        da_città_minore,
        da_cap_minore,
        da_provincia_minore,
        "Accettata",
        "Accettato",
        "Accettato",
        "Accettato",
        "Accettato",
        key
      ]],
    },
  });

  const doc = new PDFDocument({ size: "A4" });
  doc.fontSize(12);
  doc.font('Helvetica-Bold')
  doc.text("Galletto Sport Academy  ssd  a  rl");
  doc.font('Helvetica')
  doc.fontSize(6);
  doc.text("Via Ambrogini, 5   -  40022 Castel del Rio   BO");
  doc.text("CF & P.IVA: 03812341208  -  Sdi: P62QHVQ");
  doc.text("Mail: info@gallettosport.it");
  doc.text("Pec: gallettosporacademy@pec.it");
  doc.fontSize(20);
  doc.font('Helvetica-Bold')
  doc.moveDown(1);
  doc.text("MODULO A - DOMANDA DI TESSERAMENTO ALLA SSD");
  doc.fontSize(12);
  doc.moveDown(1);
  doc.text("IL/LA SOTTOSCRITTO/A");
  doc.moveDown(0.2);
  doc.fontSize(10);
  doc.text(`${da_cognome} ${da_nome} nato a ${da_città_di_nascita} (${da_provincia_di_nascita}) il ${da_giorno_datadinascitadeltutore} ${da_mese_datadinascitadeltutore} ${da_anno_datadinascitadeltutore} `);
  doc.text(`Residente in ${da_via} ${da_numero_civico}, ${da_città} (${da_provincia}), ${da_cap}`);
  doc.text(`Codice Fiscale: ${da_codice_fiscale}`);
  doc.text(`Cellulare: ${da_cellulare}`);
  doc.text(`E-mail: ${da_email}`);
  doc.fontSize(12);
  doc.moveDown(1);
  doc.text("IN QUALITA' DI ESERCENTE LA RESPONSABILITA' GENITORIALE CHIEDE CHE IL SEGUENTE MINORE");
  doc.moveDown(0.2);
  doc.fontSize(10);
  doc.text(`${da_cognome_minore} ${da_nome_minore} nato a ${da_città_di_nascita_minore} (${da_provincia_di_nascita_minore}) il ${da_giorno_datadinascitadelminore} ${da_mese_datadinascitadelminore} ${da_anno_datadinascitadelminore} `);
  doc.text(`Residente in ${da_via_minore} ${da_numero_civico_minore}, ${da_città_minore} (${da_provincia_minore}), ${da_cap_minore}`);
  doc.text(`Codice Fiscale: ${da_codice_fiscale_minore}`);
  doc.moveDown(1);
  doc.fontSize(12);
  doc.text("SIA ISCRITTO ALLA GALLETTO SPORT ACCADEMY SSD a RL");
  doc.moveDown(0.2);
  doc.fontSize(7);
  doc.font('Helvetica')
  doc.text("DICHIARA INOLTRE DI ESSERE A CONOSCENZA CHE SARÀ TESSERATO PER L’ASI-ASSOCIAZIONI SPORTIVE E SOCIALI ITALIANE, SU RICHIESTA SOTTOSCRITTA E INOLTRATA PER IL TRAMITE DELLA SOCIETÀ SPORTIVA DILETTANTISTICA GALLETTO SPORT ACADEMY SSD A RL, PER LA QUALE INTENDE SVOLGERE L’ATTIVITÀ SPORTIVA. DICHIARA, DI AVER PRESO VISIONE DELLO STATUTO SOCIALE E DEL REGOLAMENTO INTERNO. DICHIARA, ALTRESÌ DI ACCETTARE E DI RISPETTARE INTEGRALMENTE LO STATUTO SOCIALE ED IL REGOLAMENTO, CONDIVIDENDONE LE FINALITÀ ISTITUZIONALI ED I VALORI", {
    align: 'justify'
  });
  doc.moveDown(0.1);
  doc.font('Helvetica-Bold')
  doc.text('Accetto')
  doc.fontSize(12);
  doc.moveDown(1);
  doc.text("Manifestazione del consenso (art. 7 Regolamento UE n. 2016/679)");
  doc.fontSize(7);
  doc.moveDown(1);
  doc.font('Helvetica')
  doc.text("IO SOTTOSCRITTO/A, LETTA L’INFORMATIVA EX ART 13 DEL REGOLAMENTO UE 2016/679, DICHIARO DI ESSERE STATO INFORMATO SULLE FINALITÀ E LE MODALITÀ DI TRATTAMENTO CUI SONO DESTINATI I DATI, I SOGGETTI A CUI GLI STESSI POTRANNO ESSERE COMUNICATI, ANCHE IN QUALITÀ DI INCARICATI, NONCHÉ SUI DIRITTI DI ACCESSO AI DATI PERSONALI FORNITI CON FACOLTÀ DI CHIEDERNE L’AGGIORNAMENTO, LA RETTIFICA, L’INTEGRAZIONE E LA CANCELLAZIONE O OPPORSI ALL’INVIO DI COMUNICAZIONI COMMERCIALI. PER QUANTO SOPRA ESPRIMO IL MIO CONSENSO AL TRATTAMENTO DEI MIEI DATI PERSONALI NELLE MODALITÀ E PER LE FINALITÀ STRETTAMENTE CONNESSE E STRUMENTALI AI FINI STATUTARI DELLA SOCIETÀ.E", {
    align: 'justify'
  });
  doc.moveDown(0.1);
  doc.font('Helvetica-Bold')
  doc.text('Accetto')
  doc.moveDown(1);
  doc.font('Helvetica')
  doc.text("QUANTO AL TRATTAMENTO EVENTUALE DEI MIEI DATI MEDICI, DA SVOLGERSI IN CONFORMITÀ A QUANTO INDICATO NELLA BACHECA DELL’ENTE SPORTIVO E NELLA SUDDETTA INFORMATIVA, CHE POTREBBERO VENIRE RICHIESTI AI SOLI FINI DELLO SVOLGIMENTO DA PARTE MIA DELL’ATTIVITÀ SPORTIVA (AGONISTICA E NON).", {
    align: 'justify'
  });
  doc.moveDown(0.1);
  doc.font('Helvetica-Bold')
  doc.text('Accetto')
  doc.moveDown(1);
  doc.font('Helvetica')
  doc.text("QUANTO, INFINE, ALLA RIPRESA DI IMMAGINI E DI VIDEO DURANTE GLI EVENTI SPORTIVI CUI L’ENTE PARTECIPA, IN MERITO ALL’AUTORIZZAZIONE AD ESSERE RIPRESO IN IMMAGINI E VIDEO, NONCHÉ IN MERITO ALLA PUBBLICAZIONE DELLE IMMAGINI SCATTATE E DEI VIDEO RIPRESI IN TALI OCCASIONI, SUI SITI WEB E SUI SOCIAL, IL TUTTO SEMPRE IN CONFORMITÀ A QUANTO INDICATO NELLA BACHECA DELL’ENTE SPORTIVO E NELLA SUDDETTA INFORMATIVA.", {
    align: 'justify'
  });
  doc.moveDown(0.1);
  doc.font('Helvetica-Bold')
  doc.text('Accetto')
  doc.moveDown(1);
  doc.font('Helvetica')
  doc.text("QUANTO ALLA PUBBLICAZIONE SUI SITI WEB E SUI SOCIAL, DELLE STESSE FOTOGRAFIE E VIDEO, CON MODALITÀ DI RICONOSCIMENTO, CONTRASSEGNATURA E TAGGATURA DELLE IMMAGINI, COSÌ DA RIPORTARE AVVISO PUBBLICO DEL MATERIALE PUBBLICATO NELLE PAGINE PERSONALI DEL TESSERATO SUL SOCIAL NETWORK.", {
    align: 'justify'
  });
  doc.moveDown(0.1);
  doc.font('Helvetica-Bold')
  doc.text('Accetto')
  doc.moveDown(1);
  doc.font('Helvetica')
  doc.text("FIRMANDO LA PRESENTE DICHIARO DI AVER LETTO ATTENTAMENTE IL CONTENUTO DELL’INFORMATIVA FORNITA AI SENSI DEL REGOLAMENTO UE N° 2016/679 E DI AVERNE RICEVUTO COPIA. INOLTRE MI IMPEGNO A LEGGERE QUANTO VERRÀ PUBBLICATO E SPECIFICATO NELLA BACHECA DELL’ENTE IN MERITO ALLO SVOLGIMENTO DEGLI EVENTI SPORTIVI CUI L’ENTE DECIDERÀ DI ADERIRE E AD EVENTUALE ULTERIORE NECESSARIA INFORMATIVA PRIVACY E RACCOLTA DI CONSENSO. MI IMPEGNO ALTRESÌ A COMUNICARE TEMPESTIVAMENTE LE EVENTUALI VARIAZIONI DEI DATI.", {
    align: 'justify'
  });
  doc.moveDown(0.1);
  doc.font('Helvetica-Bold')
  doc.text('Accetto')
  doc.moveDown(1);
  doc.font('Helvetica')
  doc.moveDown(1);
  doc.text(`${new Date()}`);
  doc.end();

  var client = new postmark.ServerClient("a271a58b-ea4a-407b-8c8a-ee43f15d5ecc");

  try {
    const array = await toArray(doc);
    var buffer = Buffer.concat(array).toString('base64')
    await client.sendEmail({
      To: "info@gallettosport.it",
      From: `Galletto Sport Accademy <info@pineappsrl.com>`,
      TextBody: "Modulo A",
      ReplyTo: `${da_email}`,
      Subject: `Modulo A - ${da_cognome_minore} ${da_nome_minore}`,
      attachments: [
        {
          Content: buffer, // base 64
          Name: `Modulo A - ${da_cognome_minore} ${da_nome_minore}.pdf`,
          ContentType: "application/pdf",
        },
      ],
    });
    return res.status(200).json({ error: null });
  } catch (error) {
    console.log(error.message);
    return res.status(error.code || 500).json({ error: error.message });
  }



}
