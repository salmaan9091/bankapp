import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   

condn=false
constructor(private ds:DataService,private r:Router,private fb:FormBuilder){}

regform=this.fb.group({
  acno:['',[Validators.required,Validators.pattern("[0-9]+")]],
  username:['',[Validators.required,Validators.pattern("[a-zA-Z 0-9]+")]],
  phone:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
  password:['',[Validators.required,Validators.pattern("[a-zA-Z0-9]{8,}")]],
})
clicked(){
  let acc=this.regform.value.acno
  let us=this.regform.value.username
  let ph=this.regform.value.phone
  let pswd=this.regform.value.password
  if(this.regform.get("acno")?.errors){
    alert("Invalid Account Number ")
  }
  if(this.regform.get("username")?.errors){
    alert("Invalid Username ")
  }
  if(this.regform.get("phone")?.errors){
    alert("Invalid Phone ")
  }
  if(this.regform.get("password")?.errors){
    alert("Invalid Password")
  }
 
  if(this.regform.valid){
    let res=this.ds.register(acc,us,ph,pswd)
     res.subscribe((resp:any)=>{
      if(resp){
        alert(resp.message)
        this.r.navigateByUrl("") 
     }
    },
    (err:any)=>{
      alert(err.error.message)
    })
    
    // if(res==true){
    //   alert("registration Successfull!!")
    //   this.r.navigateByUrl("")
    // }
    // else{
    //   alert("registration failed")
    // }
  }
  else{
    alert("Invalid Data")
  }
}
 
}
