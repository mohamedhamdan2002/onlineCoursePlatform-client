import { computed, inject, signal } from "@angular/core";
import { Enrollment } from "../models/courses/enrollment";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, map, of, pipe, switchMap, tap } from "rxjs";
import { ToasterService } from "../services/toaster.service";
import { EnrollmentService } from "../services/enrollment.service";


export interface EnrollmentState {
  enrollments: Enrollment[];
  selectedEnrollment: Enrollment;
  lectureCompletionSuccess: boolean;
}

export const EnrollmentStore = signalStore(
  { providedIn: 'root'},
  withState(({
    enrollments: [],
    selectedEnrollment: {} as Enrollment,
    lectureCompletionSuccess: false
  } as EnrollmentState)
  ),
  withComputed((store) => ({
    notStartedEnrollments: computed(() =>
      store.enrollments().filter(
        enrollment => enrollment.status === 'NotStarted'
      )
    ),

    inProgressEnrollments: computed(() =>
      store.enrollments().filter(
        enrollment => enrollment.status === 'InProgress'
      )
    ),

    completedEnrollments: computed(() =>
      store.enrollments().filter(
        enrollment => enrollment.status === 'Completed'
      )
    ),
    continueWatchingEnrollments: computed(() =>
      store.enrollments()
        .filter(
          enrollment => enrollment.status === 'InProgress'
        )
        .slice(0, 2)
    )
  })),
  withMethods((store, toaster = inject(ToasterService), enrollmentService = inject(EnrollmentService)) => ({
    loadMyEnrollments: rxMethod<void>(
      pipe(
        switchMap(() => {
          if(store.enrollments().length > 0) {
            return of(store.enrollments());
          }
          return enrollmentService.getMyEnrollments();
        }
        ),
        tap((res) => {
          patchState(store, { enrollments: res })
        })
      )
    ),
    loadMyEnrollmentById: rxMethod<string>(
      pipe(
        switchMap(enrollmentId => {
          const selectedEnrollment = store.selectedEnrollment();

          if (selectedEnrollment?.id === enrollmentId) {
            return of(selectedEnrollment);
          }

          return enrollmentService.getMyEnrollmentById(enrollmentId);

        }),
        tap(enrollment => {
          patchState(store, {
            selectedEnrollment: enrollment
            // enrollments: store.enrollments().map(item => item.id === enrollment.id ? enrollment : item )
          });
        })
      )
    ),
    updateLastAccessedLecture: rxMethod<string>(
      pipe(
        debounceTime(300),
        switchMap(lectureId =>
          enrollmentService.updateLastAccessedLecture(
            store.selectedEnrollment().id,
            lectureId
          ).pipe(map(() => ({
              lectureId
          })))
        ),
        tap(({ lectureId }) => {
          patchState(store, {
            selectedEnrollment: { ...store.selectedEnrollment(), continueLectureId: lectureId }
          })
        })
      )
    ),markLectureCompleted: rxMethod<string>(
      pipe(
        switchMap(lectureId =>
          enrollmentService.markLectureCompleted(
            store.selectedEnrollment().id,
            lectureId
          ).pipe(
            map(response => ({ response, lectureId }))))
          ,
          tap(({ response, lectureId }) => {
            const enrollment = store.selectedEnrollment();
            const updatedCourse = {
              ...enrollment.course,
              sections: enrollment.course.sections.map(section =>
                ({ ...section,
                  lectures: section.lectures.map(lecture =>
                    lecture.id === lectureId ? { ...lecture, isCompleted: true } : lecture ) })) };
                    const updatedEnrollment = { ...enrollment, course: updatedCourse, progressPercentage: response.progressPercentage, status: response.status, continueLectureId: response.continueLectureId };
                    patchState(store, {
                      lectureCompletionSuccess: true,
                      enrollments: store.enrollments().map(item => item.id === updatedEnrollment.id ? updatedEnrollment : item ),
                      selectedEnrollment: updatedEnrollment });
                    }) )
                    ),
    onNewEnrollmentCreated(enrollment: Enrollment) {
      patchState(store, { enrollments: [...store.enrollments(), enrollment]});
      toaster.success(`Your Enrollment at course: ${enrollment.course.title} was created`);
    },
    setSelectedEnrollment(enrollment: Enrollment) {
      patchState(store, { selectedEnrollment: enrollment });
    },
    resetLectureCompletionSuccess() {
      patchState(store, {
        lectureCompletionSuccess: false
      });
    }
  })),
)
