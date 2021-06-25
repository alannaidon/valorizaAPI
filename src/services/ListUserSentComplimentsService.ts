import { response } from "express"
import { getCustomRepository } from "typeorm"
import { ComplimentRepository } from "../repositories/ComplimentRepository"

class ListUserSentComplimentsService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentRepository)
    const compliments = await complimentsRepository.find({
      where: { user_sender: user_id }
    })

    if (!compliments) {
      return response.status(404).json({
        message: `This user didn't send any compliment yet. :O`
      })
    }

    return compliments
  }
}

export { ListUserSentComplimentsService }