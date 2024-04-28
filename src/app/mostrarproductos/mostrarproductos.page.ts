import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataFromFirebaseService } from '../services/get-data-from-firebase.service';

@Component({
  selector: 'app-mostrarproductos',
  templateUrl: './mostrarproductos.page.html',
  styleUrls: ['./mostrarproductos.page.scss'],
})
export class MostrarproductosPage implements OnInit {

  productosDelVendedor: any;
  productos: any;
  productosRegistrados: any;

  constructor(
    private idvendedor: ActivatedRoute,
    private datos: GetDataFromFirebaseService
  ) { }

  ngOnInit() {
    this.productosDelVendedor = this.idvendedor.snapshot.paramMap.get('idvendedor');
    console.log('el id es: ', this.productosDelVendedor);
    this.CargarLosProductos();
  }

  CargarLosProductos(){
    this.datos.buscarProductosPorIdDelVendedor(this.productosDelVendedor).subscribe(res =>{
      this.productos = res;
      this.productosRegistrados = this.productos.length;
      console.log("PRODUCTOS: ",this.productos);
    },err =>{
      console.log("error al cargar los productos: ", err);
    });
  }

}
