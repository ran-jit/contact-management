var SUBJECT = "Contact US :: ranmanic.in";
var TO_ADDRESS = "ranjith@ranmanic.in";
var SHEET_NAME = "responses";

// For email cc, Uncomment the below line and "MailApp.sendEmail" cc parameter.
//var CC_ADDRESS = "ranjith@ranmanic.in";

/** POST */
function doPost(jsonData) {
  try {
    recordData(jsonData);

    MailApp.sendEmail({
      to: TO_ADDRESS,
      // cc: CC_ADDRESS,
      subject: SUBJECT,
      htmlBody: formatMailBody(jsonData.parameters)
    });

    return ContentService
          .createTextOutput(JSON.stringify({"result":"success",
                            "data": JSON.stringify(jsonData.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", 
                                            "data": JSON.stringify(jsonData.parameters)}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

/** To format email content */
function formatMailBody(jsonData) {
  var result = "";
  for (var key in jsonData) {
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + jsonData[key] + "</div>";
  }
  return result;
}

/** To record json data to sheet */
function recordData(jsonData) {
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(SHEET_NAME);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    // first element in the row should always be a timestamp
    var row = [ new Date() ];
    for (var i = 1; i < headers.length; i++) {
      if(headers[i].length > 0) {
        row.push(jsonData.parameter[headers[i]]);
      }
    }
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  } catch(error) {
    Logger.log(error);
  } finally {
    return;
  }
}
