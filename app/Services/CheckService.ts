
import Logger from '@ioc:Adonis/Core/Logger'
import Check from 'App/Models/Check'
import Bull from '@ioc:Rocketseat/Bull'
import Job from 'App/Jobs/CreateCheck'

import { v4 as uuidv4 } from 'uuid'

export default class CheckService {
  private check = new Check()
  public async create ({data}){
    try{
      const {id } = data
      const result= await this.check
        .fill({userId : id, pingAddress : this.createPingAddress() })
        .save()
      return result
    }catch(e) {
      Logger.info('%s', e.message)
      throw new Error('Error Occured Creating check')
    }
  }

  private createPingAddress () {
    return uuidv4()
  }
}
