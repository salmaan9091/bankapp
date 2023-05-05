import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  transact:any
  constructor(private ds:DataService){
    ds.getTransation().subscribe((res:any)=>{
      console.log(res)
      this.transact=res.data
    })
    // console.log(this.transact)
  }
}
