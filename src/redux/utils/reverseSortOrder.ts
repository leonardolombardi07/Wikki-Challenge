import { SortOrder } from "../../types/redux";

export function reverseSortOrder(sortOrder: SortOrder): SortOrder {
  return sortOrder === "ascending" ? "descending" : "ascending";
}
