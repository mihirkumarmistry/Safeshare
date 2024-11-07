import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
    });

    if (this.userId > 0) {
      this.temp();
    }
  }

  // user form
  protected onSubmit(): void {
    console.log(this.userForm.value);
  }

  protected onCancel(): void {
    this.router.navigate(['/user']);
  }

  // teamp function
  private temp(): void {
    const data = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password123",
      type: "Admin",
      isActive: true
    };

    this.userForm.patchValue(data);
  }
}
