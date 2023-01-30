import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  minDate!: String;
  maxDate!: String;
  form!: FormGroup;
  searchQuery = {
    page: 1,
    limit: 10,
    sortBy: 'date',
    sortType: 'asc'
  }

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
      startDate: [null, Validators.required],
      endDate: null
    })
  }

  getTransactions(query?: any) {
    this.loading = true;
    this.transactionService.getAll(query ?? this.searchQuery)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe({
        next: (res) => {
          this.transactions = res
        },
        error: (e) => console.error(e)
      })
  }

  filterTransactions() {
    if (this.form.value.startDate) {
      !this.form.value.endDate && (this.form.controls['endDate'].setValue(moment(new Date()).format("YYYY-MM-DD")))
      const advanceFilterValues = JSON.parse(JSON.stringify(this.form.value))
      advanceFilterValues.startDate = new Date(advanceFilterValues.startDate + 'T00:00:00').getTime()
      advanceFilterValues.endDate = new Date(advanceFilterValues.endDate + 'T00:00:00').getTime()
      this.getTransactions({ ...advanceFilterValues, ...this.searchQuery })
    }
    else
      this.getTransactions()
  }

  clearForm() {
    this.form.reset();
    this.minDate = ''
    this.maxDate = ''
  }

  goToTransactionDetail(transaction?: any) {
    transaction ? this.router.navigate(['transactions/' + transaction._id]) : this.router.navigate(['transactions/create'])
  }

  sort(field: string) {
    this.searchQuery.sortType = this.searchQuery.sortBy == field ? this.searchQuery.sortType === 'asc' ? 'desc' : 'asc' : 'asc'
    this.searchQuery.sortBy = field
    this.filterTransactions()
  }

  checkDate() {
    this.form.value.startDate && (this.maxDate = moment(new Date(this.form.value.startDate + 'T00:00:00')).format('YYYY-MM-DD'))
    this.form.value.endDate && (this.minDate = moment(new Date(this.form.value.endDate + 'T00:00:00')).format('YYYY-MM-DD'))
  }

}
