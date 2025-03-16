import * as admin from 'firebase-admin'

// Firebase'i başlat
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "vesterfly"
})

// Firestore ve Auth referanslarını al
export const db = admin.firestore()
export const auth = admin.auth() 