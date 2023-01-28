import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  id: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
