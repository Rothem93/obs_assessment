
# OBS Assessment

To run the test, several possibilities are available.

The first and indispensable is to install the app dependencies. Then start the application by following one of the examples below.

First step:

- npm install
Second step (There are other ways present in the scripts to start the application, my recommendation for simplicity are in bold):
- npm start [path to input file] <path to generate the output file>. This is the easier way to run the app. Is not mandatory build, and is just plug and play.

ATTENTION:
At this point, if you want to start the application as close as possible to a production environment I recommend doing:

npm build (This step can be omitted depending on the script, but I recommend to do it to avoid any confusion)

- **node obs_test** [path to input file] <path to generate the output file>. This runs the script in the root of the application, its important do npm run build first.
- **npm run obs_test** [path to input file] <path to generate output file>.  This script builds the app and launches it.
- npm run obs_test_dev [path to input file] <path to generate output file>.  This script launches the app directly without build it.

Remember if you pass the first parameter, the second one is mandatory.

Extra:
It is possible to run tests done on the domain and the application. You can run them with npm test. It will generate a coverage folder to see the code coverage.
