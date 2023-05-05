import { Component } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 name:string="ABCD Bank"
 phone:number=8281673172
 hint:string="Enter Your Account Number"
 hint1:string="Enter Your Password"
 acc:string=''
 password:string=''

 condtn=false

constructor(private r:Router,private ds:DataService,private fb:FormBuilder){}//dependency injection

logform=this.fb.group({
  acno:['',[Validators.required,Validators.pattern("[0-9]+")]],
  password:['',[Validators.required,Validators.pattern("[a-z A-Z 0-9]{8,}")]],
})

 clicked(){
  let account:any=this.logform.value.acno
  let pass:any=this.logform.value.password

  let result=this.ds.login(account,pass)
  result.subscribe((resp:any)=>{
    if(resp){
      localStorage.setItem("currentUser",resp.currentUser)
      localStorage.setItem("currentAcno",resp.currentAcno)
      localStorage.setItem("token",JSON.stringify( resp.token))
      alert(resp.message)
      this.r.navigateByUrl("dashb")
    }
  },
  (err)=>{
    alert(err.error.message)
  })
}
}
//   let acc=this.logform.value.acno
//   let pswd=this.logform.value.password
//   if(this.logform.get("acno")?.errors){
//     alert("Invalid Account Number")
//   }
//   if(this.logform.get("password")?.errors){
//     alert("Invalid password")
//   }
//   if(this.logform.valid){
//   let res=this.ds.login(acc,pswd)
//  // let res=this.ds.login(this.acc,this.password)
// if(res==true){
//   alert("Login successfull!!")
//   // localStorage.setItem("acno",this.acc)
//   this.r.navigateByUrl("dashb")
// }
// else{
//   alert("Login failed!!Invalid acc no or password")
// }
   
//  }
//  else{
//   alert("Invalid Data!!!")
//  }
// }
// }
