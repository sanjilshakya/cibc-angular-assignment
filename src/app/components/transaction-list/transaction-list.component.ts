import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';
import { finalize, Subscription } from 'rxjs';
import { DataService, TransactionService } from 'src/app/services';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions!: any[];
  sortBy = 'asc';
  loading = false;
  showChildOnly = false;
  minDate!: String;
  maxDate!: String;
  form!: FormGroup;
  searchQuery = {
    page: 1,
    limit: 10,
    sortBy: 'date',
    sortType: 'asc'
  }
  subscription: Subscription;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private transactionService: TransactionService) {
    this.setAdvanceFilterForm()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/transactions' || event.url === '/') {
          this.showChildOnly = false
        }
      }
    })
    this.subscription = this.dataService.getData().subscribe(data => {
      if (data && data.res) {
        const index = this.transactions.findIndex(x => x._id === data.res._id)
        if (index >= 0)
          this.transactions[index] = data.res;
        else this.transactions.push(data.res)
        this.showChildOnly = data.showChildOnly
      }
    });
  }

  ngOnInit(): void {
    this.getTransactions();
    if (this.router.url !== '/transactions') {
      let id: any = this.router.url.replace('/transactions/', '')
      if (id === 'create') id = null
      this.goToTransactionDetail({ _id: id })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    transaction && transaction._id ? this.router.navigate(['transactions/' + transaction._id]) : this.router.navigate(['transactions/create'])
    this.showChildOnly = true
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
