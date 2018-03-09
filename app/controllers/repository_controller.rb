class RepositoryController < ApplicationController
  def index
    @activate_repository = true
    @body_class = "dashboard"
    @page_title = "Dashboard"
  end
end
