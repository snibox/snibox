class Api::V1::SnippetsController < Api::BaseController
  include ResponseData

  before_action :set_snippet, except: :create
  before_action :set_snippet_file, only: [:raw, :destroy_snippet_file]

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
    render plain: @snippet_file.content
  end

  def destroy_snippet_file
    @snippet_file.destroy
    render json: entity_save_data(@snippet, true)
  end

  private

  def set_snippet
    @snippet = Snippet.find(params[:id])
  end

  def set_snippet_file
    @snippet_file = @snippet.snippet_files.find_by(id: params[:snippet_file])
  end

  def snippet_params
    # TODO: it's legacy for core counter_cache issues
    data = params.require(:snippet).permit(:description, snippet_files_attributes: [:id, :title, :content, :language, :tabs], label_attributes: [:name])
    label = data[:label_attributes]['name'].blank? ? nil : Label.find_or_create_by(name: data[:label_attributes]['name'])
    data.except(:label_attributes).merge(label: label)
  end
end
