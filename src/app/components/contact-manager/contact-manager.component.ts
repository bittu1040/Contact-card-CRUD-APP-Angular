import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading: boolean=false;
  public contacts:IContact[]=[];
  public errorMessage:string | null = null;

  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
   this.getAllContactfromServer();
  }

  getAllContactfromServer(){
    this.loading= true;
    this.contactService.getAllContacts().subscribe((data)=>{
      this.contacts= data;
      console.log(this.contacts)
      this.loading= false;
    }, (error)=>{
      this.errorMessage= error;
      this.loading= false;
    })
  }

  deletethisContact(contactId:string){
      if(contactId){
        alert("do you want to delete")
        this.contactService.deleteContact(contactId).subscribe(()=>{
          this.getAllContactfromServer();
        }, (error)=>{
          this.errorMessage=error;
        })
      }
      
    }

}
