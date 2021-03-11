import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertsService
  ) { 
    environment.token = ''
  }

  ngOnInit(){
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      //IR NA PASTA ENVIRONMENT E DEFINIR OS CAMPOS COMO, POR EXEMPLO. NOME: ''
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.tipoUsuario = this.userLogin.tipoUsuario

      // console.log(environment.token) //VALIDANDO INFORMAÇÕES
      // console.log(environment.nome)
      // console.log(environment.foto)
      // console.log(environment.id)

      this.router.navigate(['/inicio'])
    }, erro =>{
      if(erro.status == 500){
        this.alert.showAlertDanger('Senha incorreta!')
      }
    })
  }
}