import Logger from '@ioc:Adonis/Core/Logger'
import Ping from 'App/Models/Ping'

export default class PingService {
  private ping = new Ping()
  public async process ({data:{ping}}) {
    try{
      Logger.info('test after response %s',ping)
    } catch(e) {
      Logger.info('%s', e.message)
    }
  }
}

