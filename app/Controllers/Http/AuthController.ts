import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'
import Route from '@ioc:Adonis/Core/Auth'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async index ({ request, auth, response }: HttpContextContract) {
    // login a user
    // nb = 
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password)
      return response.ok({
        msg: 'Login Successful',
        ...token })
    } catch(e) {
      return response.badRequest({
        msg : 'Invalid user credentials',
      })
    }
  }

  public async create ({ request, auth, response }: HttpContextContract) {
    const details = request.only([
      'email',
      'password',
    ])
    try {
      const exists = await User.first('email', details.email)
      if (exists) {
        response.forbidden({ error: 'User email is not unique ' })
      } else {
        await User.create({ ...details })
        console.log('first check')
        const token = await auth.use('api').attempt(details.email, details.password)
        console.log(token)
        return response.ok({
          msg:
            'Registration successful.',
          ...token,
        })
      }
    } catch (e) {
      return response.badRequest(e.message)
    }
  }

  public async store ({ }: HttpContextContract) {
  }

  public async show ({ }: HttpContextContract) {
  }

  public async edit ({ }: HttpContextContract) {
  }

  public async update ({ }: HttpContextContract) {
  }

  public async destroy ({ }: HttpContextContract) {
  }
}
