import {Router} from 'express'
const router = Router();

import * as productsCtrl from '../controllers/products.controller'
import * as imgproductsCtrl from '../controllers/imageproducts.controller'
import {authjwt} from '../middlewares'

router.post('/', [authjwt.verifyToken, authjwt.isAdmin], productsCtrl.createProduct)
router.get('/', authjwt.verifyToken, productsCtrl.getProducts)
router.get('/:productId',authjwt.verifyToken, productsCtrl.getProductById)
router.post('/img/:productId',authjwt.verifyToken,imgproductsCtrl.addImageProductById)
router.get('/category/:productId',authjwt.verifyToken, productsCtrl.getProductByCategory)
router.put('/:productId',[authjwt.verifyToken, authjwt.isModerator], productsCtrl.updateProductById)
router.delete('/:productId',[authjwt.verifyToken, authjwt.isModerator], productsCtrl.removeProductById)
router.delete('/d/:productId',[authjwt.verifyToken, authjwt.isAdmin], productsCtrl.deleteProductById)

export default router;