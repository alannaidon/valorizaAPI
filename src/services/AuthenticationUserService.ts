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
    let passwordMatch = false
    const user = await userRepository.findOne({ email })

    if (user) {
      passwordMatch = await compare(password, user.password)
    }

    if (!passwordMatch || !user) {
      throw new Error('email/password is incorrect!')
    }

    // JWT Token
    const token = sign({
      email: user.email,
    },
      process.env.SECRET_KEY, {
      subject: user.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticationUserService }