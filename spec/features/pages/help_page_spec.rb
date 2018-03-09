require 'rails_helper'

describe 'Help page', js: true do
  before do
    login
    visit help_path
  end

  it 'have needed sections' do
    expect(page).to have_content('Highlighting')
    expect(page).to have_content('Authentication')
    expect(page).to have_content('Source code')
  end
end
