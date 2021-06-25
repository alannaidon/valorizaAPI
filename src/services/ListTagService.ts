import { getCustomRepository } from "typeorm"
import { TagRepository } from "../repositories/TagRepository"
import { classToPlain } from 'class-transformer'

class ListTagService {
  async execute() {
    const tagsRepository = await getCustomRepository(TagRepository)
    const tags = tagsRepository.find()

    return classToPlain(tags)
  }

}

export { ListTagService }