import { Component, ElementRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { UserDetails } from '../../models/user-details-data';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { DialogModule } from 'primeng/dialog'
import { ListsData } from '../../models/list-data';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})

export class MainPageComponent {
  uuid?: string;
  userDetails?: UserDetails;
  isDialogOpen = false;
  visible = false;
  newListName: string = '';
  shoppingLists: ListsData[] = [];
  
  private profileService = inject(ProfileService);

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.decodeToken();
    if (this.authService.decodedToken) {
      this.uuid = this.authService.decodedToken.sub;
    }
    this.getProfileDetails()
  }

  getProfileDetails(): void {
    this.profileService.getProfileDetails().subscribe(
      (response) => {
        this.userDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showDialog(): void {
    this.openDialog();
  }

  openDialog() {
    this.isDialogOpen = true;
  }
  
  closeDialog() {
    this.isDialogOpen = false;
  }

  createNewList() {
    if (this.newListName.trim().length > 0) {
      this.shoppingLists.push({ name: this.newListName });
      this.newListName = '';
      this.isDialogOpen = false;
    }
  }
}
