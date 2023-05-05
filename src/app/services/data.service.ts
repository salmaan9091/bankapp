import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  CurrentUser:any=""
  CurrentAcno=''
  accounts:any={
    1000:{account_no:1000,name:"Nusaif",phone:8765439876,balance:12000000,password:"nusaif12",transaction:[] },
    1001:{account_no:1001,name:"Jony",phone:8769899876,balance:22000000,password:"jony1212",transaction:[] },
    1002:{account_no:1002,name:"Sam",phone:876523476,balance:32000000,password:"sam12123",transaction:[] },
    1003:{account_no:1003,name:"Rahul",phone:876098876,balance:42000000,password:"rahul12",transaction:[] },
   }

  constructor(private hc:HttpClient) { 
    console.log("ds constructor")
    // this.getDetails()
  }

  // getDetails(){
  //   if(localStorage.getItem("currentUser")){
  //     this.CurrentUser=JSON.parse(localStorage.getItem("currentUser")||'')
  //   }
  //   if(localStorage.getItem("accounts")){
  //     this.accounts=JSON.parse(localStorage.getItem("accounts")||'')
  //   }
  //   if(localStorage.getItem("acno")){
  //     this.CurrentAcno=JSON.parse(localStorage.getItem("acno")||'')
  //   }
    
  

saveDetails(){
  if(this.CurrentUser){
    localStorage.setItem("currentUser",JSON.stringify(this.CurrentUser))
  }
  if(this.accounts){
    localStorage.setItem("accounts",JSON.stringify(this.accounts))
  }
  if(this.CurrentAcno){
    localStorage.setItem("acno",JSON.stringify(this.CurrentAcno))
  }
}

  login(acno:any,pswd:any){

    let data={
      acno,
      pswd

    }

    return this.hc.post("http://localhost:3000/login",data)
    // if(acno in this.accounts){
    //   if(this.accounts[acno].password==pswd){
    //     this.CurrentUser=this.accounts[acno].name
    //     this.CurrentAcno=acno
    //     this.saveDetails()
    //     return true
    //   }
    //   else{
    //     return false
    //   }
    // }
    // else{
    //   return false
    // }
  }

  register(acno:any,uname:any,phone:any,pswd:any){

    let data={
      acno,
      uname,
      phone,
      pswd
    }

    return this.hc.post("http://localhost:3000/register",data)
  //   if(acno in this.accounts ){
  //   alert("Account Number already exists")
  //   return false

  // }
  // else{
  //   this.accounts[acno]={account_no:acno,name:uname,phone:phone,balance:0,password:pswd}
  //   this.saveDetails()
  //   console.log(this.accounts)
  //   return true
  // }
}
deposite(acno:any,pswd:any,amnt:any){
   const data={
    acno,
    pswd,
    amnt
   }
   return this.hc.post("http://localhost:3000/deposite",data,this.getOptions())
}
  getOptions(){
    const token=JSON.parse(localStorage.getItem("token")||'')
    let header=new HttpHeaders()
    if(token){
      console.log(token)
      header=header.append("x-access-token",token)
      options.headers=header
    }
    console.log(options)
    return options
  }



withdraw(acc:any,pswd:any,amnt:any){

  const data={
    acc,
    pswd,
    amnt
  }
  return this.hc.post("http://localhost:3000/withdraw",data,this.getOptions())





  // if(this.CurrentAcno==acc){
  //   if(this.accounts[acc].password==pswd){
  //     this.accounts[acc].balance-=parseInt(amnt)
  //     let details={"Type":"DEBIT","Amount":parseInt(amnt)}
  //     this.accounts[acc].transaction.push(details)
  //     this.saveDetails()
  //     alert("Balance is:"+this.accounts[acc].balance)
  //     return true
  //   }
  //   else{
  //     alert("invalid Password!!")
  //     return false
  //   }
  // }
  // else{
  //   alert("Invalid account number!!")
  //   return false
  // }
}
getTransation(){
  let data={
    acno:JSON.parse(localStorage.getItem("currentAcno")||'')
  }
  return this.hc.post("http://localhost:3000/transact",data,this.getOptions())


  
  // if(this.CurrentAcno){
  //   return this.accounts[this.CurrentAcno].transaction
  // }
  // else{
  //   alert("login Required")
  // }
}
deleteAcc(acc:any){
  // delete this.accounts[acc]
  // this.saveDetails()
  // return true
  return this.hc.delete("http://localhost:3000/delacc/"+acc,this.getOptions())

}
}
