import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ess.global',
  appName: 'Essglobal',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    },
    "SplashScreen": {
      "launchShowDuration": 3000,
      //"launchAutoHide": true,
      "launchFadeOutDuration": 3000,
      "backgroundColor": "#ffffff",
       "androidSplashResourceName": "splash",
      //"androidScaleType": "CENTER_CROP",
      "showSpinner": true,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      "layoutName": "launch_screen",
      "useDialog": true
    },
  },
  server: {
    androidScheme: 'https',
  },
  // android: {
  //   allowMixedContent:true
  // }
};

export default config;
