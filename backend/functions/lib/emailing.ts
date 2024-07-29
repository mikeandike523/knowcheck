import { google } from "googleapis";
import { TypicalRPCErrors } from "../utils/rpc";
import { fileError } from "../utils/rpc-server";
import ColorDebug from '../utils/ColorDebug'
import { SmartFetch } from "../utils/SmartFetch";
import {encode as b64tourl, trim as urlb64trim} from 'url-safe-base64'

export function getGmailAuth(){
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:
      process.env.CLIENT_X509_CERT_URL
  }

  // Create a new JWT client using the service account JSON object
  const auth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
    subject: "service@wiredhyena.com",
  });

  return auth
}

export function getGmailService() {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:
      process.env.CLIENT_X509_CERT_URL
  }

  // Create a new JWT client using the service account JSON object
  const auth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
    subject: "service@wiredhyena.com",
  });

  // Build the Gmail API service
  const gmail = google.gmail({ version: "v1", auth });

  return gmail;
}

/**
 *
 * @param from - The sender's email address
 * @param fromName - The sender's name
 * @param to - The recipient's email address
 * @param toName - The recipient's name
 * @param subject - The email subject
 * @param html - The HTML content of the email
 */
export async function sendHTMLEmail(
  messageId: string,
  from: string,
  fromName: string,
  to: string,
  toName: string,
  subject: string,
  html: string
) {
  // const gmail = getGmailService();

  // Construct the email
  const rawEmail = `
To: ${toName} <${to}>
From: ${fromName} <${from}>
Subject: ${subject}
Content-Type: text/html; charset=utf-8
Date: ${new Date().toISOString()}
Message-ID: <${messageId}>

${html}
  `.trim();


  console.log(rawEmail)


  const encodedEmail = urlb64trim(b64tourl(Buffer.from(rawEmail).toString("base64")));





  // Send the email
  try {
    // const
    // await gmail.users.messages.send({
    //   userId: "me",
    //   requestBody: {
    //     raw: encodedEmail,
    //   }
    // });
    const accessToken = (await getGmailAuth().getAccessToken()).token
    if(!accessToken){
      throw new Error("No access token")
    }
    await new SmartFetch(`https://www.googleapis.com/gmail/v1/users/me/messages/send`).bearer(accessToken).post({
      raw: encodedEmail,
    })
  } catch (e) {
    ColorDebug.ansi().error(JSON.stringify(e, null, 2) + "\n\n\n\n\n", {
      textColor: "red"
    });
    throw await fileError("gmail", (ticketNumber: string) =>
      TypicalRPCErrors.ThirdPartyInvalidResponse("gmail", e, ticketNumber)
    );
  }
}
