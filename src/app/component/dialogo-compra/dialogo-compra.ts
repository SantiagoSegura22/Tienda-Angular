
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comestible } from '../../models/Comestible';

@Component({
  selector: 'app-dialogo-compra',
  standalone: true,
  imports: [],
  templateUrl: './dialogo-compra.html',
  styleUrl: './dialogo-compra.css'
})
export class DialogoCompra {

  // Recibe el producto seleccionado
  @Input() producto!: Comestible;
      // Recibe el título que se muestra arriba
  @Input() titulo = 'Confirmar compra';
  // Envía la compra al componente Inicio
  @Output() confirmar = new EventEmitter<{
    producto: Comestible;
    cantidad: number;
  }>();

  // Cantidad inicial
  cantidad: number = 1;

  // Calcula el precio total
  get total(): number {
    return this.producto.precio * this.cantidad;
  }

  // Actualiza la cantidad seleccionada
  cambiarCantidad(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cantidad = Number(input.value);
  }

  // Confirma la compra
  confirmarCompra(): void {

    if (!Number.isInteger(this.cantidad) || this.cantidad < 1) {
      alert('Ingresa una cantidad válida');
      return;
    }

    if (this.cantidad > this.producto.cantidad) {
      alert('No hay suficiente stock disponible');
      return;
    }

    this.confirmar.emit({
      producto: this.producto,
      cantidad: this.cantidad
    });
  }
}
