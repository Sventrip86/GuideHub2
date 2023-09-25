import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

tags: { tagId: number, name: string, usageCount: number }[] = [];

constructor(private http: HttpClient) { }

ngOnInit(): void {
  this.getTags();

}

getTags(): void {
  this.http.get<{ tagId: number, name: string, usageCount: number }[]>('http://localhost:8080/api/tags?sortBy=usageCount')
    .subscribe(tags => {
      this.tags = tags;
    }, error => {
      console.error('Error retrieving tags:', error);
    });
}


}

