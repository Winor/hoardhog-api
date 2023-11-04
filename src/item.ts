import axios from "axios";
import urlParser from "./urlParser";
import { it } from "node:test";

const url = urlParser("{{app-protocol}}://{{app-url}}/{{api-path}}/items");

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

    constructor(item: Partial<Item>) {
        this.id = item.id;
        this.name = item.name;
        this.quantity = item.quantity;
        this.category_id = item.category_id;
        this.description = item.description;
        this.location_id = item.location_id;
    }

    async all() : Promise<Map<number,Item>> {
        try {
          const response = await axios.get<Item[]>(url);
          const list: Map<number,Item> = new Map();
          response.data.forEach(itm => {
            list.set(itm.id ,new Item(itm))
          });
          return list;
        } catch (error) {
            return error;
        }
      }

    async get(id: number) : Promise<Item> {
      try {
        const response = await axios.get<Item>(`${url}/${id}`);
        return new Item(response.data)
      } catch (error) {
        return error;
      }
    }
    
    async new(item: Partial<Omit<Item, "id">>) : Promise<Item> {
      try {
        const response = await axios.post<Item>(url, item);
        return new Item(response.data);
      } catch (error) {
          return error;
      }
    }

    async edit(item: Partial<Item>) : Promise<Item> {
      try {
        const updated = Object.assign(this, item)
        const response = await axios.put<Item>(url, updated);
        return new Item(response.data);
      } catch (error) {
          return error;
      }
    }

    async update() : Promise<Item> {
      try {
        const response = await axios.put<Item>(url, this);
        return new Item(response.data);
      } catch (error) {
          return error;
      }
    }

    instance(item: Partial<Item>) {
      return new Item(item)
    }


}

export default new Item({})