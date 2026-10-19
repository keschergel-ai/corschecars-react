const CLAVE_STORAGE = 'corschecars_vehiculos_data';

const vehiculosIniciales = [
  {
    id: 1,
    nombre: "Volkswagen Polo Sport 2022",
    precio: 11990000,
    categoria: "Deportivos",
    imagen: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600",
    descripcion: "Hatchback compacto deportivo azul con excelente dinamismo."
  },
  {
    id: 2,
    nombre: "Nissan GT-R Nismo 2021",
    precio: 45990000,
    categoria: "Deportivos",
    imagen: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600",
    descripcion: "Superdeportivo de alta gama con motor V6 biturbo."
  },
  {
    id: 3,
    nombre: "Ford Expedition 2021",
    precio: 28500000,
    categoria: "SUVs",
    imagen: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
    descripcion: "SUV familiar de gran tamaño, tracción integral y máximo confort."
  },
  {
    id: 4,
    nombre: "Toyota Hilux SRX 4x4 2021",
    precio: 19990000,
    categoria: "Camionetas",
    imagen: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600",
    descripcion: "Camioneta diésel 4x4, ideal para trabajo pesado y faena."
  },
  {
    id: 5,
    nombre: "Chevrolet Camaro SS 2020",
    precio: 22990000,
    categoria: "Seminuevos",
    imagen: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600",
    descripcion: "Muscle car V8 seminuevo certificado con garantía oficial CRSC."
  }
];

// --- FUNCIONES CRUD CON PERSISTENCIA LOCALSTORAGE ---

export const obtenerVehiculos = () => {
  const guardados = localStorage.getItem(CLAVE_STORAGE);
  if (!guardados) {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(vehiculosIniciales));
    return vehiculosIniciales;
  }
  return JSON.parse(guardados);
};

export const guardarVehiculosEnStorage = (lista) => {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
};

export const agregarVehiculo = (nuevoVehiculo) => {
  const lista = obtenerVehiculos();
  const nuevoId = lista.length > 0 ? Math.max(...lista.map(v => v.id)) + 1 : 1;
  const vehiculoCreado = { id: nuevoId, ...nuevoVehiculo };
  lista.push(vehiculoCreado);
  guardarVehiculosEnStorage(lista);
  return vehiculoCreado;
};

export const eliminarVehiculo = (id) => {
  const lista = obtenerVehiculos().filter(v => v.id !== Number(id));
  guardarVehiculosEnStorage(lista);
  return lista;
};
