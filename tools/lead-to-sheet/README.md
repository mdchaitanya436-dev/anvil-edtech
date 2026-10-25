# Leads → one Google Sheet (website form + Meta ads)

All Anvil Edtech leads go into one Google Sheet, **Anvil Edtech – Leads**:

| Tab | Filled by | When |
|---|---|---|
| **All Leads** | `C:\Users\manda\anviledtech-reports\update_leads.py` | every 2 hours (scheduled task "Anvil Edtech - Leads Update") |
| **Summary** | same script | every 2 hours |
| **Website raw** | this folder's `Code.gs` (Apps Script) | instantly, on every website form submit |

The script merges the Meta lead-form leads (Instagram / Facebook) with the website
enquiries, one row per phone number, newest first. The team fills only
**Called? / Called by / Call Date / Outcome / Follow-up Date / Notes**; those are kept on
every refresh. Until the Apps Script is deployed, the website form opens WhatsApp with
the details typed in, so no enquiry is lost.

## One-time setup (owner, in the Anvil Edtech Google account)

1. Create a Google Sheet named **Anvil Edtech – Leads**.
2. **Share** it as **Editor** with the service account
   `call-list-writer@ts-police-hub.iam.gserviceaccount.com` (untick "Notify").
   Add teammates **by name only**. Never use "Anyone with the link": the sheet holds phone numbers.
3. Paste the sheet's URL into `C:\Users\manda\anviledtech-reports\sheet-id.txt`.
4. Website form: in the sheet, **Extensions → Apps Script**, delete the sample code, paste
   all of `Code.gs`, then **Deploy → New deployment → Web app** (Execute as: **Me**,
   Who has access: **Anyone**). Allow the permissions and copy the **Web app URL** (ends in `/exec`).
   Put it in `assets/js/config.js` as `leadEndpoint: '...'`, commit and push.
5. Meta ads: in Meta Business settings, give a system user access to the
   **Anvil Edtech** page (and an app owned by the portfolio), generate a token with
   `leads_retrieval`, `pages_show_list`, `pages_read_engagement` and `pages_manage_metadata`,
   and paste it into `C:\Users\manda\anviledtech-reports\meta-token.txt`.
   (The token is a secret; never commit it.)

Run `update_leads.bat` once to check, then look at `update.log` in the same folder.

To change the Apps Script later, edit it and use **Deploy → Manage deployments → Edit →
New version**, so the URL stays the same.
