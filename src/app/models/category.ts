export interface MainCategory<Category> {
    trivia_categories: Category;
}
export interface Category {
    id: string;
    name: string;
}
export interface difficultyLevel{
    name: string;
    level: string;
}