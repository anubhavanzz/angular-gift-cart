import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { GiftCard } from 'src/app/models/gift-card.model';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GIFT_DETAILS_DEFAULT } from 'src/app/common/store/gift-details-store/gift-details.defaults';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.css']
})
export class AddGiftComponent implements OnInit, OnDestroy {

  giftCard: GiftCard = GIFT_DETAILS_DEFAULT;
  giftCardsArray: GiftCard[];

  giftForm = this.fb.group({
    ImageUrl: ['', Validators.required],
    Points: ['', Validators.required],
    Description: ['', Validators.required],
    Price: ['', Validators.required],
    CreatedDate: [''],
    categoryName: ['', Validators.required],
    NumberOfTimesBought: [''],
    Brand: ['', Validators.required],
    Name: ['', Validators.required],
  });

  @ViewChild('giftForm') public addGiftForm: FormGroup;

  name = '';
  constructor(private fb: FormBuilder,
    private fbService: FirebaseService,
    private tostr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  public ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.fbService.getAllGiftCardsFromFirebase().subscribe(list => {
      this.giftCardsArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      if (id) {
        this.giftCard = this.giftCardsArray.filter(item => item.$key === id)[0];
      }
    });
  }

  onSave(giftForm) {

    const newGift = GIFT_DETAILS_DEFAULT;
    newGift.brand = giftForm.value.Brand;
    newGift.name = giftForm.value.Name;
    newGift.categoryName = giftForm.value.categoryName;
    newGift.description = giftForm.value.Description;
    newGift.imageUrl = giftForm.value.ImageUrl;
    newGift.points = giftForm.value.Points;
    newGift.price = giftForm.value.Price;
    newGift.createdDate = new Date().toString();
    newGift.numberOfTimesBought = 0;

    if (this.giftCard.$key) {
      newGift.numberOfTimesBought = this.giftCard.numberOfTimesBought;
      newGift.$key = this.giftCard.$key;
      this.fbService.updateGiftCardInFirebase(newGift);
      this.tostr.success('Updated Successfully');
    } else {
      this.fbService.addGiftCardToFirebase(newGift);
      this.tostr.success('Gift added Succcessfully');
    }
    this.router.navigateByUrl('/admin/gifts');

  }

  ngOnDestroy() {
    localStorage.setItem('giftFormDirty', 'true');
  }
}
