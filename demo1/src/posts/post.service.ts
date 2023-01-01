import { Injectable } from "@nestjs/common";
import { StoreService } from "src/store/store.service";

@Injectable()
export class PostService{
  constructor(private readonly storeService: StoreService){

  }

  save(data: any){
    this.storeService.save(data);
  }
  
}