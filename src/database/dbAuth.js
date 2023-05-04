import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { getFirestore } from 'firebase-admin/firestore'

dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
})

const db = getFirestore()
const authD = admin.auth()

export { authD, db as default }
