import app from "./app";
import { runRobotFromInputFiles } from "./application/robot-console";

const port = process.env.PORT || 8080;

const args = process.argv.slice(2);
const inputFile = args[0];
const outputFile = args[1];

if (!inputFile || !outputFile) {
   app.listen(port, () => {
      console.info("Express server listening on port " + port);
   });
}  else {
   runRobotFromInputFiles(inputFile, outputFile)
}