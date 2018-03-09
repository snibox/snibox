require 'rails_helper'

describe 'Navbar', js: true do
  before do
    visit root_path
  end

  it 'exist' do
    expect(page).to have_css('#navbar')
  end

  context 'logo' do
    it 'exist' do
      within('#navbar') {expect(page).to have_css('#logo')}
    end
  end

  context 'when user not logged in' do
    it 'not render content for auth user' do
      within('#navbar') do
        expect(page).not_to have_content('Dashboard')
        expect(page).not_to have_content('Add snippet')
        expect(page).not_to have_content('Help')
        expect(page).not_to have_content('Settings')
        expect(page).not_to have_content('Logout')
      end
    end
  end

  context 'when user logged in' do
    before do
      login
    end

    it 'render correct links' do
      within('#navbar') do
        expect(page).to have_content('Dashboard')
        expect(page).to have_content('Add snippet')
        expect(page).to have_content('Help')
        expect(page).to have_content('Settings')
        expect(page).to have_content('Logout')
      end
    end
  end
end
