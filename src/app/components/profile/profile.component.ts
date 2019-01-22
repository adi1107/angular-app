import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
	constructor(
    private route: ActivatedRoute,
		public afs: AngularFirestore,
    public authService: AuthService,
    public dataService: DataService,
    public router: Router,
    public snackBar: MatSnackBar
	) {}

  groups: any;
  groups2: any;
  id: string;
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

  friends = [];
  currentFriend;

  ngOnInit(){
    
    (<any>document.getElementsByClassName('mainBox')[0]).style['background-image'] = "none";

    this.route.params.forEach((params: Params) => {
      console.log(params['id']);
      this.id = params['id'];

      this.getCurrentProfile();
    });
  }

  getCurrentProfile(){
    this.dataService.getAllFriends().subscribe((data) => {
      console.log(data);
      this.friends = data;
      for(var i=0; i<this.friends.length; i++){
        if(this.friends[i].prof_id == this.id){
          this.currentFriend = this.friends[i];
        }
      }
    });
  }

  
}
