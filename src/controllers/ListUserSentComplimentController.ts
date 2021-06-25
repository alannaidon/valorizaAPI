import { Request, Response } from 'express'
import { ListUserSentComplimentsService } from '../services/ListUserSentComplimentsService'

class ListUserSentComplimentController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const listUserComplimentsService = new ListUserSentComplimentsService()

    const compliments = await listUserComplimentsService.execute(user_id)

    return response.json(compliments)
  }
}

export { ListUserSentComplimentController }