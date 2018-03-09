class PasswordsController < Devise::PasswordsController
  before_action :credentials_locked?, only: [:new, :update], if: -> { ENV['DEMO'].present? }

  private
  def credentials_locked?
    redirect_to new_user_session_path, notice: "Reset password disabled on demo version."
  end
end
