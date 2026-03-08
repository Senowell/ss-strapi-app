import type { Schema, Struct } from '@strapi/strapi';

export interface AboutIntroSection extends Struct.ComponentSchema {
  collectionName: 'components_about_intro_sections';
  info: {
    displayName: 'Intro Section';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutSolutionBlock extends Struct.ComponentSchema {
  collectionName: 'components_about_solution_blocks';
  info: {
    displayName: 'Solution Block';
    icon: 'chartCircle';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    theme: Schema.Attribute.Enumeration<['dark', 'light']>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_about_team_members';
  info: {
    displayName: 'Team Member';
  };
  attributes: {
    linkedinUrl: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    twitterUrl: Schema.Attribute.String;
  };
}

export interface DownloadsDownloadItems extends Struct.ComponentSchema {
  collectionName: 'components_downloads_download_items';
  info: {
    displayName: 'Download Items';
  };
  attributes: {
    Category: Schema.Attribute.Enumeration<['Brochure', 'Flyer', 'Manual']>;
    Description: Schema.Attribute.Text;
    File: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MenuSectionMegaMenu extends Struct.ComponentSchema {
  collectionName: 'components_menu_section_mega_menus';
  info: {
    displayName: 'Mega Menu';
    icon: 'layer';
  };
  attributes: {
    Links: Schema.Attribute.Component<'navigation.link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface NavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    Label: Schema.Attribute.String;
    Open_In_New_Tab: Schema.Attribute.Boolean;
    URL: Schema.Attribute.String;
  };
}

export interface NewsSectionNews extends Struct.ComponentSchema {
  collectionName: 'components_news_section_news';
  info: {
    displayName: 'News';
  };
  attributes: {
    slug: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.intro-section': AboutIntroSection;
      'about.solution-block': AboutSolutionBlock;
      'about.team-member': AboutTeamMember;
      'downloads.download-items': DownloadsDownloadItems;
      'menu-section.mega-menu': MenuSectionMegaMenu;
      'navigation.link': NavigationLink;
      'news-section.news': NewsSectionNews;
    }
  }
}
