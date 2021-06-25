import { Request, Response } from 'express'
import { ListUserReceivedComplimentsService } from '../services/ListUserReceivedComplimentsService'

class ListUserReceivedComplimentController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const listUserComplimentsService = new ListUserReceivedComplimentsService()

    const compliments = await listUserComplimentsService.execute(user_id)

    if (!compliments || compliments.length <= 0) {
      return response.status(404).json({
        message: `This user doesn't have a compliment yet. Why don't you give him a really nice first compliment? :)`
      })
    }

    return response.json(compliments)
  }
}

export { ListUserReceivedComplimentController }