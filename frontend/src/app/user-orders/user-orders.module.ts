// user-orders.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MenuModule } from '../menu/menu.module'; // Import MenuModule
import { UserOrdersComponent } from './user-orders.component';
import { UserOrdersRoutingModule} from './user-orders-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    UserOrdersRoutingModule,
    MenuModule, // Include MenuModule here
  ],
  declarations: [UserOrdersComponent], // Declare UserOrdersComponent
})
export class UserOrdersModule {}
