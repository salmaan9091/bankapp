import { Component, Input,Output,EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {
  @Input() item:string|undefined

  @Output() onCancel=new EventEmitter()

  @Output() onDelete=new EventEmitter()

  constructor(private ds:DataService,private r:Router){
    console.log(this.item)
  }
  cancel(){
    this.onCancel.emit()
  }

  deleteacc(){
    this.onDelete.emit(this.item)
  }
  // deleteacc(){
  //   let res=this.ds.deleteAcc(this.item)
  //   if(res==true){
  //     localStorage.removeItem("currentUser")
  //     localStorage.removeItem("acno")
  //     this.r.navigateByUrl("")
  //   }
  //   else{
  //     alert("Account Deleting Failed!!")
  //   }
  // }
}

