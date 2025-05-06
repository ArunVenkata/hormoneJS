import {sequelize} from "../src/sequelize_loader.js";

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

