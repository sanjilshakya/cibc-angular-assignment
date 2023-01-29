import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService) {
    this.setTransactionForm();
  }

  id: any;
  transactionForm!: FormGroup;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== 'create')
      this.getTransactionDetail(this.id)
  }

  setTransactionForm() {
    this.transactionForm = this.formBuilder.group({
      _id: null,
      id: null,
      date: [null, Validators.required],
      Comments: [null, Validators.required]
    })
  }

  getTransactionDetail(id: any) {
    this.transactionService.getById(id)
      .subscribe({
        next: (res) => {
          res.date = moment(new Date(res.date)).format('MM/DD/YYYY')
          this.transactionForm.patchValue(res)
        },
        error: (e) => console.error(e)
      })
  }

  submit() {
    const reqBody = JSON.parse(JSON.stringify(this.transactionForm.value))
    !reqBody._id && (reqBody.date = new Date(reqBody.date).getTime())
    const request = reqBody._id ? this.transactionService.update(reqBody) : this.transactionService.create(reqBody)
    request.subscribe({
      next: (res) => {
        this.router.navigate(['/'])
      },
      error: (e) => console.error(e)
    })
  }

}
