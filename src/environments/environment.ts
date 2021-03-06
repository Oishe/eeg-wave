// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAvGKE_Se6Di9JA3kETQao91-8twYs7mc8',
    authDomain: 'eeg-wave.firebaseapp.com',
    databaseURL: 'https://eeg-wave.firebaseio.com',
    projectId: 'eeg-wave',
    storageBucket: 'eeg-wave.appspot.com',
    messagingSenderId: '419912719846',
  }
  // firebase: {
  //   apiKey: "AIzaSyBuAO0C3krsFBQwJpTTFAXpoIq6PEczjKo",
  //   authDomain: "capstone-storage-v1.firebaseapp.com",
  //   databaseURL: "https://capstone-storage-v1.firebaseio.com",
  //   storageBucket: "capstone-storage-v1.appspot.com",
  //   projectId: "capstone-storage-v1",
  //   messagingSenderId: "87279823124"
  // }
};

// firebase.initializeApp(config);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
