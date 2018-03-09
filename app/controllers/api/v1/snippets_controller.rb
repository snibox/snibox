class Api::V1::SnippetsController < Api::BaseController
  include ResponseData

  before_action :set_snippet, except: :create

  def create
    @snippet = Snippet.new(snippet_params)
    completed = @snippet.save
    render json: snippet_save_data(@snippet, completed)
  end

  def update
    completed = @snippet.update(snippet_params)
    render json: snippet_save_data(@snippet, completed)
  end

  def destroy
    @snippet.destroy
    data = { completed: true }
    render json: data
  end

  def raw
    render plain: @snippet.content
  end

  private

  def set_snippet
    @snippet = Snippet.find(params[:id])
  end

  def snippet_params
    params.require(:snippet).permit(:title, :content, :language, :tabs, :tag_list)
  end
end
