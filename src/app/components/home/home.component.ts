import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
	constructor(
		public afs: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
	) {}

  groups: any;
  groups2: any;
  uid: string;
  user;
  showModal: boolean = false;
  showAddGroup: boolean = false;
  showEditGroup: boolean = false;
  currentGroup;
  searchKey: string;
  pageCount: number = 5;
  count: number = 5;
  pageIndex: number = 1;
  currentPages:any[] = [];

  pageWiseGroups = [];
  currentGroups = [];

  subscription1;
  subscription2;
  subscription3;

  isAdmin: boolean = false;

  ngOnInit(){
    this.authService.isLoggedin().subscribe((user) => {
      if(user){
        this.isAdmin = true;
      }else {
        this.isAdmin = false;
      }
    });
    (<any>document.getElementsByClassName('mainBox')[0]).style['background-image'] = "none";
  }

  
}
