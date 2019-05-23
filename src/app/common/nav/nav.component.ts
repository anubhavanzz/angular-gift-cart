import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { User } from 'src/app/models/user.model';
import { GiftDetailDispatcher } from '../store/gift-details-store/gift-details.dispatcher';
import { giftActionTypes } from '../store/gift-details-store/gift-details.action';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  users: User[];
  public isLogged: boolean;

  constructor(private authService: AuthService, private router: Router,
    private fbService: FirebaseService ,  public giftDetailDispatcher: GiftDetailDispatcher) {}

  ngOnInit() {
    this.isLogged = false;
    this.authService.getLoggedInUser();

    this.fbService.getAllUsersFromFirebase().subscribe(list => {
      this.users = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.giftDetailDispatcher.giftDetailDispatch(giftActionTypes.GET_ALL_USERS, this.users);
    });

  }

  onLogin() {
    this.authService.Login();
    this.isLogged = true;

  }
  home() {
    this.router.navigateByUrl('');
  }
  onLogout() {
    this.authService.Logout();
    this.router.navigateByUrl('');
  }

  manageUsers() {
    this.router.navigateByUrl('/admin/users');
  }

  manageOrders() {
    this.router.navigateByUrl('/admin/orders');
  }

  manageGifts() {
    this.router.navigateByUrl('/admin/gifts');
  }

  addCategory() {
    this.router.navigateByUrl('/admin/addCat');
  }

  addItem() {
    this.router.navigateByUrl('/admin/gifts/new');
  }

}
