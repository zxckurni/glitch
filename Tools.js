module.exports = class{
  constructor(app){
    this.app = app
    this.app.get('*', this.getRequest)
  }
  getRequest(req, res){
    res. send('Hellllooo')
  }
}