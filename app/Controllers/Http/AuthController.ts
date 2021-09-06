import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Service from 'App/Services/AuthService'
export default class AuthController {
  private service = new Service()
  public async index ({ request, auth, response }: HttpContextContract) {
    Logger.info('Login process started')
    const data = request.only(['email', 'password'])
    try{
      const token = await this.service.login({auth, data})
      return response.ok({
        msg: 'Login Successful',
        ...token,
      })
    } catch(e) {
      return response.badRequest({
        msg:  e.message,

      })
    }
  }

  public async create ({ request,response , auth }: HttpContextContract) {
    //TODO add form validation
    Logger.info('Register process started')
    const data = request.only([
      'email',
      'password',
    ])
    try {
      const user = await this.service.register({data , auth})
      return response.ok({
        msg:
            'Registration successful.',
        ...user,
      })
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
    try {
      await this.service.logout(auth)
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
