
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'juego-de-cuestionario', loadChildren: () => import('./juego-de-cuestionario/juego-de-cuestionario.module').then(m => m.JuegoDeCuestionarioPageModule)},
  { path: 'juego-cuestionario-satisfaccion', loadChildren: () => import('./juego-cuestionario-satisfaccion/juego-cuestionario-satisfaccion.module').then(m => m.JuegoCuestionarioSatisfaccionPageModule) },
  { path: 'juego-votacion-rapida', loadChildren: () => import('./juego-votacion-rapida/juego-votacion-rapida.module').then(m => m.JuegoVotacionRapidaPageModule) },
  { path: 'juego-coger-turno-rapido', loadChildren: () => import('./juego-coger-turno-rapido/juego-coger-turno-rapido.module').then(m => m.JuegoCogerTurnoRapidoPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


