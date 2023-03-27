import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = JSON.parse(req.body);

  // sending email function

  const sgApiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(sgApiKey!);

  try {
    await sgMail.send({
      to: "anthonychan1211@gmail.com",
      from: `Anthony Chan <${process.env.SENDER_EMAIL}>`,
      subject: "New Message from Morr customer",
      html: `<div style="width: 70%; margin: 0 auto; "><p>Name: ${name}</p><p>Email: ${email}</p><p>Message:</p><p>${message}</p></div>`,
    });
    return res.status(200).json({
      success: `Email has been sent.`,
    });
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      res.status(400).send(error.response.body);
    }
  }
};

export default sendEmail;
