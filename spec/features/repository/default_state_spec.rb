require 'rails_helper'

describe 'Default state', js: true do
  before do
    login
  end

  it 'show \'No found\' messages' do
    within('#labels') { expect(page).to have_content('No labels found') }
    within('#snippets') { expect(page).to have_content('No snippets found') }
  end

  describe 'on add snippet click' do
    it 'user see the form and able to cancel it' do
      click_on 'Add snippet'
      expect(page).to have_content('New snippet')
      click_on 'Cancel'
      expect(page).to have_no_content('New snippet')
    end
  end
end
