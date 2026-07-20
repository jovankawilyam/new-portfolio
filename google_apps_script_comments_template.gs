function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Comments');
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Sheet 'Comments' not found." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // Remove header row

  const comments = data.map(row => {
    const rowObject = {};
    headers.forEach((header, i) => {
      rowObject[header] = row[i];
    });
    return rowObject;
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first

  return ContentService.createTextOutput(JSON.stringify({ ok: true, comments: comments }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Comments');
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Sheet 'Comments' not found." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const requestBody = JSON.parse(e.postData.contents);
  const { name, content, sessionId } = requestBody;

  if (!name || !content || !sessionId) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Missing required fields: name, content, sessionId" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const timestamp = new Date().toISOString();
  const id = Utilities.getUuid(); // Generate a unique ID for the comment

  sheet.appendRow([id, name, content, timestamp, sessionId]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true, comment: { id, name, content, timestamp, sessionId } }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to set up the spreadsheet (run once)
function setupCommentsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Comments');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Comments');
    sheet.appendRow(['id', 'name', 'content', 'timestamp', 'sessionId']);
  }
}
