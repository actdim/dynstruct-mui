import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

const GITHUB_REPO = 'https://github.com/actdim/dynstruct-mui';

export default withMermaid(
  defineConfig({
    base: '/dynstruct-mui/',
    outDir: '../.dist-docs',
    cacheDir: '../node_modules/.cache/vitepress',
    title: 'Dynstruct MUI',
    description: 'Material-UI bindings and components for Dynstruct component model',
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: true,

    rewrites: {
      'INDEX.md': 'index.md'
    },

    markdown: {
      config: (md) => {
        const defaultRender =
          md.renderer.rules.link_open ||
          function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
          };

        md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
          const token = tokens[idx];
          const hrefIndex = token.attrIndex('href');
          if (hrefIndex >= 0) {
            const href = token.attrs![hrefIndex][1];
            if (href.startsWith('../')) {
              token.attrs![hrefIndex][1] = `${GITHUB_REPO}/blob/main/${href.slice(3)}`;
            }
          }
          return defaultRender(tokens, idx, options, env, self);
        };
      }
    },

    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Architecture', link: '/topic--architecture' },
        { text: 'Domain Model', link: '/topic--domain-model' },
        { text: 'Setup & Workflow', link: '/topic--setup-and-workflow' },
        { text: 'GitHub', link: GITHUB_REPO }
      ],

      sidebar: [
        {
          text: 'Overview & Index',
          items: [
            { text: 'Knowledge Base Index', link: '/' },
            { text: 'Architecture', link: '/topic--architecture' },
            { text: 'Domain Model', link: '/topic--domain-model' }
          ]
        },
        {
          text: 'Development & Operations',
          items: [
            { text: 'Dependencies', link: '/topic--dependencies' },
            { text: 'Setup & Workflow', link: '/topic--setup-and-workflow' }
          ]
        }
      ],

      search: {
        provider: 'local'
      },

      socialLinks: [
        { icon: 'github', link: GITHUB_REPO }
      ],

      editLink: {
        pattern: `${GITHUB_REPO}/edit/main/docs/:path`,
        text: 'Edit this page on GitHub'
      },

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright (c) 2025-2026 Pavel Borodaev'
      }
    },

    mermaid: {
      theme: 'default'
    }
  })
);

