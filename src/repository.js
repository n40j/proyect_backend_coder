class Repository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getAll(collectionName) {
      return await this.dao.getAll(collectionName);
    }
  
    async getById(collectionName, id) {
      return await this.dao.getById(collectionName, id);
    }
  
    
  }
  
  module.exports = Repository;
  