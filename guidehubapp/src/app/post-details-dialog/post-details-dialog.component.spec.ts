import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsDialogComponent } from './post-details-dialog.component';

describe('PostDetailsDialogComponent', () => {
  let component: PostDetailsDialogComponent;
  let fixture: ComponentFixture<PostDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(PostDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
