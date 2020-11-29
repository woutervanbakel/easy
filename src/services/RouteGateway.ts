import { Api } from './Api';
import { Gateway, Id, Json, JsonValue, Uri } from '../types';
import { List } from '../types/List';

export class RouteGateway implements Gateway {

  readonly route: Uri;
  readonly routeId: Uri;

  constructor(readonly api: Api = new Api()) {}

  all = (): Promise<List<Json>> => this.api.get(this.route).then(r => r.data.items);

  byId = (id: Id): Promise<Json> => this.api.get(this.routeId.id(id)).then(r => r.data.items.first());

  search = (q: JsonValue): Promise<List<Json>> => this.api.get(this.route.query(q)).then(r => r.data.items);

  exists = (id: Id): Promise<boolean> => this.api.get(this.routeId.id(id)).then(r => r.data.items.length === 1);

  add = (item: Json): Promise<Json> => this.api.post(this.route, item).then(r => r.data.items.first());

  update = (item: Json): Promise<Json> => this.api.patch(this.routeId.id(item.id), item).then(r => r.data.items.first());

  remove = (id: Id): Promise<boolean> => this.api.delete(this.routeId.id(id)).then(r => r.data.items.length === 0);
}
