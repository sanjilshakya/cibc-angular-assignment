import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { finalize } from 'rxjs';
import { TransactionService } from 'src/app/services';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions: any;
  sortBy = 'asc';
  loading = false;
  form!: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService) {
    this.setAdvanceFilterForm()
  }

  ngOnInit(): void {
    this.getTransactions()
  }

  setAdvanceFilterForm() {
    this.form = this.formBuilder.group({
      startDate: null,
      endDate: null,
      isDesc: false,
    })
  }

  getTransactions(query?: any) {
    this.loading = true;
    this.transactionService.getAll(query)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe({
        next: (res) => {
          this.transactions = res
        },
        error: (e) => console.error(e)
      })
  }

  filterTransactions() {
    const advanceFilterValues = JSON.parse(JSON.stringify(this.form.value))
    advanceFilterValues.startDate = moment(advanceFilterValues.startDate).format('DD/MM/YYYY')
    advanceFilterValues.endDate = moment(advanceFilterValues.endDate).format('DD/MM/YYYY')
    this.getTransactions(advanceFilterValues)
  }

  goToTransactionDetail(transaction?: any) {
    transaction ? this.router.navigate(['transactions/' + transaction._id]) : this.router.navigate(['transactions/create'])
  }

  sortByDate() {
    this.sortBy = this.sortBy === 'asc' ? 'desc' : 'asc'
    this.getTransactions({ sortBy: this.sortBy })
  }

}
