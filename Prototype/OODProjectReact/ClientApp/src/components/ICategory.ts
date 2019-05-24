export interface ICategory {
    categoryId: string;
    name: string;
    subCategories: ICategory[];
}