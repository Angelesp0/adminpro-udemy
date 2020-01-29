import { Component, OnInit , OnDestroy} from '@angular/core';
import { Observable, interval, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy  {
  subscripcion: Subscription;
  constructor() {

  this.subscripcion = this.regresaObservable(). /*.pipe(
      retry(2)
    ).*/
      subscribe(
        numero => console.log('subs', numero),
        error => console.log('Error en el obs', error),
        () => console.log('El observador termino')
      );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('la pagina se va a cerrar');
    this.subscripcion.unsubscribe();
  }

 regresaObservable(): Observable<any> {
  return new Observable( (observer: Subscriber<any>) => {
    let contador = 0;

    let intervalo = setInterval( () => {

      contador += 1;

      const salida = {
        valor: contador
      };

      observer.next(salida);

    }, 1000);
  }).pipe(
    map(resp => resp.valor),
    filter( (valor, index) => {
      // console.log('filter ', valor, index);
      if ( (valor % 2) === 1 ) {
        // impar
        return true;
      } else {
        // par
        return false;
      }
    })
  );

 }
}
