import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WalletEntity } from "./wallet.entity";
import { CategoryEntity } from "./category.entity";

@Entity()
export class ParentCategoriesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(()=>WalletEntity, (wallet)=>wallet.parentCategory)
  wallet: WalletEntity

  @OneToMany(()=>CategoryEntity, (category)=> category.parentCategory)
  category: CategoryEntity[]

}
