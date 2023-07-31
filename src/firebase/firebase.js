import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCXbvBxJmN-Dojo4PH54uvoZnwoBZj5VzM',
  authDomain: 'px-mod.firebaseapp.com',
  projectId: 'px-mod',
  storageBucket: 'px-mod.appspot.com',
  messagingSenderId: '892735452684',
  appId: '1:892735452684:web:9f6a044cf6d4aa854e2029',
  measurementId: 'G-GH3RZ05XMG',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, storage };
