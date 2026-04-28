import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { AuthModel } from "../models/auth/AuthModel";
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { Login } from "../models/auth/login";
import { pipe, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { JsonPipe } from "@angular/common";
import { ToasterService } from "../services/toaster.service";

export interface AuthState {
  user: AuthModel | null,
  token: string | null
}

export const AuthStore = signalStore(
  { providedIn: 'root'},
  withState({
    user: null,
    token: null
  } as AuthState),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.token())
  })),
  withMethods((store, toaster = inject(ToasterService) ,authService = inject(AuthService)) => ({
    login: rxMethod<Login>(pipe(
      switchMap((data: Login) =>
        authService.login(data)
      ),
      tap((user: AuthModel) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        patchState(store, { user: user, token: user.token });
        toaster.success("Login successful, welcome back.")
      })
    )),
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      patchState(store, { user: null, token: null });
    },
    initAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if(token && user) {
        patchState(store, {
          token,
          user: JSON.parse(user)
        });
      }
    }
  }))
)
