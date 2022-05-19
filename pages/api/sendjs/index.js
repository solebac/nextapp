const mailer = require("nodemailer");

export default function handler(
  req,
  res
) {
  //res.status(200).json({ name: "John Doe" });
  const smtpTransport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "solebacfrs@gmail.com",
      pass: "ghmuyvnmpitzamop",
    },
    tls: { rejectUnauthorized: false },
  });

  const mail = {
    from: "solebacfrs@gmail.com",
    to: `${req.body.email}`,
    subject: `${req.body.assunto}`,
    text: `${req.body.msg}`,
    html: `<h1 style='font-size:1.5em; text-align:center;'>Contato</h1>
    <p>
       <strong>Nome.....: </strong> ${req.body.nome} <br />
       <strong>E-mail...: </strong> ${req.body.email} <br />
       <strong>Telefone.: </strong> ${req.body.telefone} <br />
       <strong>Assunto..: </strong> ${req.body.assunto} <br />
       <strong>Mensagem.: </strong> ${req.body.msg} <br />
    <p>`,
  };

  try {
    const result = smtpTransport.sendMail(mail);
    if (!result.reject) {
      res.status(200).json({ message: "Enviado" });
    } else {
      res.status(500).json({ message: result.reject });
    }
  } catch (erro) {
    res.status(500).json({ message: result.reject });
  }
}
