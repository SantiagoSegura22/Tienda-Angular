import { Component, inject, signal, OnInit } from '@angular/core';
import { InicioService } from '../../service/inicio-service';
import { Comestible } from '../../models/Comestible';
import { DialogoCompra } from '../dialogo-compra/dialogo-compra';

@Component({
  imports: [DialogoCompra],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio implements OnInit {
  private inicioService = inject(InicioService);

  listaFrutas = signal<Comestible[]>([]);
  listaVegetales = signal<Comestible[]>([]);
  listaAlmidones = signal<Comestible[]>([]);

  mostrarDialogo = signal(false);
  productoSeleccionado = signal<Comestible | null>(null);

  mostrarDialogoOferta = signal(false);
  productoOferta = signal<Comestible | null>(null);

  carrito: { producto: Comestible; cantidad: number }[] = [];

  ngOnInit(): void {
    this.inicioService.getComestibles().subscribe({
      next: (data) => {
        this.listaFrutas.set(data.filter(i => i.categoria?.toLowerCase() === 'frutas'));
        this.listaVegetales.set(data.filter(i => i.categoria?.toLowerCase() === 'vegetales'));
        this.listaAlmidones.set(data.filter(i => i.categoria?.toLowerCase() === 'almidones'));
      },
      error: (err) => console.error('Error al cargar comestibles:', err),
    });
  }

  abrirDialogo(producto: Comestible): void {
    this.productoSeleccionado.set(producto);
    this.mostrarDialogo.set(true);
  }

  abrirOferta(): void {
    const primero = this.listaFrutas()[0];
    if (primero) {
      this.productoOferta.set(primero);
      this.mostrarDialogoOferta.set(true);
    }
  }

  recibirOferta(evento: { producto: Comestible; cantidad: number }): void {
    this.recibirCompra(evento);
    this.mostrarDialogoOferta.set(false);
  }

  recibirCompra(evento: { producto: Comestible; cantidad: number }): void {
    const existente = this.carrito.find(i => i.producto.id === evento.producto.id);
    const cantidadActual = existente ? existente.cantidad : 0;

    if (cantidadActual + evento.cantidad > evento.producto.cantidad) {
      alert('No hay suficiente stock para esa compra');
      return;
    }

    if (existente) {
      existente.cantidad += evento.cantidad;
    } else {
      this.carrito.push(evento);
    }

    alert(`¡Se agregó ${evento.producto.nombre} al carrito! Cantidad: ${evento.cantidad}`);
    this.mostrarDialogo.set(false);
  }
}