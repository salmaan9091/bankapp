import { Component } from '@angular/core';
import{DataService} from '../services/data.service'
import{Router} from'@angular/router';
import{FormBuilder , Validators} from '@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //dacc:string=''
 // dpass:string=''
 // damnt:string=''

cuser:any=""
dd:any=new Date()
condtn=false
acno:any=""

  constructor(private ds:DataService,private r:Router, private fb:FormBuilder){
    this.cuser=localStorage.getItem("currentUser")
  }

  dform=this.fb.group({
    dacc:['',[Validators.required,Validators.pattern("[0-9]+")]],
    dpass:['',[Validators.required,Validators.pattern("[a-z A-Z 0-9]{8,}")]],
    damnt:['',[Validators.required,Validators.pattern("[0-9]+")]],
  })

  wform=this.fb.group({
    wacc:['',[Validators.required,Validators.pattern("[0-9]+")]],
    wpass:['',[Validators.required,Validators.pattern("[a-z A-Z 0-9]{8,}")]],
    wamnt:['',[Validators.required,Validators.pattern("[0-9]+")]],
  
  })
  

  clicked(){
   console.log(this.dform.value.damnt)
   // console.log(this.dacc)
   // console.log(this.dpass)
   // console.log(this.damnt)
   let acc:any=this.dform.value.dacc
   let pass:any=this.dform.value.dpass
   let amnt:any=this.dform.value.damnt
  //  if(this.dform.get("dacc")?.errors){
  //   alert("Invalid Account Number")
  // }
  // if(this.dform.get("dpass")?.errors){
  //   alert("Invalid Password")
  // }
  // if(this.dform.get("damnt")?.errors){
  //   alert("Invalid Amount")
  // }
  // if(this.dform.valid){
let res=this.ds.deposite(acc,pass,amnt)
res.subscribe((res:any)=>{
  alert(res.message)
},
(err:any)=>{
  alert(err.error.message)
})
//let res=this.ds.deposite(this.dacc,this.dpass,this.damnt)
//    if (res==true){
//   alert("Deposite Successfull!!")
//   // this.r.navigateByUrl("")
// }
// else{
//   alert("Deposite failed")
// }
//   }
    
  }
  clicked1(){
    console.log(this.wform.value)
    let acc=this.wform.value.wacc
    let pass=this.wform.value.wpass
    let amnt=this.wform.value.wamnt
    // if(this.wform.get("wacc")?.errors){
    //   alert("Invalid Account Number")
    // }
    // if(this.wform.get("wpass")?.errors){
    //   alert("Invalid Password")
    // }
    // if(this.wform.get("wamnt")?.errors){
    //   alert("Invalid Amount")
    // }
    // if(this.wform.valid){
    let res=this.ds.withdraw(acc,pass,amnt)
    res.subscribe((res:any)=>{
      alert(res.message)
    },
    (err:any)=>{
      alert(err.error.message)
    })
    // console.log(this.dacc)
   // console.log(this.dpass)
   // console.log(this.damnt)
   //let res=this.ds.deposite(this.dacc,this.dpass,this.damnt)
  //  if (res==true){
  //   alert("Withdrawl Successfull!!!")
  //   // this.r.navigateByUrl("")
  //  }

  //   }
  //  else{
  //   alert("Withdrawl failed!!")
  }
  

  logout(){
    this.r.navigateByUrl("")
    localStorage.removeItem("acno")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token") 

  }

deleteacc(){
this.acno=JSON.parse(localStorage.getItem("currentAcno")||'')
console.log(this.acno)
}
deleteaccount(event:any){
  console.log(event)
  this.ds.deleteAcc(event).subscribe(res=>{
    if(res){
      localStorage.removeItem("acno")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("token") 
      this.r.navigateByUrl("")
     }
  },
  err=>{
    alert(err.error.message)
  })
}
canceldelete(){
  this.acno=''
}

}