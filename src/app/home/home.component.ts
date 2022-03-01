import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars, faCaretDown, faSearch, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NewsDetail } from '../newsdetail';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  caret=faCaretDown;
  search=faSearch;
  signout=faSignOutAlt;
  menu=faBars;
  closemenu=faTimes;
  c=0;
  i=0; 
  detail:NewsDetail[]=[];
  data:NewsDetail={
    id:0,
    content:"",
    description:"",
    publishedAt:"",
    title:"", 
    url:"",
    image:""
  }
  topic=""; token='';  url='';  searching='';

  total:number=0; page:number=1; maxSize: number = 7;
  autoHide: boolean = false; responsive: boolean = true;

  show=true; select=false; sidenavbar=false;

  constructor(private route:ActivatedRoute, private http:HttpClient,private router:Router,private news:NewsService) {
    this.token=this.route.snapshot.params['token']; 
    if(sessionStorage.getItem(this.token)===null){ this.router.navigateByUrl('login'); }
  }

  ngOnInit(): void { this.getGeneralNews(); }

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    if(window.innerWidth<1024){ this.show=false; }
    else{ this.show=true; }
  }

  getData(url:string){
      this.detail=[];
      this.news.getNewsDetails(url).subscribe((obj:any)=>{
          this.total=obj.articles.length;
          for(this.i=0;this.i<obj.articles.length;this.i++){
               this.data ={
                  id:this.i,
                  content:obj.articles[this.i].content,
                  description:obj.articles[this.i].description,
                  publishedAt:obj.articles[this.i].publishedAt.split("T")[0],
                  title:obj.articles[this.i].title,
                  url:obj.articles[this.i].url,
                  image:obj.articles[this.i].urlToImage
                }
                this.detail.push(this.data);
          } 
          console.log(this.detail);   
      }); 
  }
  getGeneralNews(){
    this.topic="Recent News"
    this.url="everything?q=latest&sortBy=top&language=en&pageSize=100";
    this.getData(this.url);
  }
  getCovidNews(){
    this.topic="Covid-19"
    this.url="everything?q=covid&language=en&pageSize=100";
    this.getData(this.url);
  }
  getHeadlineNews(){
    this.topic="Top Headlines"
    this.url="top-headlines?q=all&language=en&pageSize=100";
    this.getData(this.url);
  }
  getIndianNews(){
    this.topic="Indian"
    this.url="top-headlines?country=in&language=en&pageSize=100";
    this.getData(this.url);
  }
  getBusinessNews(){
    this.topic="Business"
    this.url="top-headlines?category=business&language=en&pageSize=100";
    this.getData(this.url);
  }
  getSportsNews(){
    this.topic="Sports"
    this.url="top-headlines?category=sports&language=en&pageSize=100";
    this.getData(this.url);
  }
  getHealthNews(){
    this.topic="Health"
    this.url="top-headlines?category=health&language=en&pageSize=100";
    this.getData(this.url);
  }
  getTechnologyNews(){
    this.topic="Technology"
    this.url="top-headlines?category=technology&language=en&pageSize=100";
    this.getData(this.url);
  }
  getEntertainmentNews(){
    this.topic="Entertainment"
    this.url="top-headlines?category=entertainment&language=en&pageSize=100";
    this.getData(this.url);
  }
  searchData(){
    this.topic=this.searching;
    this.sidenavbar=false;
    if(this.searching.length===0){
      this.getGeneralNews();
    }
    this.url="everything?q="+this.searching+"&language=en&pageSize=100";
    this.getData(this.url);
  }
  home(){
    this.sidenavbar=false;
    if(sessionStorage.getItem(this.token)===null){
      this.router.navigateByUrl('login');
    }
    this.router.navigateByUrl('home/'+this.token);
    this.getGeneralNews();
  }

  headlines(){ 
    this.sidenavbar=false;
    this.getHeadlineNews(); 
  }
  covid(){ 
    this.sidenavbar=false;
    this.getCovidNews(); 
  }
  india(){ 
    this.sidenavbar=false;
    this.getIndianNews(); 
  }
  
  business(){
    this.c=0;
    this.select=false;
    this.getBusinessNews();
  }
  entertainment(){
    this.c=0;
    this.select=false;
    this.getEntertainmentNews();
  }
  health(){
    this.c=0;
    this.select=false;
    this.getHealthNews();
  }
  sports(){
    this.c=0;
    this.select=false;
    this.getSportsNews();
  }
  technology(){
    this.c=0;
    this.select=false;
    this.getTechnologyNews();
  }
  logout(){
    sessionStorage.removeItem(this.token);
    this.router.navigateByUrl('login');
  }
  dropdown(){
    if(this.c===0){
      this.select=true;
      this.c=1;
    }
    else{
      this.select=false;
      this.c=0;
    }
  }
  sidebar(){ this.sidenavbar=true; }
  close(){ this.sidenavbar=false; }

}
