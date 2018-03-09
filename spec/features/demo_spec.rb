require 'rails_helper'

describe 'Demo', js: true do
  before do
    create(:user)
    ENV['DEMO'] = 'yes'
    ENV['DEMO_EMAIL'] = 'demo@example.com'
    ENV['DEMO_PASSWORD'] = 'demo11'
  end

  context 'visit login page' do
    before do
      visit new_user_session_path
    end

    it 'show demo email' do
      expect(page).to have_content(ENV['DEMO_EMAIL'])
    end

    it 'show demo password' do
      expect(page).to have_content(ENV['DEMO_PASSWORD'])
    end
  end

  context 'when anon user' do
    context 'click sign up' do
      it_behaves_like 'has demo restrictions' do
        let(:path) { new_user_session_path }
        let(:link_title) { 'Sign up' }
        let(:message) { 'Snibox allow registration just for one user' }
      end
    end

    context 'click reset password' do
      it_behaves_like 'has demo restrictions' do
        let(:path) { new_user_session_path }
        let(:link_title) { 'Reset password' }
        let(:message) { 'Reset password disabled on demo version' }
      end
    end
  end

  context 'when auth user' do
    before do
      login(false)
      click_on 'Settings'
    end

    it_behaves_like 'has demo restrictions' do
      let(:path) { edit_user_registration_path }
      let(:link_title) { 'Update' }
      let(:message) { 'Credentials locked for demo version. You can change them on your setup' }
    end

    # TODO: add spec for account delete
    it_behaves_like 'has demo restrictions' do
      let(:path) { edit_user_registration_path }
      let(:link_title) { 'Cancel my account' }
      let(:message) { 'Credentials locked for demo version. You can change them on your setup' }
      let(:confirm) { 'yes' }
    end
  end
end
