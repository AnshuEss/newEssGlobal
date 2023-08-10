import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ess.global',
  appName: 'Essglobal',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
};

export default config;
