import { Injectable } from '@angular/core';
import {OidcClientSettings, User, UserManager, UserManagerSettings} from 'oidc-client-ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      authority: 'http://example-spring-authorization-server.local:9000/',
      client_id: 'example-angular-oauth2-authorization-code-pkce',
      redirect_uri: 'http://127.0.0.1:4200/signin-callback',
      silent_redirect_uri: 'http://127.0.0.1:4200/silent-callback.html',
      post_logout_redirect_uri: 'http://127.0.0.1:4200/',
      response_type: 'code',
      scope: 'openid',
    };
    this.userManager = new UserManager(settings);
  }

  getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
