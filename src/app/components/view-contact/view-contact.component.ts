import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public loading:boolean=false;
  // public contact: IContact={} as IContact;
  public contact :any;
  public errorMessage:string | null=null;
  public contactId:string | null= null;
  public group:IGroup={} as IGroup;
  constructor(private activateRoute:ActivatedRoute, private contactService:ContactService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((param)=>{
      this.contactId= param.get('contactId')
    });

    if(this.contactId){
      this.loading=true;
      this.contactService.getContact(this.contactId).subscribe((data)=>{
        this.contact=data;
        this.loading=false;
        this.contactService.getGroup(this.contact).subscribe((data1)=>{
          this.group= data1;
          console.log("1",this.contact);
          console.log("2", this.group);
        });
      }, (error)=>{
        this.errorMessage=error;
        this.loading=false;
      })
    }
  }

  public isNotEmpty(){
    return Object.keys(this.contact).length>0 && Object.keys(this.group).length>0;
  }

}
