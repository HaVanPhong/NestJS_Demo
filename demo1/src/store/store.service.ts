import { Inject, Injectable } from "@nestjs/common";
import { StoreConfig } from "src/configs/store.config";
import * as fs from 'fs'

@Injectable()
export class StoreService{
  constructor(@Inject("STORE_CONFIG") private readonly storeConfig: StoreConfig){
    if (!fs.existsSync(storeConfig.dir)){
      fs.mkdirSync(storeConfig.dir)
    }
  }

  save(data: any){
    fs.appendFileSync(`${this.storeConfig.dir}/${this.storeConfig.filename}`, JSON.stringify(data));
  }
  

}