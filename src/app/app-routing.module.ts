import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import * as components from './components';

const routes: Routes = [
  { path: 'transactions', component: components.TransactionListComponent },
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  { path: 'transactions/:id', component: components.TransactionDetailComponent },
  { path: '**', component: components.NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
