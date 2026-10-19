import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VehiculoCard from './VehiculoCard';

describe('Pruebas Unitarias - Componente VehiculoCard', () => {
  const vehiculoPrueba = {
    id: 1,
    nombre: 'Volkswagen Polo Sport 2022',
    precio: 11990000,
    categoria: 'Deportivos',
    imagen: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600'
  };

  it('debe renderizar la informacion del vehiculo correctamente', () => {
    render(<VehiculoCard vehiculo={vehiculoPrueba} />);
    
    // Verifica que el nombre del vehiculo exista en pantalla
    expect(screen.getByText('Volkswagen Polo Sport 2022')).toBeInTheDocument();
    
    // Verifica que el precio formateado exista en pantalla
    expect(screen.getByText('$11.990.000')).toBeInTheDocument();
  });
});