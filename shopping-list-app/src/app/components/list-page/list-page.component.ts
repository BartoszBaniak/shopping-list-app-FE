import { Component, inject } from '@angular/core';
import { UserDetails } from '../../models/user-details-data';
import { AuthService } from '../../services/auth.service';
import { ListsService } from '../../services/lists.service';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { HttpHandler, HttpHeaders } from '@angular/common/http';
import { ListsData } from '../../models/list-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent {
  firstNameInitial: string = '';
  uuid?: string;
  userDetails?: UserDetails;
  listId!: number;
  listDetails?: ListsData;
  private profileService = inject(ProfileService);
  private listsService = inject(ListsService);

  constructor (
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.authService.decodeToken();
    if (this.authService.decodedToken) {
      this.uuid = this.authService.decodedToken.sub;
    }
    this.getProfileDetails();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.listId = +id;
        this.getListDetails();
      }
    });
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

  getListDetails(): void {
    this.listsService.getListById(this.listId).subscribe(
      (response) => {
        this.listDetails = response;
        console.log(this.listDetails?.name);
      },
      (error) => {
        console.error('Error fetching list details:', error);
      }
    );
  }

}
