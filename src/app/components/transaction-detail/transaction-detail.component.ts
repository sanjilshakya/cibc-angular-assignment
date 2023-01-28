import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
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
      transactionID: null,
      date: null,
      comments: [null, Validators.required]
    })
  }

  getTransactionDetail(id: any) {
    this.transactionService.getById(id)
      .subscribe({
        next: (res) => {
          this.transactionForm.patchValue(res)
        },
        error: (e) => console.error(e)
      })
  }

}
