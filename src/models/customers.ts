import {User} from "./user"
export interface Customer extends User {
  id: number,
  email: string
}
