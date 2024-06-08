
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerComponent } from './partner.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MenuComponent } from '../menu/menu.component';
import { MenuModule } from '../menu/menu.module';
import { PartnerComponentRoutingModule} from './parter-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MenuModule,
    PartnerComponentRoutingModule
  ],
  declarations: [PartnerComponent],
  exports: [MenuComponent],
})


export class PartnerModule {}
