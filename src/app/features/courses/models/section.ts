import { Lecture } from "./lecture";

export interface Section {
  id: string;
  title: string;
  order: number;
  lectures: Lecture[];
}
