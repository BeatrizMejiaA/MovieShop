import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerComponent } from './partner.component';

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerComponentRoutingModule {}
