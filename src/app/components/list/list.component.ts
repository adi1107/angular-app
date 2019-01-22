import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class FriendsListComponent implements OnInit{
	constructor(
		public afs: AngularFirestore,
    public authService: AuthService,
    public dataService: DataService,
    public router: Router,
    public snackBar: MatSnackBar
	) {}

  friends: any;
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
  currentFriends = [];

  subscription1;
  subscription2;
  subscription3;

  ngOnInit(){
    
    (<any>document.getElementsByClassName('mainBox')[0]).style['background-image'] = "none";

    this.dataService.getAllFriends().subscribe((data) => {
      console.log(data);
      this.currentFriends = data;
      this.friends = data;
    });
  }

  goToProfile(currFriend){
    console.log(currFriend);
    this.router.navigate(['profile/'+currFriend.prof_id]);
  }

  search(){
    this.currentFriends = [];
    for(var i=0; i<this.friends.length; i++){
      if(this.friends[i].name.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase())){
        this.currentFriends.push(this.friends[i]);
      }
    }
  }

  
}
