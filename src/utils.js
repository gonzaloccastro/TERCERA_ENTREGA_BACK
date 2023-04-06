import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";


const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const { commerce,database,random,image, name, internet } = faker;

faker.locale = "es";

export const generateProduct = ()=>{
    return {
        title:commerce.productName(),
        price:commerce.price(),
        stock:random.numeric(1),
        id:database.mongodbObjectId(),
        image:image.image(),
    }
}

export { createHash, isValidPassword };
