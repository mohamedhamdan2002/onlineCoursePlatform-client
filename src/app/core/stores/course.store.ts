import { computed, effect, inject } from "@angular/core";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CategoryService } from "../../core/services/category.service";
import { debounceTime, pipe, switchMap, tap } from "rxjs";
import { CourseService } from "../../core/services/course.service";
import { ToasterService } from "../../core/services/toaster.service";
import { Category, Course, CreateCourseRequest } from "../models/courses/course";
import { CoursePageList } from "../models/courses/course-page-list";
import { CourseFilter } from "../../shared/components/filter-sidebar/filter-sidebar.component";

export type CourseLevel = {
  value: number,
  name: string
}
export interface CourseState {
  categories: Category[],
  levels: CourseLevel[]
  courses: CoursePageList;
  courseFilters: CourseFilter;
  searchQuery: string | null;
  sortBy: string | null;
  page: number,
  pageSize: number,
  selectedCourseId: string | undefined;
  selectedCourse: Course;
  wishlistCourses: Map<string, Course>;
  isWishlistLoaded: boolean;
}

export const CourseStore = signalStore(
  {
    providedIn: 'root'
  },
  withState<CourseState>({
    categories: [],
    levels: [],
    courses: {} as CoursePageList,
    courseFilters: {} as CourseFilter,
    searchQuery: null,
    sortBy: null,
    page: 1,
    pageSize: 10,
    selectedCourseId: undefined,
    selectedCourse: {} as Course,
    wishlistCourses: new Map(),
    isWishlistLoaded: false
  } as CourseState
  ),
  withComputed(({courses, wishlistCourses}) => ({
    // filteredCourses: computed(()=>{
    //   if(!selectedCategoriesIds().length) return courses();
    //   // courses().pageItems.filter(course => selectedCategoriesIds().includes(course.category.id))
    //   return courses();
    // }),
    wishlistCount: computed(() => wishlistCourses().size),
  })),
  withMethods((store, toaster = inject(ToasterService), categoryService = inject(CategoryService), courseService = inject(CourseService))=> ({
    loadCategories: rxMethod<void>(
      pipe(
        switchMap(() => categoryService.getAllCategories()),
        tap(res => {
          patchState(store, { categories: res })
        })
      )
    ),
    loadLevels: rxMethod<void>(
      pipe(
        switchMap(() => courseService.getCourseLevels()),
        tap(res => {
          patchState(store, { levels: res })
        })
      )
    ),
    loadCoursePageList: rxMethod<void>(
      pipe(
        debounceTime(300),
        switchMap(() =>
          courseService.getAllCourses(
            store.page(),
            store.pageSize(),
            store.courseFilters().categories?.join(','),
            store.courseFilters().levels?.join(','),
            store.courseFilters().priceRange,
            store.courseFilters().minRating,
            store.searchQuery(),
            store.sortBy()
          )),
        tap(res => {
          patchState(store, { courses: res })
        })
      )
    ),
    setCourseFilters: (courseFilters: CourseFilter) => {
      patchState(store, { courseFilters: courseFilters, page: 1 })
    },
    setSearchQuery: (searchQuery: string) => {
      patchState(store, { searchQuery: searchQuery, page: 1 })
    },
    setSortBy: (sortBy: string) => {
      patchState(store, { sortBy: sortBy, page: 1 })
    },
    setPage(pageNumber: number) {
      patchState(store, { page: pageNumber });
    },
    setPageSize(pageSize: number) {
      patchState(store, { pageSize: pageSize });
    },
    setCourseId: signalMethod<string>((courseId: string) => {
      patchState(store, { selectedCourseId: courseId });
    }),
    loadSelectedCourse: rxMethod<string>(
      pipe(
        switchMap((courseId) =>
          courseService.getCourseById(
            courseId
          )),
        tap(res => {
          patchState(store, { selectedCourse: res })
        })
      )
    ),
    createCourse: rxMethod<CreateCourseRequest>(
      pipe(
        switchMap((request) =>
          courseService.createCourse(
            request
          ))

      )
    ),
    addToWishlist(course: Course) {
      const wishlistMap = store.wishlistCourses();
      wishlistMap.set(course.id, course);
      patchState(store, { wishlistCourses: new Map(wishlistMap) });
      toaster.success("Course Added To Wishlist");
    },
    removeFromWishlist(course: Course) {
      const wishlistMap = store.wishlistCourses();
      wishlistMap.delete(course.id);
      patchState(store, { wishlistCourses: new Map(wishlistMap) });
      toaster.success("Course Removed From Wishlist");
    },
    clearWishlist() {
      patchState(store, { wishlistCourses: new Map() });
      toaster.success("Courses Removed From Wishlist");
    },
    loadWishlistFromStorage() {
      const data = localStorage.getItem('wishlist');

      if (!data) return;

      try {
        const parsed = JSON.parse(data);
        const map = new Map<string, Course>(
          Object.entries(parsed)
        );
        if(parsed !== undefined)
          patchState(store, { wishlistCourses: map, isWishlistLoaded: true });
        else {
          patchState(store, { wishlistCourses: new Map(), isWishlistLoaded: true });
        }
        console.log(store.wishlistCourses());
      } catch {
        console.error('Invalid wishlist in storage');
        patchState(store, { wishlistCourses: new Map(), isWishlistLoaded: true });

      }
    }
  })),
  withHooks(
    {
      onInit(store){
        effect(() => {
          console.log("effect method runs from store..");
          const wishlist = store.wishlistCourses();
          const obj = Object.fromEntries(wishlist);
          if(!store.isWishlistLoaded()) return;
          localStorage.setItem('wishlist', JSON.stringify(obj));
        })
      }
    }
  )
);

