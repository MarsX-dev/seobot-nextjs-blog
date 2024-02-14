# [SEObot](https://seobotai.com/?utm_source=github) Blog API for Next.js Website

## Overview

Elevate your Next.js website by integrating SEObot's Blog API. This setup allows you to fetch and render real-time, SEO-optimized blog content directly into your website.

## Demo

Visit the [DevHunt Blog](https://devhunt.org/blog?utm_source=github) to check out an example of SEObot Blog API integration.

## Prerequisites

- Node.js installed on your machine
- SEObot API Key (you can find it in your website settings on [app.seobotai.com](https://app.seobotai.com/?utm_source=github))

## Environment Setup

First, set up your SEObot API Key environment variable. Create a `.env.local` file for local development:

```bash
SEOBOT_API_KEY=<your_seobot_key>
```

⚠️ You can use following **DEMO** SEOBOT_API_KEY for local development:

```bash
SEOBOT_API_KEY=a8c58738-7b98-4597-b20a-0bb1c2fe5772
```

## Running the Development Server

1. Install the required packages:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Execute one of the following commands to start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Once the server is running, navigate to [http://localhost:3000/blog](http://localhost:3000/blog) in your browser to view the application.

## API client library

This project incorporates the SEObot Blog API Client Library. For more details and to install the npm package, visit [seobot on npmjs](https://www.npmjs.com/package/seobot).

## Editing the Blog Design

You can begin customizing your blog design by editing the files under the `app/blog/` route. Your changes will be automatically reflected in the app thanks to Next.js's hot reloading feature.

## Sitemap Configuration for SEO

### Automatic Integration

This project comes with a separate `blog/sitemap.xml` generated dynamically. If you have an existing dynamic sitemap, you can programmatically merge the blog sitemap into it. The exact steps depend on how you're generating your main sitemap, but the goal is to combine them seamlessly.

### Standalone Blog Sitemap

If you prefer not to merge, it's crucial to submit the standalone `blog/sitemap.xml` to your Google Search Console for SEO.

- Open Google Search Console.
- Select 'Sitemaps' from the menu.
- Enter the URL of your `blog/sitemap.xml`.
- Click 'Submit'.

⚠️ **Google Limits**: keep this in mind that Google restricts sitemaps to 50,000 URLs and a file size of up to 50MB.

## Contributing

If you find any bugs or have feature suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For additional assistance or information, feel free to reach out.

---

Revolutionize your website's content strategy with real-time, automated, SEO-optimized blog posts. Get started with [SEObot](https://seobotai.com/?utm_source=github) AI Blog Autopilot integration today!