import { Request, Response } from 'express'
import { auth, db } from '../config/firebase'
import { User, CreateUserData } from '../models/User'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, company }: CreateUserData = req.body

    // Firebase Auth'da kullanıcı oluştur
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    })

    // Firestore'da kullanıcı dokümanı oluştur
    const userData: User = {
      uid: userRecord.uid,
      email,
      name,
      company,
      role: 'user',
      createdAt: new Date()
    }

    await db.collection('users').doc(userRecord.uid).set(userData)

    // Custom token oluştur
    const token = await auth.createCustomToken(userRecord.uid)

    res.status(201).json({
      token,
      user: {
        id: userRecord.uid,
        name,
        email
      }
    })
  } catch (error: any) {
    console.error('Kayıt hatası:', error)
    res.status(400).json({ 
      error: error.message || 'Kayıt sırasında bir hata oluştu' 
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Firebase Auth ile giriş yap
    const userRecord = await auth.getUserByEmail(email)
    
    // Kullanıcı bilgilerini Firestore'dan al
    const userDoc = await db.collection('users').doc(userRecord.uid).get()
    const userData = userDoc.data() as User

    // Custom token oluştur
    const token = await auth.createCustomToken(userRecord.uid)

    res.json({
      token,
      user: {
        id: userRecord.uid,
        name: userData.name,
        email: userData.email
      }
    })
  } catch (error: any) {
    console.error('Giriş hatası:', error)
    res.status(400).json({ 
      error: 'Geçersiz email veya şifre' 
    })
  }
} 