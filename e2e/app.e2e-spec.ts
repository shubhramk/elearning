import { AdminDashboardPage } from './app.po';

describe('admin-dashboard App', () => {
  let page: AdminDashboardPage;

  beforeEach(() => {
    page = new AdminDashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
