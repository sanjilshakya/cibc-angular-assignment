import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToTransactionDetail(id: number) {
    this.router.navigate(['transactions/' + id])
  }

}
