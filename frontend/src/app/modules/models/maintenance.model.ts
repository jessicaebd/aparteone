export class Maintenance {
  id: number;
  apartmentId: number;
  category: string;

  constructor(id: number, apartmentId: number, category: string) {
    this.id = id;
    this.apartmentId = apartmentId;
    this.category = category;
  }
}
