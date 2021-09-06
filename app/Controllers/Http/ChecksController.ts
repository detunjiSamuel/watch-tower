import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Service from 'App/Services/CheckService'

export default class ChecksController {
  private Period = 5
  private Grace = 5
  private service = new Service()

  /** Get all checks for a user */
  public async index ({}: HttpContextContract) {
  }
  /** Create Check for user */
  public async create ({auth ,response}: HttpContextContract) {
    Logger.info('Create check process started %s',auth.user.email)
    try{
      const data = auth.user
      const check = await this.service.create({data})
      return response.created(check)
    }catch(e){
      return response.badRequest({
        msg:  e.message,
      })
    }
  }

  public async store ({}: HttpContextContract) {
  }
  /** Get Check info for particular id */
  public async show ({}: HttpContextContract) {
  }
  /** check info */
  public async edit ({}: HttpContextContract) {
  }

  /** Delete check */
  public async destroy ({}: HttpContextContract) {
  }
}
