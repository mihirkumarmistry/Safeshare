import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { ApiStatus } from '../../../model/api.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  protected userId: number;
  protected userForm: FormGroup;

  constructor(
    private router: Router,
    protected fb: FormBuilder,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.params.subscribe(d => {
      this.userId = +d['id'];
    })
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [null],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userTypeId: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
    });

    if (this.userId > 0) {
      this.getUser();
    }
  }

  // user form
  protected onSubmit(): void {
    if (this.userForm.valid) {
      this.apiService.postUsers(this.userForm.value).subscribe(resp => {
        if (resp.status == ApiStatus.Success) {
          this.router.navigate(['/user']);
          // Show Success
        } else {
          // Show error
        }
      });
    }
  }

  protected onCancel(): void {
    this.router.navigate(['/user']);
  }

  private getUser(): void {
    this.apiService.getUsersById(this.userId).subscribe((resp) => {
      if (resp.status == ApiStatus.Success && resp.data.length) {
        this.userForm.patchValue(resp.data[0]);
      }
    })
  }
}
