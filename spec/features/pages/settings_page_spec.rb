require 'rails_helper'

describe 'Settings page', js: true do
  before do
    login
    visit edit_user_registration_path
  end

  it 'render user form' do
    expect(page).to have_content('Account settings')
  end
end
