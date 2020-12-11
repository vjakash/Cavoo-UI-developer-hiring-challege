import { Component } from '@angular/core';
import { MainServiceService } from './main-service.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  faPlus=faPlus;
  faCamera=faCamera;
  faTimes=faTimes;
  faCheck=faCheck;
  users=[];
  usersList=[];
  groups=[];
  openNewModal=false;
  openUpdateModal=false;
  slideDown=false;
  validateNewGroup=false;
  defaultPersonimage='https://sample1234.s3.ap-south-1.amazonaws.com/person.png';
  defaultGroupIcon='https://sample1234.s3.ap-south-1.amazonaws.com/group.png';
  newGroup;
  updateGroup;
  selectedGroupIndex=null;
  constructor(private serv:MainServiceService,private fb:FormBuilder,@Inject(DOCUMENT) private document: Document){
    this.loadUsers();
    this.newGroup=fb.group({
      id:new FormControl(String(Math.random()).substring(2,6)),
      name:new FormControl('',Validators.required),
      desc:new FormControl('',Validators.required),
      users:new FormControl([]),
      Image:new FormControl(''),
    })
    this.updateGroup=fb.group({
      id:new FormControl(''),
      name:new FormControl('',Validators.required),
      desc:new FormControl('',Validators.required),
      users:new FormControl([]),
      Image:new FormControl(''),
    })
  }
  loadUsers(){
    // this.serv.getUsers().subscribe((data)=>{
    //     console.log(data);
    // },(err)=>{
    //   console.log(err); //cors error is occuring so directly user the data.
    // })
    this.usersList=[
      {
        "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/user14b9a23c.png",
        "name": "User1",
        "id": "1001"
      },
      {
        "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/user20c5688c.jpg",
        "name": "User2",
        "id": "1002"
      },
      {
        "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg",
        "name": "Richard Matthew",
        "id": "1003"
      },
      {
        "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard_Davies_Hansons_27b0aae3.jpeg",
        "name": "Richard Hansons",
        "id": "1004"
      },
      {
        "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/betty%20hansonb071ac8.jpg",
        "name": "Betty Hanson",
        "id": "1005"
      },
      {
        "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/doug%20hermann1a0ca42.jpg",
        "name": "Doug Hermann",
        "id": "1006"
      },
      {
        "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/martha%20hermann4ceeba1.jpg",
        "name": "Martha Hermann",
        "id": "1007"
      },
      {
        "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/dotty%20feliz841b64f.jpg",
        "name": "Dotty Feliz",
        "id": "1008"
      }
    ]
    this.usersList.map(item=>{
      item['groupId']="";
    });
    this.users=[...this.usersList];
  }
  openModal(){
    this.openNewModal=true;
    console.log(this.openNewModal);
    this.document.body.classList.add('noscroll');
  }
  closeModal(){
    this.slideDown=true;
    setTimeout(()=>{
      this.openNewModal=false;
      this.slideDown=false;
      this.document.body.classList.remove('noscroll');
    },300);
  }
  openUpdatingModal(){
    this.openUpdateModal=true;
    this.document.body.classList.add('noscroll');
  }
  closeUpdatingModal(){
    this.slideDown=true;
    setTimeout(()=>{
      this.openUpdateModal=false;
      this.slideDown=false;
      this.document.body.classList.remove('noscroll');
    },300);
  }

  clickstopPropagation(event){
    event.stopPropagation();
  }
  handleNewGroupUserClick(event,user,id){
    let index=this.newGroup.value.users.indexOf(user);
    if(index>-1){
      this.newGroup.value.users.splice(index,1);
      this.usersList.forEach(item=>{
        if(item['id']===id){
          item['groupId']='';
        }
      });
      this.users.forEach(item=>{
        if(item['id']===id){
          item['groupId']='';
        }
      });
    }else{
      this.usersList.forEach(item=>{
        if(item['id']===id){
          item['groupId']=this.newGroup.value.id;
        }
      });
      this.users.forEach(item=>{
        if(item['id']===id){
          item['groupId']=this.newGroup.value.id;
        }
      });
      this.newGroup.value.users.push(user);
    }
  }
  createGroup(){
    this.validateNewGroup=true;
    if(this.newGroup.valid){
      console.log(this.newGroup.value);
      this.groups.push(this.newGroup.value);
      this.newGroup.setValue({
        id:String(Math.random()).substring(2,6),
        name:'',
        desc:'',
        users:[],
        Image:''
      });
      this.validateNewGroup=false;
      this.closeModal();
    }
    // console.log(this.groups,this.users,this.newGroup.value.id);
  }
  handleTextArea(event){
    let value=event.target.value;
    this.newGroup.controls.desc.setValue(value);
  }
  selectGroupForUpdate(group,index){
    this.selectedGroupIndex=index;
    this.updateGroup.setValue(group);
    this.openUpdatingModal();
  }
  handleUpdateGroupUserClick(event,user,id){
    let index=this.updateGroup.value.users.indexOf(user);
    if(index>-1){
      this.updateGroup.value.users.splice(index,1);
      this.usersList.forEach(item=>{
        if(item['id']===id){
          item['groupId']='';
        }
      });
      this.users.forEach(item=>{
        if(item['id']===id){
          item['groupId']='';
        }
      });
    }else{
      this.usersList.forEach(item=>{
        if(item['id']===id){
          item['groupId']=this.updateGroup.value.id;
        }
      });
      this.users.forEach(item=>{
        if(item['id']===id){
          item['groupId']=this.updateGroup.value.id;
        }
      });
      this.updateGroup.value.users.push(user);
    }
  }
  updatingGroup(){
    this.validateNewGroup=true;
    if(this.updateGroup.valid){
      console.log(this.updateGroup.value);
      this.groups[this.selectedGroupIndex]=this.updateGroup.value;
      this.updateGroup.setValue({
        id:'',
        name:'',
        desc:'',
        users:[],
        Image:''
      });
      this.validateNewGroup=false;
      this.closeUpdatingModal();
    }
    // console.log(this.groups,this.users,this.newGroup.value.id);
  }
  handleTextAreaForUpdate(event){
    let value=event.target.value;
    this.updateGroup.controls.desc.setValue(value);
  }
  sortAsc(){
    this.users=[...this.usersList];
    this.users.sort((a,b)=>{
      if(a.name>b.name){
        return 1;
      }else if(a.name<b.name){
        return -1;
      }else{
        return 0
      }
    })
  }
  sortDsc(){
    this.users=[...this.usersList];
    this.users.sort((a,b)=>{
      if(a.name>b.name){
        return -1;
      }else if(a.name<b.name){
        return 1;
      }else{
        return 0
      }
    })
  }
}
