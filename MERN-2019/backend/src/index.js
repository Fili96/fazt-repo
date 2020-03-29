require("dotenv").config();
require("./database");
const app = require("./app");

async function main() {

  await app.listen(app.get('port'));
  console.log(`Servidor Backend en puerto ${app.get('port')}`);

}

main()
