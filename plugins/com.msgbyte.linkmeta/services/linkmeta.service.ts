import { TcService, TcContext, TcDbService } from 'tailchat-server-sdk';
import type { LinkmetaDocument, LinkmetaModel } from '../models/linkmeta';
import { fetchLinkPreview } from '../utils/fetchLinkPreview';

/**
 * 链接信息服务
 */
interface LinkmetaService
  extends TcService,
    TcDbService<LinkmetaDocument, LinkmetaModel> {}
class LinkmetaService extends TcService {
  get serviceName() {
    return 'plugin:com.msgbyte.linkmeta';
  }

  onInit() {
    this.registerLocalDb(require('../models/linkmeta').default);

    this.registerAction('fetch', this.fetch, {
      params: {
        url: 'string',
      },
    });
  }

  /**
   * 获取连接预览信息
   */
  private async fetch(ctx: TcContext<{ url: string }>) {
    const url = ctx.params.url;

    const meta = await this.adapter.model.findOne(
      {
        url,
      },
      undefined,
      {
        sort: {
          _id: -1,
        },
      }
    );

    if (
      !meta ||
      new Date(meta.createdAt).valueOf() <
        new Date().valueOf() - 1000 * 60 * 60 * 24
    ) {
      // 没有找到或已过期(过期时间24小时)
      const data = await fetchLinkPreview(url);

      await this.adapter.model.create({
        url,
        data,
      });

      return { ...data, isCache: false };
    }

    return {
      ...meta.data,
      isCache: true,
    };
  }
}

export default LinkmetaService;
