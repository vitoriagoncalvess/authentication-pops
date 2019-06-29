import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public userRegister: User = {};
  private loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    }
    catch(error) {
      let message: string;

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'O endereço de e-mail já está sendo usado por outra conta.';          
          break;
      
        case 'auth/invalid-email':
          message = 'E-mail inválido.';          
          break;
      }

      this.presentToast(message);
    }
    finally{
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Cadastrando...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
