var SUBJECT = "Contact US :: ranmanic.in";
var TO_ADDRESS = "ranjith@ranmanic.in";

// For enabling email cc address, uncomment the below line and "MailApp.sendEmail" cc parameter.
// var CC_ADDRESS = "ranjith@ranmanic.in";

/**
 * API to accept POST requests.
 */
function doPost(e) {
  try {
    // to record input details in spread sheet "responses"
    recordData(e);

    var mailData = e.parameters;
    MailApp.sendEmail({
      to: TO_ADDRESS,
      // cc: CC_ADDRESS,
      subject: SUBJECT,
      htmlBody: formatMailBody(mailData)
    });

    // return json success results
    return ContentService
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * method to split the keys and values from the input object.
 */
function formatMailBody(obj) {
  var result = "";
  for (var key in obj) { // loop over the object passed to the function
    result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + obj[key] + "</div>";
  }
  return result;
}

/**
 * Record the input details in spread sheet
 * note: sheet name - "responses"
 */
function recordData(e) {
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('responses');
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    // first element in the row should always be a timestamp
    var row = [ new Date() ];
    for (var i = 1; i < headers.length; i++) {
      if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]);
      }
    }
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  }
  catch(error) {
    Logger.log(e);
  }
  finally {
    return;
  }
}