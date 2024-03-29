import { CommonFunctionalityModule } from './../common/common.module';
import { NgModule } from '@angular/core';
import { GiftDetailsComponent } from './gift-details/gift-details.component';
import { GiveAGiftComponent } from './give-a-gift/give-a-gift.component';
import { GiftReviewComponent } from './gift-review/gift-review.component';
import { SenderReceiverRoutingModule } from './user-routes.module';
import { MaterialModule } from '../common/material.module';
import { CommonModule } from '@angular/common';
import { ReceiverDetailsComponent } from './receiver-details/receiver-details.component';
import { GetPointsComponent } from './get-points/get-points.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { GiftsReceivedComponent } from './gifts-received/gifts-received.component';

@NgModule({
  declarations: [ GiftDetailsComponent,
    GiveAGiftComponent,
    GiftReviewComponent,
    ReceiverDetailsComponent,
    GetPointsComponent,
    FeedbackFormComponent,
    OrderHistoryComponent,
    UserOrdersComponent,
    GiftsReceivedComponent
  ],
  imports: [
    CommonFunctionalityModule, SenderReceiverRoutingModule, MaterialModule, CommonModule
  ],
  entryComponents: [ReceiverDetailsComponent, FeedbackFormComponent]
})
export class SenderReceiverModule { }
