import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user : any = {};
  registerationForm : FormGroup = null as any

  constructor( public formBuilder: FormBuilder, private alertify : AlertifyService) { }

  ngOnInit(): void {
    this.registerationForm = this.formBuilder.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null ,[Validators.required, Validators.minLength(8)]],
      comfirmPassword: [null, [Validators.required, Validators.minLength(8)]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, {
      validators: this.passwordMatchingValidatior.bind(this)
    });
    this.registerationForm.controls['userName'].setValue('Khoa');

  }
  passwordMatchingValidatior(fg: FormGroup): Validators {
    const password = fg.get('password');
    const comfirmPassword = fg.get('comfirmPassword');
    if (!password || !comfirmPassword) return null as any;
    return password.value === comfirmPassword.value ?   null as any :
    {notmatched: true};
  }

  get userName(){
    return this.registerationForm.get('userName') as FormControl;
  }

  get email(){
    return this.registerationForm.get('email') as FormControl;
  }

  get password(){
    return this.registerationForm.get('password') as FormControl;
  }

  get comfirmPassword(){
    return this.registerationForm.get('comfirmPassword') as FormControl;
  }

  get mobile(){
    return this.registerationForm.get('mobile') as FormControl;
  }

  onSubmit(){
    if(this.registerationForm.valid){
      console.log(this.registerationForm.value);
      this.user = Object.assign(this.user, this.registerationForm.value);
      this.addUser(this.user);
      this.alertify.success('Congrats, you are successfully registered');
      //this.registerationForm.reset();
    }
    else{
      this.alertify.error('Kindly provide the required fields');
    }
  }
  addUser(user: any){
    let users: any = [];
    let userTemp = [];
    if(localStorage.getItem('Users')){
      userTemp = JSON.parse(localStorage.getItem('Users') || '{}');
      userTemp.forEach((item: any) => {
        users.push(item);
      })
    }
    users.push(user);
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
