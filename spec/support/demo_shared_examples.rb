shared_examples 'has demo restrictions' do
  before do
    visit path
    # defined?(confirm) ? accept_confirm { click_on link_title } : click_on(link_title)
    click_on link_title
    find('.swal2-confirm').click if defined?(confirm)
  end

  it 'redirect user and show message' do
    expect(page).to have_current_path(path)
    expect(page).to have_content(message)
  end
end
