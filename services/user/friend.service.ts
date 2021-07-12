import { PawCacheCleaner } from '../../mixins/cache.cleaner.mixin';
import type { PawDbService } from '../../mixins/db.mixin';
import { PawService } from '../base';
import type { PawContext } from '../types';

interface FriendService extends PawService, PawDbService<any> {}
class FriendService extends PawService {
  get serviceName(): string {
    return 'friend';
  }
  onInit(): void {
    this.registerDb('user.friend');
    // this.registerMixin(PawCacheCleaner(['cache.clean.friend']));

    this.registerAction('getAllFriends', {
      handler: this.getAllFriends,
    });
    this.registerAction('buildFriendRelation', {
      params: {
        user1: 'string',
        user2: 'string',
      },
      handler: this.buildFriendRelation,
    });
  }

  /**
   * 获取所有好友
   */
  async getAllFriends(ctx: PawContext<{}>) {
    const userId = ctx.meta.userId;

    const list = await this.adapter.find({
      query: {
        from: userId,
      },
    });

    return list;
  }

  /**
   * 构建好友关系
   */
  async buildFriendRelation(ctx: PawContext<{ user1: string; user2: string }>) {
    const { user1, user2 } = ctx.params;
    await this.adapter.insertMany([
      {
        from: user1,
        to: user2,
      },
      {
        from: user2,
        to: user1,
      },
    ]);

    this.unicastNotify(ctx, user1, 'add', {
      userId: user2,
    });
    this.unicastNotify(ctx, user2, 'add', {
      userId: user1,
    });
  }
}
export default FriendService;
