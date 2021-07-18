import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, AngularDelegate } from '@ionic/angular';
import { PeticionesAPIService, SesionService, ComServerService} from '../servicios/index';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  clave: string;
  nickname: string;

  constructor(
    public navCtrl: NavController,
    private peticionesAPI: PeticionesAPIService,
    private sesion: SesionService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private comServer: ComServerService)  { }

    AutentificarJuegoRapido() {
        console.log ('Juego rapido ' + this.clave + ' ' + this.nickname);
        this.peticionesAPI.DameJuegoDeEncuestaRapida (this.clave)
        .subscribe ((juego) => {
          if (juego[0] !== undefined) {
            console.log ('Ya tengo el juego');
            console.log (juego[0]);
            this.sesion.TomaJuego(juego[0]);
            this.sesion.TomaNickName (this.nickname);
            this.comServer.EnviarNick (juego[0].profesorId, this.nickname);
            this.navCtrl.navigateForward('/juego-cuestionario-satisfaccion');

          } else {
            this.peticionesAPI.DameJuegoDeVotacionRapida (this.clave)
            .subscribe (async (juego) => {
              if (juego[0] !== undefined) {
                console.log ('Ya tengo el juego');
                console.log (juego[0]);
                this.sesion.TomaJuego(juego[0]);
                this.sesion.TomaNickName (this.nickname);
                this.comServer.EnviarNick (juego[0].profesorId, this.nickname);
               
                this.navCtrl.navigateForward('/juego-votacion-rapida');
              } else {
                  this.peticionesAPI.DameJuegoDeCuestionarioRapido (this.clave)
                  .subscribe (async (juego) => {
                    if (juego[0] !== undefined) {
                      console.log ('Ya tengo el juego');
                      console.log (juego[0]);
                      this.sesion.TomaJuego(juego[0]);
                      this.sesion.TomaNickName (this.nickname);
                      if (juego[0].Modalidad === 'Clásico') {
                        this.comServer.EnviarNick (juego[0].profesorId, this.nickname);
                      } else {
                        this.comServer.EnviarNickYRegistrar (juego[0].profesorId, this.nickname, this.clave);
                      }
                      this.navCtrl.navigateForward('/juego-de-cuestionario');
                      } else {
                        this.peticionesAPI.DameJuegoDeCogerTurnoRapido (this.clave)
                        .subscribe (async (juego) => {
                          if (juego[0] !== undefined) {
                            console.log ('Ya tengo el juego');
                            console.log (juego[0]);
                            this.sesion.TomaJuego(juego[0]);
                            this.sesion.TomaNickName (this.nickname);
                            // hay que enviar la clave también para poder recibir notificaciones
                            this.comServer.EnviarNickYRegistrar (juego[0].profesorId, this.nickname, this.clave);
                            this.clave = undefined;
                            this.nickname = undefined;
                          
                            this.navCtrl.navigateForward('/juego-coger-turno-rapido');
                          } else {
                              const alert = await this.alertController.create({
                                header: 'Error',
                                // subHeader: 'Subtitle',
                                message: 'No existe ningun juego rápido con esa clave',
                                buttons: ['OK']
                              });
                              await alert.present();
                              this.clave = undefined;
                              this.nickname = undefined;
                          }
                        });
                      }
                  });
                }
            });
          }
        });
    }
}



