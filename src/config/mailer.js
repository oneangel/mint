import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "team.mintapp@gmail.com",
    pass: "cfcw rrug urkd uahp",
  }
});


export function sendEmail(newUser, token) {
  const mailOptions = {
    from: 'team.mintapp@gmail.com',
    to: newUser.email,
    subject: 'Welcome to Mint',
    html: `<div>
    <h1>Hello ${newUser.username}, welcome to the mint family!</h1>
    <br />
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
      "
    >
      <img
        style="display: block; item-self: center; width: 70px; height: 70px"
        src="https://i.ibb.co/92hZZSF/logo.png"
      />
      <br />
      <p>
        Estimado/a ${newUser.username}, Gracias por registrarte en nuestra
        aplicaicon de Mint. Para completar el proceso de registro y activar tu
        cuenta, necesitamos que verifiques tu dirección de correo electrónico. Por
        favor, haz clic en el siguiente enlace o cópialo y pégalo en tu navegador
        para verificar tu cuenta:
      </p>
      <a
        href="http://localhost:3000/api/verify/user/${token}"
        style="
          background-color: #3e70a1;
          color: white;
          padding: 20;
          border-radius: 10%;
        "
        >Verificar</a
      >
      <p>
        Este enlace de verificación es válido solo por 24 horas por razones de
        seguridad. Si no verificas tu cuenta dentro de este período, deberás
        iniciar nuevamente el proceso de registro. Una vez que hayas verificado tu
        cuenta, podrás disfrutar de todos los servicios y funciones que [Nombre de
        la Aplicación/Servicio] tiene para ofrecerte. Si tienes alguna pregunta o
        necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de
        soporte en [dirección de correo electrónico de soporte]. Atentamente, El
        Equipo de Mint
      </p>
    </div>
  </div>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}

transporter.verify().then(() => {
  console.log('Ready to send emails');
})