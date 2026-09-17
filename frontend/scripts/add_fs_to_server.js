const fs = require('fs');
const path = require('path');

let serverContent = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');

if (!serverContent.includes("const fs = require('fs');")) {
  serverContent = "const fs = require('fs');\nconst path = require('path');\n" + serverContent;
  fs.writeFileSync(path.join(__dirname, '..', 'server.js'), serverContent);
  console.log("Added fs and path to server.js!");
} else {
  console.log("fs already present.");
}
