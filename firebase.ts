// import {
//   initializeApp,
//   applicationDefault,
//   getApps,
//   getApp,
// } from 'firebase-admin/app'
// import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'
// export const firebaseConfig = {
//   apiKey: 'AIzaSyAO6QOxsKSYQR3Wi3pnAi77xoa6qikhhtU',
//   authDomain: 'ecommerce-37950.firebaseapp.com',
//   projectId: 'ecommerce-37950',
//   storageBucket: 'ecommerce-37950.appspot.com',
//   messagingSenderId: '783618676442',
//   appId: '1:783618676442:web:afc5929d3cf467e555f7e3',
// }

// const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// export const db = getFirestore(app)

import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app'

const serviceAccount = require('../../permissions.json')

if (!getApps().length) {
  const app = initializeApp({
    credential: cert(serviceAccount),
  })
} else {
  const app = getApp()
}
export const db = getFirestore()
