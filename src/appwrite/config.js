import conf from "../config/config.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  Databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.Databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.Databases.createDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async upadatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.Databases.updateDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, status, featuredImage }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.Databases.deleteDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.Databases.getDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async listPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.Databases.listDocuments(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
    }
  }

  // file upload service

  async uploadFile(file){
    try {
        return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file) 
    } catch (error) {
        console.log(error)
        return false
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
  }

   previewFile(fileId){
    try {
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    } catch (error) {
        console.log(error)
    }
  }

  
}

 const service = new Service();
export default service