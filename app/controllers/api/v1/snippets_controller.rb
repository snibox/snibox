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

  # TODO: refactor this
  def snippet_params
    data = params.require(:snippet).permit(:title, :content, :language, :tabs, label_attributes: [:name])
    if data[:label_attributes]['name'].blank?
      data = data.except(:label_attributes)
    else
      label = Label.where(name: data[:label_attributes]['name']).first
      data = label.nil? ? data : data.except(:label_attributes).merge(label: label)
    end
    data
  end
end
