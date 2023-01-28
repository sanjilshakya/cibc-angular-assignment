import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions: any;
  sortBy = 'asc'

  constructor(private router: Router,
    private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions() {
    this.transactionService.getAll()
      .subscribe({
        next: (res) => {
          this.transactions = res
        },
        error: (e) => console.error(e)
      })
  }

  goToTransactionDetail(transaction?: any) {
    transaction ? this.router.navigate(['transactions/' + transaction.id]) : this.router.navigate(['transactions/create'])
  }

  sortByDate() {
    this.sortBy = this.sortBy === 'asc' ? 'desc' : 'asc'
  }

}
