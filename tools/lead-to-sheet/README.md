# Demo requests → Google Sheet + email

The demo form on anviledtech.com can save every request to a Google Sheet and email you,
with no server of our own. Until this is set up, the form opens WhatsApp with the details
typed in, so no enquiry is lost.

## One-time setup (about 5 minutes, in your own Google account)

1. Create a Google Sheet, for example "Anvil Edtech – Website leads".
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste all of
   `Code.gs` from this folder. Change `NOTIFY_EMAIL` if alerts should go somewhere else.
3. Click **Deploy → New deployment → Select type: Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, allow the permissions Google asks for (Sheets and sending email),
   and copy the **Web app URL** (it ends in `/exec`).
5. Paste that URL into `assets/js/config.js` as `leadEndpoint: '...'`, commit and push.

Each request then becomes a row in the **Leads** tab (name, phone, institute, type, city,
students, languages, message and which ad or link it came from), and you get an email.

To change the script later, edit it and use **Deploy → Manage deployments → Edit → New
version**, so the URL stays the same.
