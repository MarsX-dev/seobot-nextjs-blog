import { Cache } from "./cache";

export class SeoBotClient {
  private key: string;
  private fetchBaseCache: Cache<any> = new Cache<any>(60000);
  private fetchPostCache: Cache<any> = new Cache<any>(60000);

  constructor(key: string, postsPerPage: number = 10) {
    this.key = key;
  }

  private async fetchBase() {
    const base = await this.fetchBaseCache.get(async () => {
      const response = await fetch(
        `https://seobot-blogs.s3.eu-north-1.amazonaws.com/${this.key}/system/base.json`,
        { cache: "no-store" }
      );
      const base = await response.json();
      return base;
    });

    return base;
  }

  private async fetchPost(id: string) {
    const post = await this.fetchPostCache.get(async () => {
      const postData = await fetch(
        `https://seobot-blogs.s3.eu-north-1.amazonaws.com/${this.key}/blog/${id}.json`,
        { cache: "no-store" }
      );
      const post = await postData.json();
      return post;
    });

    return post;
  }

  async getPosts(page: number, limit: number = 10) {
    try {
      const base = await this.fetchBase();
      const start = page * limit;
      const end = start + limit;
      const articles = await Promise.all(base.slice(start, end).map(async (item: any) => {
        if (item.id) return await this.fetchPost(item.id);
      }));

      return {
        articles: articles.filter((item) => item?.published),
        total: base.length,
      };
    } catch {
      return { total: 0, articles: [] };
    }
  }

  async getCategoryPosts(slug: string, page: number, limit: number = 10) {
    try {
      const base = await this.fetchBase();
      const categoryIds = base.filter(
        (item: any) => item?.category?.slug == slug
      );
      const start = page * limit;
      const end = start + limit;
      const articles = await Promise.all(categoryIds
        .slice(start, end)
        .map(async (item: any) => {
          if (item?.id) return await this.fetchPost(item?.id);
        }));

      return {
        articles: articles.filter((item) => item?.published),
        total: categoryIds.length,
      };
    } catch {
      return { total: 0, articles: [] };
    }
  }

  async getTagPosts(slug: string, page: number, limit: number = 10) {
    try {
      const base = await this.fetchBase();
      const tags = base.filter((obj: any) => {
        const itemTags = obj?.tags;
        return itemTags?.some((item: any) => item?.slug === slug);
      });
      const start = page * limit;
      const end = start + limit;
      const articles = await Promise.all(tags.slice(start, end).map(async (item: any) => {
        if (item?.id) return await this.fetchPost(item?.id);
      }));
      
      return {
        articles: articles.filter((item) => item?.published),
        total: tags.length,
      };
    } catch {
      return { total: 0, articles: [] };
    }
  }

  async getPost(slug: string) {
    try {
      const base = await this.fetchBase();
      const id = base.find((item: any) => item.slug === slug).id;
      const post = await this.fetchPost(id);
      return post;
    } catch {
      return null;
    }
  }
}
