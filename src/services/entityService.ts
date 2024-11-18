import apiManager from "./apiManager";

export interface Entity {
  id: number;
  value: string;
  tag: string;
  note: string;
}

class EntityService {
  getAllEntities() {
    const controller = new AbortController();

    const req = apiManager.get<Entity[]>("api/entity", {
      signal: controller.signal,
    });

    return { req, cancel: () => controller.abort() };
  }

  getEntity(id: number) {
    return apiManager.get("api/entity/" + id);
  }

  deleteEntity(id: number) {
    return apiManager.delete("api/entity/" + id);
  }

  addEntity(entity: Entity) {
    return apiManager.post("api/entity", entity);
  }

  editEntity(entity: Entity) {
    return apiManager.put("api/entity/" + entity.id, entity);
  }
}

export default new EntityService();
