import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Service from 'App/Services/PingService'

export default class PingsController {
  private service = new Service()
  public async index ({}: HttpContextContract) {
  }

  public async process ({params , response ,request}: HttpContextContract) {
    Logger.info('Start Ping Process')
    const {ping} = params
    response.ok({
      ping,
    })
    await this.service.process({data : {ping}})
  }
}
