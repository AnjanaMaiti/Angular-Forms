import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  EnquiryForm: FormGroup;
  FIRSTNAME:String="John";
  LASTNAME:String="Doe";
  MOBILE:String="9999999999";
  EMAILID:String="john@mail.com";
  namePattern = /^\S[a-z A-Z]+$/;
  emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  constructor(@Inject(DOCUMENT) private document: any) {  
    const form: FormGroup = new FormGroup({});
    form.addControl('firstName', new FormControl(this.FIRSTNAME, [Validators.required,Validators.pattern(this.namePattern), Validators.minLength(2), Validators.maxLength(30)]));
    form.addControl('lastName', new FormControl(this.LASTNAME, [Validators.required, Validators.pattern(this.namePattern), Validators.minLength(1), Validators.maxLength(30)]));
    form.addControl('mobileNo', new FormControl(this.MOBILE, [Validators.required, Validators.pattern("^[6-9][0-9]{9,14}$"), Validators.minLength(10), Validators.maxLength(10)]));
    form.addControl('email', new FormControl(this.EMAILID, [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(70)]));
    form.addControl('groupSize', new FormControl(''));
    form.addControl('departureDate', new FormControl(''));
    form.addControl('message', new FormControl('', [Validators.required,Validators.maxLength(1600),this.specialcharInputAddressCheck.bind(this)]));
    form.addControl('termscondition', new FormControl('', [Validators.required,Validators.pattern('true')]));
    form.addControl('captcha', new FormControl('', [Validators.required]));
    this.EnquiryForm = form;
  }
 
  siteKey:any;
  ngOnInit(): void {
    this.siteKey = environment.SITEKEY;
  }
  groupArray:any=[1,2,3,4,5,6,7,8,9,10]
  DatesArray:any=['1stJan 2020','2nd Jan 2020'];
  // siteKey
  groupSize:any;departureDate:any;selectedGroupSize:any;selectedDepartureDate:any;
  submitted:Boolean=false;
  FormSubmit(){      
    this.submitted = true;
    if (this.EnquiryForm.status !='VALID'){
      return;
    }else{
      alert("valid form");
    }
 
  }
  FormReset(){
    this.EnquiryForm.reset()
    this.submitted = false;
  }

  /*number input */
  numberInput($event) {
    var keycode = $event.which;
    if (!(keycode >= 48 && keycode <= 57)) {
        $event.preventDefault();
    }
  }
  /*special char & number & rupee symbol ( Rs.)*/
  flInput($event) {
    var keycode = $event.which;
    if ((keycode >= 33 && keycode <= 47) || (keycode >= 91 && keycode <= 96) || (keycode >= 48 && keycode <= 64) || (keycode == 8377)) {
        $event.preventDefault();
    }
  }
  AvoidSpace($event) {
    var keycode = $event.which;
    if (keycode == 32)
    $event.preventDefault();
  }
  /*special char & rupee symbol ( Rs.)*/
  specialcharInput($event) {
    var keycode = $event.which;
    if ((keycode >= 33 && keycode <= 47) || (keycode >= 91 && keycode <= 96) || (keycode >= 58 && keycode <= 64) ||
    (keycode >= 123 && keycode <= 126) || (keycode == 8377) || (keycode == 8364) || (keycode == 128) || (keycode == 163) ||
    (keycode == 165)){
      $event.preventDefault();
    }
  }
  specialcharInputAddress($event) { //40,41,58,45
    var keycode = $event.which;
    if ((keycode >= 33 && keycode <= 34) || (keycode >= 36 && keycode <= 43) || (keycode >= 60 && keycode <= 64) || (keycode >= 91 && keycode <= 96) || (keycode >= 123 && keycode <= 126) || (keycode == 8377) || (keycode == 8364) || (keycode == 128) || (keycode == 163) ||
    (keycode == 165)){
    $event.preventDefault();
    }
  }
  specialcharInputAddressCheck(control: FormControl){
    //var splChars = "*|\":<>[]{}`\'()@&$%";
    var chars = "abcdefghijklmnopqrstABCDEFGHIJKLMNOPQRST";
    for (var i = 0; i < control.value.length; i++) {
        if (chars.indexOf(control.value.charAt(i)) == -1){
          q = {'isMsgValid':true};  
        }else{
          var q = null;
          break;  
        }
    }
    return q;
  }
  
  
 

}
