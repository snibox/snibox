shared_examples 'has demo restrictions' do
  before do
    visit path
    # defined?(confirm) ? accept_confirm { click_on link_title } : click_on(link_title)
    click_on link_title
    if defined?(confirm)
      find('.swal2-confirm').click
      sleep 2
    end
  end

  it 'redirect user and show message' do
    expect(page).to have_current_path(path)
    expect(page).to have_content(message)
  end
end
