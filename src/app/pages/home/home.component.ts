import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';
import { Course } from '../../core/models/courses/course';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    CourseCardComponent,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  featuredCourses: Course[] = [
    {
      id: "c909ec69-c7a4-43ab-9a98-352362a2416d",
      title: "Full-Stack Web Development Bootcamp",
      imageUrl: "images/2d88b674-5846-45c5-8cd9-07ceb93e6a89.png",
      instructor: "Admin site.com",
      level: "Advanced",
      price: 129.99,
      isEnrolled: false,
      category: {
        id: "d272c993-4741-4cd2-a600-76cdafe96ab2",
        name: "Development"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    },
    {
      id: "1974c3a2-2f7d-4b2f-a72f-3fd4ee6e3347",
      title: "JavaScript Deep Dive",
      imageUrl: "images/41f4f079-a0bf-42a4-9009-eee597ee3a48.png",
      instructor: "Admin site.com",
      level: "Intermediate",
      price: 59.99,
      isEnrolled: false,
      category: {
        id: "ef765f7a-051c-4457-921a-5212ba61ce99",
        name: "Programming"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    },
    {
      id: "95f5cd28-6660-4289-9f15-92dad143f087",
      title: "Angular From Zero to Hero",
      imageUrl: "images/41b148f6-97b5-477a-bc0e-e3123f3e9553.png",
      instructor: "Admin site.com",
      level: "Beginner",
      price: 79.99,
      isEnrolled: false,
      category: {
        id: "d272c993-4741-4cd2-a600-76cdafe96ab2",
        name: "Development"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    },
    {
      id: "95f5cd28-6660-4289-9f15-92dad143f087",
      title: "Angular From Zero to Hero",
      imageUrl: "images/41b148f6-97b5-477a-bc0e-e3123f3e9553.png",
      instructor: "Admin site.com",
      level: "Beginner",
      price: 79.99,
      isEnrolled: false,
      category: {
        id: "d272c993-4741-4cd2-a600-76cdafe96ab2",
        name: "Development"
      },
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      sections: [],
      duration: ""
    }
  ]
  benefits = [
    {
      icon: 'menu_book',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      icon: 'groups',
      title: 'Vibrant Community',
      description: 'Connect with thousands of learners and grow together',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: 'trending_up',
      title: 'Career Growth',
      description: 'Gain skills that lead to promotions and new opportunities',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      icon: 'emoji_events',
      title: 'Certificates',
      description: 'Earn recognized certificates to showcase your achievements',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];
  testimonials = [
    {
      name: 'John Doe',
      role: 'Frontend Developer',
      image: 'https://i.pravatar.cc/100?img=1',
      rating: 5,
      content: 'This platform completely changed my career. I landed a job within 3 months!'
    },
    {
      name: 'Sarah Smith',
      role: 'UI/UX Designer',
      image: 'https://i.pravatar.cc/100?img=2',
      rating: 4,
      content: 'Amazing courses and instructors. Highly recommended for anyone serious about learning.'
    },
    {
      name: 'Michael Brown',
      role: 'Backend Developer',
      image: 'https://i.pravatar.cc/100?img=3',
      rating: 5,
      content: 'The best investment I made in my career. The content is top-notch.'
    }
  ];
}
