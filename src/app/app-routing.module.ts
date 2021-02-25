
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'juego-de-cuestionario', loadChildren: './juego-de-cuestionario/juego-de-cuestionario.module#JuegoDeCuestionarioPageModule'},
  { path: 'juego-cuestionario-satisfaccion', loadChildren: './juego-cuestionario-satisfaccion/juego-cuestionario-satisfaccion.module#JuegoCuestionarioSatisfaccionPageModule' },
  { path: 'juego-votacion-rapida', loadChildren: './juego-votacion-rapida/juego-votacion-rapida.module#JuegoVotacionRapidaPageModule' },
  { path: 'juego-coger-turno-rapido', loadChildren: './juego-coger-turno-rapido/juego-coger-turno-rapido.module#JuegoCogerTurnoRapidoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


