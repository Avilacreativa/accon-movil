import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes: OSNotificationPayload[] = [];

  pushListener = new EventEmitter<OSNotificationPayload>();


  constructor(
    private oneSignal: OneSignal,
    private storaga: Storage
  ) { 
    this.cargarMensajes();
  }

  configuracionInicial(){
    this.oneSignal.startInit('1c75205b-91c6-4ed2-b5a3-aa0b61dff5c9', '1098922948287');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
     // do something when notification is received
    //  console.log('Notificación recibida', noti);
     this.notificacionRecibida( noti );
    });
    
    this.oneSignal.handleNotificationOpened().subscribe( async (noti) => {
      // do something when a notification is opened
      // console.log('Notificación abierta', noti);
     await this.notificacionRecibida( noti.notification ); 
    });
    
    this.oneSignal.endInit();
  }
  async notificacionRecibida( noti: OSNotification ){

    await this.cargarMensajes();

    const payload = noti.payload;
    const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID);

    if (existePush){
      return;
    }
    this.mensajes.unshift( payload );
    this.pushListener.emit( payload );

    await this.guardarMensajes();

  }
  async getMensajes(){
    await this.cargarMensajes();
    return [...this.mensajes];
  }
  guardarMensajes(){
    this.storaga.set('mensajes', this.mensajes);

  }
  async cargarMensajes(){
     
    this.mensajes = await this.storaga.get('mensajes') || [];

    return this.mensajes;

  }
}
