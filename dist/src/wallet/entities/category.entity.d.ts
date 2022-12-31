import { ParentCategoriesEntity } from "./parentCategories.entity";
export declare class CategoryEntity {
    id: string;
    categoryName: string;
    parentCategory: ParentCategoriesEntity;
}
