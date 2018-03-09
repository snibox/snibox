class SessionsController < Devise::SessionsController
  before_action :lock_credentials, only: :new, if: -> { ENV['DEMO'].present? }

  private

  def lock_credentials
    flash[:success] = <<-HTML
        <p>Email: #{ENV['DEMO_EMAIL']}</p>
        <p>Password: #{ENV['DEMO_PASSWORD']}</p>
    HTML
  end
end
