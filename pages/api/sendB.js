import sendgrid from "@sendgrid/mail";
import { file } from "pdfkit";
import { toArray } from "streamtoarray";

const PDFDocument = require("pdfkit");

if (!process.env.SENDGRID_API_KEY)
  throw new Error("Sendgrid API key not found.");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(req, res) {
  const {
    da_cognome,
    da_cap,
    da_cap_minore,
    da_città,
    da_città_di_nascita,
    da_città_di_nascita_minore,
    da_città_minore,
    da_codice_fiscale,
    da_codice_fiscale_minore,
    da_cognome_minore,
    da_email,
    da_nome,
    da_nome_minore,
    da_numero_civico,
    da_numero_civico_minore,
    da_provincia,
    da_provincia_minore,
    da_provincia_di_nascita,
    da_provincia_di_nascita_minore,
    da_via,
    da_via_minore,
    fermatacustom,
    fermata,
    BC_anno_data,
    BC_giorno_data,
    BC_mese_data,
    da_cellulare,
    da_anno_datadinascitadelminore,
    da_anno_datadinascitadeltutore,
    da_giorno_datadinascitadelminore,
    da_giorno_datadinascitadeltutore,
    da_mese_datadinascitadelminore,
    da_mese_datadinascitadeltutore,
    EM_emergenza1,
    EM_emergenza2,
    Settimanepersonalizzate,
    al_allergie,
    camp,
    note,
    files,
    assicurazione,
    bc_euro,
    bc_intestatario,
  } = req.body;

  console.log(req.body);

  const doc = new PDFDocument({ size: "A4" });
  doc.fontSize(12);
  doc.font("Helvetica-Bold");
  doc.text("Galletto Sport Academy  ssd  a  rl");
  doc.font("Helvetica");
  doc.fontSize(6);
  doc.text("Via Ambrogini, 5   -  40022 Castel del Rio   BO");
  doc.text("CF & P.IVA: 03812341208  -  Sdi: P62QHVQ");
  doc.text("Mail: info@gallettosport.it");
  doc.text("Pec: gallettosporacademy@pec.it");
  doc.fontSize(20);
  doc.font("Helvetica-Bold");
  doc.moveDown(1);
  doc.text("MODULO B - Domanda di iscrizione");
  doc.fontSize(12);
  doc.moveDown(1);
  doc.text("IL/LA SOTTOSCRITTO/A");
  doc.moveDown(0.2);
  doc.fontSize(10);
  doc.text(
    `${da_cognome} ${da_nome} nato a ${da_città_di_nascita} (${da_provincia_di_nascita}) il ${da_giorno_datadinascitadeltutore} ${da_mese_datadinascitadeltutore} ${da_anno_datadinascitadeltutore} `
  );
  doc.text(
    `Residente in ${da_via} ${da_numero_civico}, ${da_città} (${da_provincia}), ${da_cap}`
  );
  doc.text(`Codice Fiscale: ${da_codice_fiscale}`);
  doc.text(`Cellulare: ${da_cellulare}`);
  doc.text(`E-mail: ${da_email}`);
  doc.fontSize(12);
  doc.moveDown(1);
  doc.text(
    "IN QUALITA' DI ESERCENTE LA RESPONSABILITA' GENITORIALE CHIEDE CHE IL SEGUENTE MINORE"
  );
  doc.moveDown(0.2);
  doc.fontSize(10);
  doc.text(
    `${da_cognome_minore} ${da_nome_minore} nato a ${da_città_di_nascita_minore} (${da_provincia_di_nascita_minore}) il ${da_giorno_datadinascitadelminore} ${da_mese_datadinascitadelminore} ${da_anno_datadinascitadelminore} `
  );
  doc.text(
    `Residente in ${da_via_minore} ${da_numero_civico_minore}, ${da_città_minore} (${da_provincia_minore}), ${da_cap_minore}`
  );
  doc.text(`Codice Fiscale: ${da_codice_fiscale_minore}`);
  doc.moveDown(0.2);
  doc.text(`Contatto urgente 1: ${EM_emergenza1}`);
  doc.text(`Contatto urgente 2: ${EM_emergenza2}`);
  doc.moveDown(0.2);
  doc.text(`Allergie: ${al_allergie}`);
  doc.moveDown(1);
  doc.fontSize(12);
  doc.text("SIA ISCRITTO AL CAMP SUMMER 2022");
  doc.moveDown(0.2);
  doc.fontSize(11);
  doc.text("Turni");
  doc.moveDown(0.1);
  doc.fontSize(10);
  camp &&
    camp.map((e) => {
      doc.text(`- ${e}`);
    });
  doc.moveDown(0.3);
  Settimanepersonalizzate !== "" &&
    doc.text(`Settimane personalizzate: ${Settimanepersonalizzate}`);
  doc.moveDown(0.5);
  doc.fontSize(11);
  doc.text("Trasporti");
  doc.moveDown(0.1);
  doc.fontSize(10);
  doc.text(`Fermata: ${fermata} `);
  doc.moveDown(0.3);
  fermatacustom !== "" && doc.text(`Fermata personalizzata: ${fermatacustom}`);
  doc.text(` `);
  doc.moveDown(0.2);
  fermatacustom !== "" && doc.text(`Note varie : ${note} `);
  doc.font("Helvetica-Bold");
  doc.fontSize(12);
  doc.moveDown(1);
  doc.text(
    "Manifestazione del consenso e presa visione (Privacy, Regolamento UE n. 2016/679 - Regolamento SSD e Campi estivi)"
  );
  doc.fontSize(7);
  doc.moveDown(1);
  doc.font("Helvetica");
  doc.text(
    "DICHIARO di aver provveduto al tesseramento del partecipante. 2. DICHIARO di aver preso visione del regolamento del camp, del regolamento interno e dello statuto della GSA ssd a rl condividendone le finalità istituzionali e i valori. 3. CONFERMO che in caso di rinuncia la quota ora saldata sarà restituita decurtata di 30.00 euro nel caso in cui la disdetta pervenga alla direzione in forma scritta almeno 15gg prima dell’inizio del camp oppure nel caso in cui disposizioni anticovid impediscano la realizzazione del camp. In tutti gli atri casi non sono previsti rimborsi parziali o totali o recuperi per giorni di assenza. 4. AUTORIZZO ad inviare comunicazioni tramite Email / SMS / WhatsApp in merito allo svolgimento delle attività SPORTIVE al telefono indicato sopra alla voce telefono principale utilizzato per comunicazioni broadcast. A tale scopo si richiede di salvare tra i propri contatti il numero 324 0957228, diversamente non sarà possibile ricevere i messaggi WhatsApp inviati tramite liste broadcast. 5. ACCETTO i termini e le condizioni della Privacy Policy",
    {
      align: "justify",
    }
  );
  doc.moveDown(1);
  doc.fontSize(11);
  doc.text("Assicurazione");
  doc.fontSize(7);
  doc.moveDown(0.2);
  doc.font("Helvetica");
  doc.text(
    "rimborso dei giorni di assenza per malattia al costo di 10€ a settimana. La copertura prevede il rimborso di 20€ per ogni giorno di assenza causa malattia attestata da certificato medico",
    {
      align: "justify",
    }
  );
  doc.moveDown(0.1);
  doc.font("Helvetica-Bold");
  assicurazione ? doc.text("Attiva") : doc.text("Non Attiva");
  doc.moveDown(1);
  doc.fontSize(10);
  doc.text(
    `Effettutato bonifico a nome di ${bc_intestatario} il ${BC_giorno_data} ${BC_mese_data} ${BC_anno_data} per un valore di ${bc_euro}`
  );
  doc.fontSize(7);
  doc.font("Helvetica");
  doc.moveDown(1);
  doc.text(`${new Date()}`);
  doc.end();

  try {
    const array = await toArray(doc);
    var buffer = Buffer.concat(array).toString("base64");
    await sendgrid.send({
      to: "franceschinicolo@gmail.com",
      from: `Galletto Sport Accademy <info@pineappsrl.com>`,
      text: "Hello world!",
      subject: `Modulo B - ${da_cognome_minore} ${da_nome_minore}`,
      html: `
      <a href=${files[0].url} download>
      ${files[0].url}
      </a>
        `,
      attachments: [
        {
          content: buffer,
          filename: `Modulo B - ${da_cognome_minore} ${da_nome_minore}.pdf`,
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    });
    return res.status(200).json({ error: null });
  } catch (error) {
    console.log(error.message);
    return res.status(error.code || 500).json({ error: error.message });
  }
}
