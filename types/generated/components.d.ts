import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu-section.mega-menu': MenuSectionMegaMenu;
      'navigation.link': NavigationLink;
    }
  }
}
