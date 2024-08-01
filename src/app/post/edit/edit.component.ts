import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent

implements OnInit {

  studentId!: number;
  post!: Post;
  id!:number;
  form!: FormGroup;


  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location

  ) { }


  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this. studentId = this.route.snapshot.params['postId'];
    console.log(this. studentId);
    this.postService.find(this.studentId).subscribe((data: Post)=>{
      console.log(data);
      this.post = data;
    });

    this.form = new FormGroup({
      sno: new FormControl('', Validators.required),
      studentId: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required]),
      branch: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  goBack() {
    window.history.back();
    }

  submit(){
    console.log(this.form.value);
    this.postService.update(this.studentId, this.form.value).subscribe((res:any) => {
         console.log('Post updated successfully!');

    })
  }

}
