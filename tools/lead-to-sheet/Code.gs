/**
 * Anvil Edtech — website demo requests -> Google Sheet + email alert.
 *
 * Paste this into a Google Apps Script project that is bound to a Google Sheet
 * (Sheet -> Extensions -> Apps Script), then deploy it as a Web app.
 * Steps are in README.md next to this file.
 */

// Who gets an email for every new request. Separate several addresses with commas.
var NOTIFY_EMAIL = 'anviledtechprivatelimited@gmail.com';

var COLUMNS = [
  'submittedAt', 'name', 'phone', 'institute', 'type', 'city', 'students', 'languages',
  'message', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'page'
];

function doPost(e) {
  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: 'bad_json' });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads') ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
  if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);

  // Store values as text so phone numbers keep their digits and no cell runs a formula.
  sheet.appendRow(COLUMNS.map(function (key) {
    var value = String(data[key] || '').slice(0, 1000);
    return /^[=+\-@]/.test(value) ? "'" + value : value;
  }));

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New demo request: ' + (data.institute || 'website') + ' (' + (data.city || '') + ')',
      body: COLUMNS.map(function (k) { return k + ': ' + (data[k] || ''); }).join('\n')
    });
  }

  return reply({ ok: true });
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
