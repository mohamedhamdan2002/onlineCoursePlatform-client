import { computed, effect, inject } from "@angular/core";
import { Category, Course } from "./models/course";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CategoryService } from "../../core/services/category.service";
import { pipe, switchMap, tap } from "rxjs";
import { CourseService } from "../../core/services/course.service";
import { CoursePageList } from "./models/course-page-list";
import { ToasterService } from "../../core/services/toaster.service";
export interface CourseState {
  categories: Category[],
  courses: CoursePageList;
  selectedCategoriesIds: string[];
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
    courses: {} as CoursePageList,
    selectedCategoriesIds: [],
    page: 1,
    pageSize: 10,
    selectedCourseId: undefined,
    selectedCourse: {} as Course,
    wishlistCourses: new Map(),
    isWishlistLoaded: false
  } as CourseState
  ),
  withComputed(({courses, selectedCategoriesIds, wishlistCourses}) => ({
    filteredCourses: computed(()=>{
      if(!selectedCategoriesIds().length) return courses();
      // courses().pageItems.filter(course => selectedCategoriesIds().includes(course.category.id))
      return courses();
    }),
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
    loadCoursePageList: rxMethod<void>(
      pipe(
        switchMap(() =>
          courseService.getAllCourses(
            store.page(),
            store.pageSize(),
            store.selectedCategoriesIds().join(',')
          )),
        tap(res => {
          patchState(store, { courses: res })
        })
      )
    ),
    setSelectedCategoriesId: (categoriesId: string[]) => {
      patchState(store, { selectedCategoriesIds: categoriesId, page: 1 })
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

