
export enum Category {
  HouseBills = "House Bills",
  Food = "Food",
  Transportation = "Transportation",
  Entertainment = "Entertainment",
  Other = "Other",
}

export interface Expense {
  id: string;
  category: Category;
  name: string;
  amount: number;
}
