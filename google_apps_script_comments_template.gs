const SPREADSHEET_NAME = "Portofolio-Database";
const SHEET_LIKE = "Like";
const SHEET_COMMENTS = "Comments";

// ───── ROUTER: GET ─────
function doGet(e) {
  const path = e && e.parameter ? e.parameter.path : '';

  if (path === 'comments') {
    return doGetComments(e);
  }

  return doGetLikes();
}

// ───── ROUTER: POST ─────
function doPost(e) {
  try {
    const body = e.postData ? JSON.parse(e.postData.contents) : {};

    if (body.type === 'comment') {
      return doPostComments(e);
    }

    return doPostLike(body);
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

// ══════════════════════════════════════
//  LIKE
// ══════════════════════════════════════

function doGetLikes() {
  const sheet = getSheetByName(SHEET_LIKE);
  const lastRow = sheet.getLastRow();
  const totalLikes = Math.max(0, lastRow - 1);
  return jsonResponse({ ok: true, totalLikes });
}

function doPostLike(body) {
  const sheet = getSheetByName(SHEET_LIKE);
  sheet.appendRow([
    new Date(),
    body.action || "like",
    body.page || "",
    body.pathname || "",
    body.userAgent || "",
    body.referrer || "",
    body.sessionId || ""
  ]);
  return jsonResponse({ ok: true, message: "Like saved" });
}

// ══════════════════════════════════════
//  COMMENTS
// ══════════════════════════════════════

function doGetComments(e) {
  const sheet = getSheetByName(SHEET_COMMENTS);

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return jsonResponse({ ok: true, comments: [] });
  }

  const headers = data.shift();
  const comments = data.map(row => {
    const rowObject = {};
    headers.forEach((header, i) => {
      rowObject[header] = row[i];
    });
    return rowObject;
  }).sort((a, b) => {
    const dateA = parseCustomDate(a.timestamp);
    const dateB = parseCustomDate(b.timestamp);
    return dateB - dateA;
  });

  return jsonResponse({ ok: true, comments });
}

function doPostComments(e) {
  const body = JSON.parse(e.postData.contents);
  const { name, content, sessionId } = body;

  if (!content || !sessionId) {
    return jsonResponse({ ok: false, error: "Missing required fields: content, sessionId" });
  }

  const sheet = getSheetByName(SHEET_COMMENTS);
  const timestamp = formatTimestamp(new Date());
  const displayName = (name && name.trim()) ? name.trim() : "Anonymous";

  sheet.appendRow([timestamp, displayName, content.trim()]);
  return jsonResponse({ ok: true, comment: { timestamp, name: displayName, content: content.trim() } });
}

// ══════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════

function formatTimestamp(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return dd + "/" + mm + "/" + yyyy + " " + hh + ":" + mi + ":" + ss;
}

function parseCustomDate(dateString) {
  if (!dateString) return new Date(0);

  if (dateString.indexOf('/') !== -1 && dateString.indexOf(':') !== -1) {
    var parts = dateString.split(' ');
    var dateParts = parts[0].split('/');
    var timeParts = parts[1].split(':');
    return new Date(
      parseInt(dateParts[2], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[0], 10),
      parseInt(timeParts[0], 10),
      parseInt(timeParts[1], 10),
      parseInt(timeParts[2], 10)
    );
  }

  return new Date(dateString);
}

function getSheetByName(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    if (sheetName === SHEET_LIKE) {
      sheet.appendRow(["Timestamp", "Action", "Page", "Pathname", "User Agent", "Referrer", "Session ID"]);
    } else if (sheetName === SHEET_COMMENTS) {
      sheet.appendRow(["timestamp", "name", "content"]);
    }
  }

  if (sheet.getLastRow() === 0) {
    if (sheetName === SHEET_LIKE) {
      sheet.appendRow(["Timestamp", "Action", "Page", "Pathname", "User Agent", "Referrer", "Session ID"]);
    } else if (sheetName === SHEET_COMMENTS) {
      sheet.appendRow(["timestamp", "name", "content"]);
    }
  }

  return sheet;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// ══════════════════════════════════════
//  SETUP (jalankan sekali saja)
// ══════════════════════════════════════

function setupLikeSheet() {
  getSheetByName(SHEET_LIKE);
  Logger.log("Setup complete: 'Like' sheet ready.");
}

function setupCommentsSheet() {
  getSheetByName(SHEET_COMMENTS);
  Logger.log("Setup complete: 'Comments' sheet ready.");
}
