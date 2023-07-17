export class CreatePlateDto {
    id: number;
    plate: string;
    brand: string;
    model: string;
    color: string;
    entrance: string = null;
    departure: string = null;
}
