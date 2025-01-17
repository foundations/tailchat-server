export { TcService } from './services/base';
export type { TcDbService } from './services/mixins/db.mixin';
export type {
  TcContext,
  TcPureContext,
  PureContext,
  UserJWTPayload,
  GroupBaseInfo,
} from './services/types';
export { parseLanguageFromHead } from './services/lib/i18n/parser';
export { t } from './services/lib/i18n';
export {
  config,
  buildUploadUrl,
  builtinAuthWhitelist,
} from './services/lib/settings';

// struct
export type { MessageMetaStruct } from './structs/chat';
export type { BuiltinEventMap } from './structs/events';
export type {
  GroupStruct,
  GroupRoleStruct,
  GroupPanelStruct,
} from './structs/group';
export type { UserStruct } from './structs/user';
