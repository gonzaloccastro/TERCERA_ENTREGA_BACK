/*import { Router } from "express";
import {getAllProducts, createNewProduct, modifyProduct, deleteProduct} from "../controller/products.controller.js";

const router = Router();

router.get('/', (req, res) => {getAllProducts});

router.post('/', (req,res) => {createNewProduct})

router.put('/:id', (req, res) => {modifyProduct})

router.delete('/:id', (req, res) => {deleteProduct})

export default router;*/


import { Router } from "express";
import ManagerMongoDb from "../dao/mongo/ManagerMongoDB.js";

const router = Router();
const productManger = new ManagerMongoDb.ProductManger(); 

router.get('/', async (req,res) => {
    const {limit, page, sort, query} = req.query
    let queryList = {limit, page, sort, query}
    
    try{
        const products = await productManger.getProduct(queryList);
        res.send({status: 'success', products})
    }
    catch (err){
        res.status(500).send(err.message);
    }
})

router.post('/', async (req,res) => {
    const newProduct = {
        ...req.body,
      };
      try {
        const response = await productManger.createProduct(newProduct);
        res.send(response);
      } catch (err) {
        res.status(500).send(err.message);
      }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    try{
        const response = await productManger.updateProduct(id, product);
        res.send(response); 
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const response = await productManger.deleteProduct(id);
        res.send({
            message: 'Product deleted successfully',
            id: id
        })
    }
    catch(err) {
        res.status(500).send( err.message)
    }
})


export default router;