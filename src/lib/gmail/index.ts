import 'dotenv/config';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } from '$env/static/private';
import { google } from 'googleapis';
import axios from 'axios';

const generateConfig = (url: string, accessToken: string) => {
  return {
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${accessToken} `,
      "Content-type": "application/json",
    },
  };
};

const mailoptions = {
  from: "Amit <amit.deshmuk@gmail.com>",
  to: "",
  subject: "",
};


const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

async function getUser(email: string) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${email}/profile`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token as string);
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

interface EmailSummary {
  id: string;
  from: string;
  message: string;
}

async function checkUnreadEmails() {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  let result: Array<EmailSummary> = [];

  const res = await gmail.users.messages.list({ userId: 'me', q: 'label:inbox is:unread' });
  if (res.data && res.data.messages && res.data.messages.length !== 0) {
    for (const message of res.data.messages) {
      const messageData = await gmail.users.messages.get({ userId: 'me', id: message.id });
      const emailData = messageData.data.payload.headers.find(header => header.name === 'From');
      
      result.push({
        id: message.id,
        from: emailData.value,
        message: messageData.data.snippet
      });
    }

    return result;
  } else {
    return result;
  }
}

export {
  getUser,
  checkUnreadEmails
}