import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent implements OnInit{

  data={
    to:"",
    subject:"",
    message:""
  }

  flag:boolean=false;

  constructor(private email:EmailService, private snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    
  }

  doSubmitForm(){
    console.log("Try to submit form");
    console.log("DATA ", this.data);

    // Check data is null OR blank
    if(this.data.to=='' || this.data.subject=='' || this.data.message==''){

      this.snack.open("Fields can not be empty OR blank!!", "OK");
      return;
    }

    this.flag=true;
    this.email.sendEmail(this.data).subscribe((response:any)=>
      {
        console.log(response);
        this.flag=false;
        this.snack.open(response.token, "OK");
        // Navigate to Home Page...
        this.router.navigate(['']);
        // Fields reset after success...
        this.data.to="";
        this.data.subject="";
        this.data.message="";
      },
      error=>{
        console.log(error);
        this.flag=false;
        this.snack.open(error.token, "OK")
      }
    )
  }
}
