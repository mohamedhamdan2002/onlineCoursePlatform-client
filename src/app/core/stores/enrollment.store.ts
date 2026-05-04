import { inject, signal } from "@angular/core";
import { Enrollment } from "../models/courses/enrollment";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { ToasterService } from "../services/toaster.service";
import { EnrollmentService } from "../services/enrollment.service";


export interface EnrollmentState {
  enrollments: Enrollment[];
}

export const EnrollmentStore = signalStore(
  { providedIn: 'root'},
  withState(({
    enrollments: []
  } as EnrollmentState)
  ),
  withMethods((store, toaster = inject(ToasterService), enrollmentService = inject(EnrollmentService)) => ({
    loadMyEnrollments: rxMethod<void>(
      pipe(
        switchMap(() =>
          enrollmentService.getMyEnrollments()
        ),
        tap((res) => {
          patchState(store, { enrollments: res })
        })
      )
    ),
    onNewEnrollmentCreated(enrollment: Enrollment) {
      patchState(store, { enrollments: [...store.enrollments(), enrollment]});
      toaster.success(`Your Enrollment at course: ${enrollment.course.title} was created`);
    }
  })),
)
