import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { CourseService } from '../../../core/services/course.service';
import { AuthService } from '../../../core/services/auth.service';
import { Course, CreateCourseRequest } from '../../../core/models/courses/course';
import { Section } from '../../../core/models/courses/section';
import { CourseStore } from '../../../core/stores/course.store';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'article';
  file?: File;
  duration?: string;
}
@Component({
  selector: 'app-course-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressBarModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  isEditMode = false;
  fb = inject(NonNullableFormBuilder);
    courseForm = this.fb.group({
      title: this.fb.control<string>('', [Validators.required]),
      categoryId: this.fb.control<string>('', [Validators.required]),
      level: this.fb.control<number>(0, [Validators.required]),
      description: this.fb.control<string>('', [Validators.required]),
      price: this.fb.control<number>(0, [Validators.required]),
      image: this.fb.control('', [Validators.required])
    });
    store = inject(CourseStore);
    course: Course = {
    id: '',
    title: '',
    instructor: '',
    imageUrl: '',
    rating: 0,
    reviewsCount: 0,
    studentsCount: 0,
    isEnrolled: false,
    duration: '',
    level: '',
    price: 0,
    category: {
      id: '',
      name: ''
    },
    sections: []
  };

  description = '';
  selectedCategoryId = '';

  sections: Section[] = [
    {
      id: '1',
      title: 'Introduction',
      lectures: [],
      order: 1
    }
  ];

  categories = [
    { id: '1', name: 'Development' },
    { id: '2', name: 'Business' },
    { id: '3', name: 'Design' }
  ];

  thumbnailPreview = '';
  thumbnailFile?: File;


  courseId = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if(this.store.levels().length == 0) {
      this.store.loadLevels();
    }
    if(this.store.categories().length == 0) {
      this.store.loadCategories();
    }
    this.courseId = this.route.snapshot.paramMap.get('id') || '';

    if (this.courseId) {
      this.isEditMode = true;

      // const existingCourse = this.courseService.getCourseById(this.courseId);
      const existingCourse = {} as Course;
      if (existingCourse) {
        this.course = existingCourse;
        this.sections = existingCourse.sections;
        this.selectedCategoryId = existingCourse.category.id;
        this.thumbnailPreview = existingCourse.imageUrl;
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/instructor/dashboard']);
  }

  onThumbnailSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.thumbnailFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.thumbnailPreview = reader.result as string;
      this.course.imageUrl = this.thumbnailPreview;
      this.courseForm.get('image')?.setValue(this.thumbnailPreview)
    };

    reader.readAsDataURL(this.thumbnailFile);
  }

  removeThumbnail(): void {
    this.thumbnailPreview = '';
    this.course.imageUrl = '';
  }

  addSection(): void {

    this.sections.push({
      id: Date.now().toString(),
      title: `Section ${this.sections.length + 1}`,
      lectures: [],
      order: 0
    });
  }

  deleteSection(sectionId: string): void {

    this.sections = this.sections.filter(s => s.id !== sectionId);
  }

  addLesson(sectionId: string, type: 'video' | 'article'): void {

    const section = this.sections.find(s => s.id === sectionId);

    if (!section) return;

    section.lectures.push({
      id: Date.now().toString(),
      title: type === 'video' ? 'New Video' : 'New Article',
      duration: new Date(),
      isPreview: true,
      videoUrl: ''

    });
  }

  deleteLesson(sectionId: string, lessonId: string): void {

    const section = this.sections.find(s => s.id === sectionId);

    if (!section) return;

    section.lectures = section.lectures.filter(l => l.id !== lessonId);
  }

  onVideoSelected(
    event: Event,
    sectionId: string,
    lessonId: string
  ): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    const section = this.sections.find(s => s.id === sectionId);

    const lesson = section?.lectures.find(l => l.id === lessonId);

    if (lesson) {
      // lesson.file = file;
      // lesson.duration = '0:00';
    }
  }

  completionPercentage(): number {

    let completed = 0;

    if (this.course.title) completed++;
    if (this.description) completed++;
    if (this.course.price > 0) completed++;
    if (this.thumbnailPreview) completed++;
    if (this.sections.some(s => s.lectures.length > 0)) completed++;

    return (completed / 5) * 100;
  }

  saveDraft(): void {

    this.course.category =
      this.categories.find(c => c.id === this.selectedCategoryId)!;

    this.course.sections = this.sections;

    console.log('Draft Saved', this.course);
  }

  publishCourse(): void {

    this.course.category =
      this.categories.find(c => c.id === this.selectedCategoryId)!;

    this.course.sections = this.sections;

    if (this.isEditMode) {
      // this.courseService.updateCourse(this.course);
    } else {
      // this.courseService.addCourse(this.course);
    }

    this.router.navigate(['/instructor/dashboard']);
  }

  onSubmit() {
    console.log(this.courseForm.value);
    if(this.courseForm.invalid)
      return;

    const formValue = this.courseForm.getRawValue();
    this.store.createCourse({
      categoryId: formValue.categoryId,
      description: formValue.description,
      title: formValue.title,
      price: formValue.price,
      image: this.thumbnailFile,
      level: formValue.level
    });
  }
}

