import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/user'

export default class AuthService {
  public async login ({auth, data:{email , password}}) {
    try{
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch(e) {
      Logger.info('%s', e.message)
      throw new Error('Invalid User Credentials')
    }
  }
  public async register ({auth,data}) {
    try{
      const { email , password } = data
      const exists = await User.query()
        .where('email', data.email)
        .first()
      if (exists) {
        throw new Error('Email is not unique')
      }
      await User.create({ ...data })
      const token = await auth.use('api').attempt(email,password)
      return token
    }catch(e) {
      Logger.info('%s', e.message)
      throw new Error(e.message)
    }
  }

  public async logout (auth) {
    try{
      await auth.use('api').revoke()
    }catch(e) {
      Logger.info('%s', e.message)
      throw new Error('Logout Error')
    }
  }
}
