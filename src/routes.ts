import { Router } from 'express'
import { AuthenticationUserController } from './controllers/AuthenticationUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ensureAdmin } from './Middleware/ensureAdmin'
import { ensureAuthentication } from './Middleware/ensureAuthentication'


const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticationController = new AuthenticationUserController()
const complimentController = new CreateComplimentController()

router.post('/users', createUserController.handle)

router.post('/tags', ensureAuthentication, ensureAdmin, createTagController.handle)

router.post('/session', authenticationController.handle)

router.post('/compliment', ensureAuthentication, complimentController.handle)

export { router }