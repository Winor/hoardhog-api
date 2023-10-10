import Item  from "./item"
import { Location } from "./locations"
import { Category } from "./category"

export interface AllItems {
    item: typeof Item,
    location: Location,
    category: Category,
}