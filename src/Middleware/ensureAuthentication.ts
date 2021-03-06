import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
interface IPayload {
  sub: string
}

export function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(' ') // Get only the token

  try {
    const { sub } = verify(token, process.env.SECRET_KEY) as IPayload

    request.user_id = sub
    return next()
  } catch (err) {
    return response.status(401).end()
  }
}