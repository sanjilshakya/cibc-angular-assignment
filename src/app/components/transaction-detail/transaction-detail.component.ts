import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services';
import { senders, recipients, status } from '../../constants/mock-data.constant';
import * as moment from 'moment';
import { finalize } from 'rxjs';

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
  loading = false;
  transactionForm!: FormGroup;
  senders = senders;
  recipients = recipients;
  status = status;
  public customPatterns = { 'A': { pattern: new RegExp('\[A-Za-z0-9 _]')} };

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
      sender: [null, Validators.required],
      recipient: [null, Validators.required],
      status: [null, Validators.required],
      Comments: [null, Validators.required]
    })
  }

  getTransactionDetail(id: any) {
    this.loading = true;
    this.transactionService.getById(id)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe({
        next: (res) => {
          res.date = moment(new Date(res.date)).format("YYYY-MM-DD")
          this.transactionForm.patchValue(res)
        },
        error: (e) => console.error(e)
      })
  }

  submit() {
    const reqBody = JSON.parse(JSON.stringify(this.transactionForm.value))
    reqBody.date = new Date(reqBody.date + 'T00:00:00').getTime()
    const request = reqBody._id ? this.transactionService.update(reqBody) : this.transactionService.create(reqBody)
    request.subscribe({
      next: (res) => {
        this.router.navigate(['/'])
      },
      error: (e) => console.error(e)
    })
  }

}
