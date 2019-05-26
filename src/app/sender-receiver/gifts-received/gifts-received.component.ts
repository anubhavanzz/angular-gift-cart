import { Component, OnInit } from '@angular/core';
import { MatTableColumns } from 'src/app/common/MatTableColumns';
import { UserGiftCardMapping } from 'src/app/models/user-giftcard-mapping.model';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserPoints } from 'src/app/models/user-points.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-gifts-received',
  templateUrl: './gifts-received.component.html',
  styleUrls: ['./gifts-received.component.css']
})
export class GiftsReceivedComponent implements OnInit {

  // ColumnDef, HeaderCellDef
  matTableColumns: MatTableColumns[] = [
    new MatTableColumns('sender', 'Received From'),
    new MatTableColumns('giftCardName', 'Gift Card Name'),
    new MatTableColumns('giftCardId', 'GiftCard Number'),
    new MatTableColumns('points', 'Points'),
    new MatTableColumns('createdDate', 'Created Date'),
    new MatTableColumns('actions', 'Actions'),
  ];

  displayedColumns: string[] = ['sender', 'giftCardName', 'giftCardId', 'points', 'createdDate', 'actions'];

  allUsersGiftOrders: UserGiftCardMapping[];
  userReceivedGiftOrders: UserGiftCardMapping[];



  constructor(private fbService: FirebaseService,
    private authService: AuthService,
    private tostr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.fbService.getAllUserGiftCardFromFirebase().subscribe(list => {
      this.allUsersGiftOrders = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.userReceivedGiftOrders = this.allUsersGiftOrders.filter(order => order.receiver === this.authService.user.email);
    });


  }

  onCardRedeem(input) {
    this.openDialog(input);
    const selected = this.userReceivedGiftOrders.find(item => item.$key === item.$key);
    selected.isRedeem = true;
    this.fbService.updateUserGiftCardToFirebase(selected);

  }

  openDialog(giftData): void {
    const dialogRef = this.dialog.open(FeedbackFormComponent, {
      data: {
        height: '700px',
        width: '300px',
        gfdata: giftData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
