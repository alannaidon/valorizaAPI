import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { UserRepository } from "../repositories/UserRepository"

import { sign } from "jsonwebtoken"

interface IAuthenticationRequest {
  email: string,
  password: string
}

class AuthenticationUserService {

  async execute({ email, password }: IAuthenticationRequest) {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ email })
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch || !user) {
      throw new Error('email/password is incorrect!')
    }

    // JWT Token
    const token = sign({
      email: user.email,
    },
      '4f995488c6055b6d181f5530dd7c2198', {
      subject: user.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticationUserService }