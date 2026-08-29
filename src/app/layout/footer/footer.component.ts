import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ MatIconModule, RouterModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  socials = [
    { icon: 'facebook' },
    { icon: 'twitter' },
    { icon: 'photo_camera' }, // Instagram alternative
    { icon: 'linkedin' },
    { icon: 'smart_display' } // YouTube
  ];

  footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'Browse Courses', url: '/courses' },
        { label: 'For Business', url: '#' },
        { label: 'Teach on LearnHub', url: '/instructor/dashboard' },
        { label: 'Mobile App', url: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', url: '#' },
        { label: 'Contact Us', url: '#' },
        { label: 'FAQs', url: '#' },
        { label: 'Community', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '#' },
        { label: 'Careers', url: '#' },
        { label: 'Privacy Policy', url: '#' },
        { label: 'Terms of Service', url: '#' }
      ]
    }
  ];

}
