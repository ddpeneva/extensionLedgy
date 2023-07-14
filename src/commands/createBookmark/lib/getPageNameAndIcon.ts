const DEFAULT_ICON = '📄';

export const getPageNameAndIcon = (page: NotionPage) => {
  return `${page.icon || DEFAULT_ICON} ${page.title}`;
};
