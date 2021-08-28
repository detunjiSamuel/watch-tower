import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/user'
export default class AuthController {
  public async index ({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      Logger.info('Login process started')
      const token = await auth.use('api').attempt(email, password)
      return response.ok({
        msg: 'Login Successful',
        ...token,
      })
    } catch (e) {
      return response.badRequest({
        msg: 'Invalid user credentials',
      })
    }
  }

  public async create ({ request, auth, response }: HttpContextContract) {
    const details = request.only([
      'email',
      'password',
    ])
    try {
      Logger.info('Register process started')
      const exists = await User.query()
        .where('email', details.email)
        .first()
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

  public async destroy ({ auth, response }: HttpContextContract) {
    //logout
    try {
      await auth.use('api').revoke()
      return {
        revoked: true,
      }
    } catch (e) {
      return response.badRequest({
        msg: e.message,
      })
    }
  }
}
