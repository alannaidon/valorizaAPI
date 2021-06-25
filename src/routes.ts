import { Router } from 'express'
import { AuthenticationUserController } from './controllers/AuthenticationUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ensureAdmin } from './Middleware/ensureAdmin'
import { ensureAuthentication } from './Middleware/ensureAuthentication'
import { ListUserReceivedComplimentController } from './controllers/ListUserReceivedComplimentController'
import { ListUserSentComplimentController } from './controllers/ListUserSentComplimentController'
import { ListTagController } from './controllers/ListTagController'



const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticationController = new AuthenticationUserController()
const complimentController = new CreateComplimentController()
const complimentsReceivedController = new ListUserReceivedComplimentController()
const complimentsSentController = new ListUserSentComplimentController()
const listTagsController = new ListTagController()

router.post('/users', createUserController.handle)

router.post('/tags', ensureAuthentication, ensureAdmin, createTagController.handle)

router.get('/tags', ensureAuthentication, listTagsController.handle)

router.post('/session', authenticationController.handle)

router.post('/compliment', ensureAuthentication, complimentController.handle)

router.get('/compliment/received', ensureAuthentication, complimentsReceivedController.handle)

router.get('/compliment/sent', ensureAuthentication, complimentsSentController.handle)


export { router }