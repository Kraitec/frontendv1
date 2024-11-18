import apiManager from "./apiManager";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();

    const req = apiManager.get<User[]>("api/user", {
      signal: controller.signal,
    });

    return { req, cancel: () => controller.abort() };
  }

  getUser(id: number) {
    return apiManager.get("api/user/" + id);
  }

  deleteUser(id: number) {
    return apiManager.delete("api/user/" + id);
  }

  addUser(user: User) {
    return apiManager.post("api/user", user);
  }

  editUser(user: User) {
    return apiManager.put("api/user/" + user.id, user);
  }
}

export default new UserService();
