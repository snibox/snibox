require 'rails_helper'

describe 'Help page', js: true do
  before do
    login
    visit help_path
  end

  it 'have needed sections' do
    expect(page).to have_content('Have an issue?')
    expect(page).to have_content('Source code')
    expect(page).to have_content('Documentation')
  end
end
