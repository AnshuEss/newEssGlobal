// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl:'http://localhost/backend/',
  apiUrl:'https://one96opportunities.com/essApp/',
  crmUrl:'https://essglobal.com/ionicApi/',
  chatUrl:'http://localhost:3000',
   //chatUrl:'http://43.204.232.143:3000', 
  firebase: {
    apiKey: "AIzaSyD4HLapqh4YXB9bUGTVRWmsJ8gKsVEEAiE",
    authDomain: "essglobal-b96dd.firebaseapp.com",
    projectId: "essglobal-b96dd",
    storageBucket: "essglobal-b96dd.appspot.com",
    messagingSenderId: "961472450172",
    appId: "1:961472450172:web:f23e53c2b553589e7183f9",
    measurementId: "G-6S2SJQ17JP"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.