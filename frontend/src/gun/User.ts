import "gun/sea";
import { gun } from "./index";
import NotificationControl from "../lib/NotificationControl";
import { password, username } from "../storeLocal";

const user = gun.db.user();
class UserClass {
  uname: string;
  pw: string;

  constructor() {
    username.subscribe((value) => {
      this.uname = value;
    });
    password.subscribe((value) => {
      if (value !== undefined) {
        this.pw = atob(value);
      }
    });
  }

  login(u: string, p: string) {
    return user.auth(u, p, (ack) => {
      if (ack.err !== undefined) {
        NotificationControl.error("Cannot Login", ack.err);
        password.set(""); // in case auto login doesn't work
        username.set("");
      } else {
        username.set(u);
        password.set(btoa(p));
      }
    });
  }

  register(u: string, p: string) {
    user.create(u, p, (ack) => {
      if (ack.err !== undefined) {
        NotificationControl.error("Cannot Register", ack.err);
      }
    });
  }

  isLoggedIn(): boolean {
    if (this.uname !== null && this.pw !== null) {
      // Perform auto login
      this.login(this.uname, this.pw);
      return true;
    }
    return user.is;
  }

  logout() {
    password.set("");
    username.set("");
    user.leave();
  }

  delete(u: string, pass: string) {
    password.set("");
    username.set("");
    user.delete(u, pass, (cb) => {
      console.log(cb);
    });
  }
}

export const users = new UserClass();
