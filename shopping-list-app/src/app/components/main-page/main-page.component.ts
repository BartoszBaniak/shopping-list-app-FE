import { Component, ElementRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { UserDetails } from '../../models/user-details-data';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { DialogModule } from 'primeng/dialog'
import { ListsData } from '../../models/list-data';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ListsService } from '../../services/lists.service';

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
  firstNameInitial: string = '';
  shoppingLists: ListsData[] = [];
  private profileService = inject(ProfileService);
  private listsService = inject(ListsService);

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.decodeToken();
    if (this.authService.decodedToken) {
      this.uuid = this.authService.decodedToken.sub;
    }
    this.getProfileDetails();
    this.getShoppingLists();
  }

  getProfileDetails(): void {
    this.profileService.getProfileDetails().subscribe(
      (response) => {
        this.userDetails = response;
        this.firstNameInitial = this.userDetails.firstname.charAt(0);
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

  submitList() {
    if (this.newListName.trim().length > 0) {
      this.listsService.createList(this.newListName).
      subscribe(
        (response) => {
          console.log('List created:', response);
          this.isDialogOpen = false;
        },
        (error) => {
          console.log('Error creating post:', error);
        }
      );
    }
    this.refreshPage();
  }

  getShoppingLists() {
    const userId = this.authService.decodedToken.sub;
    if(userId) {
      this.listsService.getListsByUserId(userId).subscribe(
        (lists: ListsData[]) => {
          this.shoppingLists = lists;
        },
        (error) => {
          console.error('Error loading shopping lists', error);
        }
      );
    }
  }

  onListClick(lists: ListsData) {
    console.log('List clicked: ', lists.name);
  }

  showOverlayPanel(event: Event, overlayPanel: OverlayPanel) {
    overlayPanel.toggle(event);
  }

  deleteList(list: ListsData) {

  }

  renameList(list: ListsData) {

  }

  refreshPage(): void {
    window.location.reload();
  }

}
