class Api::V1::SnippetsController < Api::BaseController
  include ResponseData

  before_action :set_snippet, except: :create

  def create
    @snippet = Snippet.new(snippet_params)
    completed = @snippet.save
    render json: entity_save_data(@snippet, completed)
  end

  def update
    completed = @snippet.update(snippet_params)
    render json: entity_save_data(@snippet, completed)
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
    # nested attributes have some issues with core counter_cache
    # @see: https://github.com/rails/rails/issues/33113
    # let's move to direct Label objects usage for a while
    data = params.require(:snippet).permit(:title, :content, :language, :tabs, label_attributes: [:name])
    label = data[:label_attributes]['name'].blank? ? nil : Label.find_or_create_by(name: data[:label_attributes]['name'])
    data.except(:label_attributes).merge(label: label)
  end
end
