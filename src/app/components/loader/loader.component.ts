import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
  @Input() public loader!: boolean;
  constructor() { }

  ngOnInit() { }
}
