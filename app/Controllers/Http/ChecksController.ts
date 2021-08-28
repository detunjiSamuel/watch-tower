import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Check from 'App/Models/Check'

export default class ChecksController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({auth , request , response}: HttpContextContract) {
    Logger.info('Create check process started')
    const check = new Check()
    await check.fill({name : 'testing' , userId : auth.user.id}).save()
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
