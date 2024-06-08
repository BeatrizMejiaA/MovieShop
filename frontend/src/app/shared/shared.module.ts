import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component'; // Adjust the path as needed

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, IonicModule],
  exports: [MenuComponent],
})
export class SharedModule {}
