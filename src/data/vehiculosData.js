export let listaVehiculos = [
  {
    id: 1,
    nombre: "Suzuki Swift Sport 2023",
    precio: 11990000,
    categoria: "Deportivos",
    imagen: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500",
    descripcion: "Hatchback compacto deportivo de excelente rendimiento."
  },
  {
    id: 2,
    nombre: "Toyota RAV4 2022",
    precio: 18990000,
    categoria: "SUVs",
    imagen: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500",
    descripcion: "SUV familiar espacioso y equipado."
  },
  {
    id: 3,
    nombre: "Ford Ranger 2021",
    precio: 16500000,
    categoria: "Camionetas",
    imagen: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500",
    descripcion: "Camioneta robusta para todo tipo de terreno."
  },
  {
    id: 4,
    nombre: "Hyundai Accent 2020",
    precio: 8500000,
    categoria: "Seminuevos",
    imagen: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500",
    descripcion: "Sedan economico certificado con respaldo CRSC."
  }
];

export const obtenerVehiculos = () => {
  return listaVehiculos;
};

export const agregarVehiculo = (nuevo) => {
  const vehiculoConId = { ...nuevo, id: Date.now() };
  listaVehiculos.push(vehiculoConId);
  return vehiculoConId;
};

export const eliminarVehiculo = (id) => {
  listaVehiculos = listaVehiculos.filter((item) => item.id !== id);
  return true;
};