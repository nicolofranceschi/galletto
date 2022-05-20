import sendgrid, { ResponseError } from "@sendgrid/mail";

const PDFDocument = require("pdfkit");

const { Base64Encode } = require("base64-stream");

if (!process.env.SENDGRID_API_KEY)
  throw new Error("Sendgrid API key not found.");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(req, res) {

  const { DA_Email } = req.body;

  const doc = new PDFDocument({ size: "A4" });
  doc.text("Galletto Sport Academy  ssd  a  rl");
  

  var finalString = ""; // contains the base64 string
  var stream = doc.pipe(new Base64Encode());

  doc.end(); // will trigger the stream to end


  try {
    await sendgrid.send({
      to: DA_Email,
      from: `Galletto Sport Accademy <info@pineappsrl.com>`,
      text: "Hello world!",
      subject: "Pineapp's - Your password",
      attachments: [
        {
          content: stream, // base 64
          filename: "attachment.pdf",
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
