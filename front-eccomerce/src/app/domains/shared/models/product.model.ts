export interface Product {
  id: string; // Usa 'string' en lugar de 'number' si el ID es un string (como un UUID)
  title: string;
  price: number;
  images: string[]; // Si la API puede devolver solo una imagen, ajusta esto según sea necesario
  creationAt: Date; // Usa 'Date' si necesitas la fecha de creación como un objeto Date
}
