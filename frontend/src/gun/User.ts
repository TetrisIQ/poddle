import "gun/sea"
import {gun} from "./index";
import NotificationControl from "../lib/NotificationControl";
import {lstore} from "./LStore";

const user = gun.db.user();

class UserClass {

    login(username: string, password: string) {
        return user.auth(username, password, (ack) => {
            if (ack.err !== undefined) {
                NotificationControl.error("Cannot Login", ack.err)
                lstore.setPassword(null) // in case auto login doesn't work
                lstore.setUsername(null)
            } else {
                lstore.setUsername(username)
                lstore.setPassword(password)
            }
        })
    }

    register(username: string, password: string) {
        user.create(username, password, (ack) => {
            if (ack.err !== undefined) {
                NotificationControl.error("Cannot Register", ack.err)
            }
        })
    }

    isLoggedIn(): boolean {
        if (lstore.getUsername() !== null && lstore.getPassword() !== null) {
            // Perform auto login
            this.login(lstore.getUsername(), lstore.getPassword())
            return true;
        }
        return user.is
    }

    logout() {
        lstore.setUsername(null);
        lstore.setPassword(null);
        user.leave()
    }

    delete(username: string, pass: string) {
        lstore.setUsername(null);
        lstore.setPassword(null);
        user.delete(username, pass, (cb => {
            console.log(cb)
        }))
    }
}

export const users = new UserClass();