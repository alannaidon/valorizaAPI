import { Router } from 'express'
import { AuthenticationUserController } from './controllers/AuthenticationUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ensureAdmin } from './Middleware/ensureAdmin'


const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticationController = new AuthenticationUserController()

router.post('/users', createUserController.handle)

router.post('/tags', ensureAdmin, createTagController.handle)

router.post('/session', authenticationController.handle)

export { router }