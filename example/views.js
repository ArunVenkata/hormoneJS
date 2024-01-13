

class TestAPI{
  // static permissions = [];
  
  async GET(req, res){
    return res.Response({
      success: true
    })
  }
  
  async PATCH(req, res) {

  }
}
module.exports = {
  TestAPI
}