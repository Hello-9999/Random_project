let admin = require("firebase-admin");

let serviceAccount = require("./server_imp/admindata.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
