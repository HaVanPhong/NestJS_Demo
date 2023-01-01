import { DynamicModule, Module } from "@nestjs/common";
import { StoreConfig } from "src/configs/store.config";
import { StoreService } from "./store.service";



@Module({
  
})
export class StoreModule{
  static register(config: StoreConfig): DynamicModule{
    return {
      module: StoreModule,
      providers: [
        StoreService,
        {
          provide: "STORE_CONFIG",
          useValue: config
        }
      ],
      exports: [StoreService]
    }
  }
}