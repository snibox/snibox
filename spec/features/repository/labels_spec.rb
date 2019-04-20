require 'rails_helper'

describe 'Labels', js: true do
  before do
    create(:snippet_with_tag)
    login
  end

  it 'user able to edit' do
    click_on 'tag_1'
    find('#label-edit').click
    fill_in 'label-title', with: 'updated tag'
    find('#label-save').click

    within('#labels') do
      expect(page).to have_content('updated tag')
      expect(page).to have_content('0')
      expect(page).to have_content('untagged')
      expect(page).to have_content('1')
    end
    within('#snippets') do
      expect(page).not_to have_css('#label-edit-form')
      first('li > a').click
    end
    within('#show-snippet') do
      expect(page).to have_content('snippet_1')
    end
  end

  # it 'user able to delete' do
  #   find('#snippet-edit').click
  #   fill_in 'snippet-labels', with: ''
  #   click 'Update'
  #   # expect
  # end
end
