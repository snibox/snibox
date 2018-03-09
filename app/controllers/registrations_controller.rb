class RegistrationsController < Devise::RegistrationsController
  before_action :one_user_registered?, only: [:new, :create]
  before_action :credentials_locked?, only: [:update, :destroy], if: -> { ENV['DEMO'].present? }

  def edit
    @page_title = 'Settings'
    super
  end

  protected

  def one_user_registered?
    if User.count == 1
      redirect_to root_path if user_signed_in?
      redirect_to new_user_session_path, notice: 'Snibox allow registration just for one user.'
    end
  end

  def credentials_locked?
    redirect_back(fallback_location: root_path, notice: 'Credentials locked for demo version. You can change them on your setup.')
  end
end
