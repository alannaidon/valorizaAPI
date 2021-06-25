import { getCustomRepository } from 'typeorm'
import { ComplimentRepository } from '../repositories/ComplimentRepository'
import { UserRepository } from '../repositories/UserRepository'

interface IComplimentRequest {
	user_sender: string,
	user_receiver: string,
	tag_id: string,
	message: string
}

class CreateComplimentService {
	async execute({ user_sender, user_receiver, tag_id, message }: IComplimentRequest) {
		const complimentRepository = getCustomRepository(ComplimentRepository)
		const userRepository = getCustomRepository(UserRepository)

		// Check if they are the same user
		const receiver = await userRepository.findOne(user_receiver)
		const sender = await userRepository.findOne(user_sender)

		// Check if both users are valid
		if (!receiver) {
			throw new Error('Receiver is Invalid!')
		}

		if (user_receiver === user_sender) {
			throw new Error('Users are not allowed to register a compliment to themselves!')
		}

		const compliment = complimentRepository.create({
			user_sender,
			user_receiver,
			tag_id,
			message
		})

		await complimentRepository.save(compliment)
		return compliment
	}
}

export { CreateComplimentService }