import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
<<<<<<< HEAD
  appId: 'com.ess.global',
  appName: 'Ess Global',
=======
  appId: 'io.ess.global',
  appName: 'Essglobal',
>>>>>>> 6f49e53fe8094656c4b40a1484f231616ce04aed
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000,
      //"launchAutoHide": true,
      "launchFadeOutDuration": 3000,
      "backgroundColor": "#ffffffff",
      "androidSplashResourceName": "splash",
     // "androidScaleType": "CENTER_CROP",
      "showSpinner": true,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      "layoutName": "launch_screen",
      "useDialog": true
<<<<<<< HEAD
    },
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
=======
>>>>>>> 6f49e53fe8094656c4b40a1484f231616ce04aed
    }
  }
};

export default config;
