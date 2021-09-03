# TODO: add specs for keyboard navigation

require 'rails_helper'

describe 'Search', js: true do
  before do
    login
  end

  context 'shortcuts' do
    before do
      create(:snippet)
    end

    it 'focus on slash' do
      sleep 0.5
      find('body').native.send_key('/')
      within('.search-box') { expect(page).to have_css('.search-box input:focus') }
    end

    it 'blur on escape' do
      fill_search_after_delay
      find('.search-box input.search').native.send_key(:escape)
      within('.search-box') { expect(page).not_to have_css('.search-box input:focus') }
    end
  end

  it 'show suggestions block' do
    create(:snippet)
    fill_search_after_delay
    within('.search-box') { expect(page).to have_css('.suggestions') }
  end

  it 'show first 5 results' do
    8.times do
      create(:snippet_without_tag)
    end
    fill_search_after_delay
    expect(page).to have_css('.suggestions li', count: 5)
  end

  it 'open snippet when click on suggestion' do
    create(:snippet)
    fill_search_after_delay
    find('.suggestions a').click
    within('#show-snippet') { expect(page).to have_content('snippet_1') }
  end

  context 'search snippets' do
    context 'with label' do
      before do
        create(:snippet)
        fill_search_after_delay
      end
      it 'show snippet with label' do
        within('.suggestions') do
          expect(page).to have_content('snippet_1')
          expect(page).to have_content('tag_1')
        end
      end
    end

    context 'without label' do
      before do
        create(:snippet_without_tag, description: 'snippet_1')
        fill_search_after_delay
      end
      it 'show snippet with untagged label' do
        within('.suggestions') do
          expect(page).to have_content('snippet_1')
          expect(page).to have_content('untagged')
        end
      end
    end
  end

  private

  def fill_search_after_delay
    sleep 0.5
    find(:css, '.search').set('snippet1')
  end
end
