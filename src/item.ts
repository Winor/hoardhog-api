import axios from "axios";
import urlParser from "./urlParser";
import { it } from "node:test";

export interface NewItem {
    id: number,
    name: string,
    quantity: number | null,
    category_id: number | null,
    description: string | null,
    location_id: number | null,
}

class Item {
    id: number;
    name: string;
    quantity: number;
    category_id: number;
    description: string;
    location_id: number;
    private url = urlParser("{{app-protocol}}://{{app-url}}/{{api-path}}/items");

    constructor(item: Partial<Item>) {
        this.id = item.id;
        this.name = item.name;
        this.quantity = item.quantity;
        this.category_id = item.category_id;
        this.description = item.description;
        this.location_id = item.location_id;
    }

    async all() : Promise<Item[]> {
        try {
          const response = await axios.get<Item[]>(this.url);
          const list: Item[] = []
          response.data.forEach(itm => {
            list.push(new Item(itm))
          });
          return list;
        } catch (error) {
            return error;
        }
      }
    
    async new(item: Partial<Omit<Item, "id">>) : Promise<Item> {
      try {
        const response = await axios.post<Item>(this.url, item);
        return new Item(response.data);
      } catch (error) {
          return error;
      }
    }

    async edit(item: Partial<Item>) : Promise<Item> {
      try {
        const updated = Object.assign(this, item)
        const response = await axios.put<Item>(this.url, updated);
        return new Item(response.data);
      } catch (error) {
          return error;
      }
    }

    async update() : Promise<Item> {
      try {
        const response = await axios.put<Item>(this.url, this);
        return new Item(response.data);
      } catch (error) {
          return error;
      }
    }


}

export default new Item({})