require 'rails_helper'

describe 'Authentication', js: true do
  before do
    ENV.delete('DEMO') if ENV['DEMO'].present?
  end

  it 'show login page for anon user' do
    visit root_path
    expect(page).to have_current_path(new_user_session_path)
    expect(page).to have_content('You need to sign in or sign up before continuing')
    expect(page).to have_content('Sign in')
    expect(page).to have_content('Sign up')
    expect(page).to have_content('Reset password')
  end

  context 'user not exist' do
    it 'allow user to view sign up page' do
      visit new_user_session_path
      click_on 'Sign up'
      expect(page).to have_current_path(new_user_registration_path)
    end

    it 'user able to sign up' do
      register
      expect(page).to have_content('Add snippet')
    end

    it 'unable to reset password for unregistered email' do
      create(:user)
      visit new_user_password_path
      fill_in 'user[email]', with: 'non-existing-email@example.com'
      click_on 'Send me reset password instructions'
      expect(ActionMailer::Base.deliveries.size).to eq(0)
      expect(page).to have_content('Email not found')
    end
  end

  describe 'user exist' do
    it 'not allow new users to view sign up page' do
      create(:user)
      visit new_user_session_path
      click_on 'Sign up'
      expect(page).to have_current_path(new_user_session_path)
      expect(page).to have_content('Snibox allow registration just for one user', wait: 5)
    end

    it 'able to login' do
      login
      expect(page).to have_content('Add snippet')
    end

    it 'able to reset password for registered email' do
      create(:user)
      visit new_user_password_path
      fill_in 'user[email]', with: 'demo@example.com'
      click_on 'Send me reset password instructions'
      expect(ActionMailer::Base.deliveries.size).to eq(1)
    end
  end
end
