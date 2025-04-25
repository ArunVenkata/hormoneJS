import {sequelize} from "../src/sequelize_loader.js";

// console.log("Sequelize:", sequelize)
export class TestAPI{
  // static permissions = [];
  
  async GET(req, res){
    return res.Response({
      success: true
    })
  }
  
  async PATCH(req, res) {

  }
}

