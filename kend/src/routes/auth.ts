import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { auth } from '../middleware/auth'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Email kontrolü
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Bu email zaten kullanımda' })
    }

    // Şifre hashleme
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Yeni kullanıcı oluşturma
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: 'user'
    })

    await user.save()

    // Token oluşturma
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Kullanıcı kontrolü
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Geçersiz email veya şifre' })
    }

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Geçersiz email veya şifre' })
    }

    // Token oluşturma
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Giriş sırasında bir hata oluştu' })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' })
    }
    res.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Kullanıcı bilgileri alınamadı' })
  }
})

export { router as authRouter } 