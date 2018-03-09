module UserHelper
  def login(create_user = true)
    create(:user) if create_user
    visit root_path
    fill_in 'Email', with: 'demo@example.com'
    fill_in 'Password', with: 'demo11'
    click_on 'Sign in'
  end

  def register
    visit new_user_registration_path
    fill_in 'Email', with: 'demo@example.com'
    fill_in 'Password', with: 'demo11'
    fill_in 'Password confirmation', with: 'demo11'
    click_on 'Sign up'
  end

  def logout
    visit root_path
    click_on 'Logout'
  end
end
