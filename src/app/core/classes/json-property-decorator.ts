import 'reflect-metadata';
const jsonMetadataKey = 'jsonProperty';

export interface IJsonMetaData<T> {
  name?: string;
  clazz?: new() => T;
}

export function getClazz(target: Object, propertyKey: string) {
  return Reflect.getMetadata('design:type', target, propertyKey);
}
export function getJsonProperty<T>(target: Object, propertyKey: string):  IJsonMetaData<T> {
  return Reflect.getMetadata(jsonMetadataKey, target, propertyKey);
}


export function JsonProperty<T>(metadata?: IJsonMetaData<T>|string) {
  if (metadata instanceof String || typeof metadata === 'string') {
      return Reflect.metadata(jsonMetadataKey, {
          name: metadata,
          clazz: undefined
      });
  } else {
      const metadataObj = <IJsonMetaData<T> | undefined>metadata;
      return Reflect.metadata(jsonMetadataKey, {
          name: metadataObj ? metadataObj.name : undefined,
          clazz: metadataObj ? metadataObj.clazz : undefined
      });
  }
}

export default class MapUtils {
  static isPrimitive(obj: StringConstructor | NumberConstructor | BooleanConstructor | any) {
      switch (typeof obj) {
          case 'string':
          case 'number':
          case 'boolean':
              return true;
      }
      return !!(obj instanceof String || obj === String ||
      obj instanceof Number || obj === Number ||
      obj instanceof Boolean || obj === Boolean);
  }

  static isArray(object: ArrayConstructor) {
      if (object === Array) {
          return true;
      } else if (typeof Array.isArray === 'function') {
          return Array.isArray(object);
      } else {
          return !!(object instanceof Array);
      }
  }

  static deserialize<T>(clazz: new() => T, jsonObject: { [x: string]: any; } | undefined) {
      if ((clazz === undefined) || (jsonObject === undefined)) { return undefined; }
      let obj:any = new clazz();
      Object.keys(obj).forEach((key) => {
          const propertyMetadataFn: (IJsonMetaData:any) => any = (propertyMetadata) => {
              const propertyName = propertyMetadata.name || key;
              const innerJson = jsonObject ? jsonObject[propertyName] : undefined;
              const clazz = getClazz(obj, key);
              if (MapUtils.isArray(clazz)) {
                  const metadata = getJsonProperty(obj, key);
                  if (metadata.clazz || MapUtils.isPrimitive(clazz)) {
                      if (innerJson && MapUtils.isArray(innerJson)) {
                          return innerJson.map(
                              (item: { [x: string]: any; } | undefined) => MapUtils.deserialize(clazz, item)
                          );
                      } else {
                          return undefined;
                      }
                  } else {
                      return innerJson;
                  }

              } else if (!MapUtils.isPrimitive(clazz)) {
                  return MapUtils.deserialize(clazz, innerJson);
              } else {
                  return jsonObject ? jsonObject[propertyName] : undefined;
              }
          };

          const propertyMetadata = getJsonProperty(obj, key);
          if (propertyMetadata) {
              obj = propertyMetadataFn(propertyMetadata);
          } else {
              if (jsonObject && jsonObject[key] !== undefined) {
                  obj[key] = jsonObject[key];
              }
          }
      });
      return obj;
  }
}
