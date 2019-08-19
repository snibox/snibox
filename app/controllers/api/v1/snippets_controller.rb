class Api::V1::SnippetsController < Api::BaseController
  include ResponseData

  before_action :set_snippet, except: :create
  before_action :set_snippet_file, only: [:raw]

  def create
    @snippet = Snippet.new(snippet_params.except(:label_attributes))
    completed = @snippet.save
    find_label(snippet_params)
    render json: entity_save_data(@snippet, completed)
  end

  def update
    completed = @snippet.update(snippet_params.except(:label_attributes))
    find_label(snippet_params)
    render json: entity_save_data(@snippet, completed)
  end

  def destroy
    Labeling.where(snippet_id: @snippet.id).destroy_all
    Label.where(snippets_count: 0).destroy_all
    SnippetFile.where(snippet_id: @snippet.id).destroy_all
    @snippet.destroy
    data = { completed: true }
    render json: data
  end

  def raw
    render plain: @snippet_file.content
  end

  private

  def set_snippet
    @snippet = Snippet.find(params[:id])
  end

  def set_snippet_file
    @snippet_file = @snippet.snippet_files.find_by(id: params[:snippet_file])
  end

  # check if label is already used, or if necessary to create one + create labeling (link between label and snippet)
  def find_label(data)
    labels_array = []
    return if data[:label_attributes]['name'].nil?
    labels = data[:label_attributes]['name'].split(',')
    labels.each { |label|
      labels_array << label.strip.upcase
      @label = Label.find_by(name: label.strip.upcase)
      Label.create(name: label.strip.upcase).labelings.build(snippet: @snippet).save if @label.nil?
      @label.labelings.build(snippet: @snippet).save if @label.present? && !@label.labelings.find_by(snippet_id: @snippet)
    }
    delete_unused_label(labels_array)
  end

  # remove unused labels and labeling - link with snippet
  def delete_unused_label(labels)
    snippet_labels = [];
    @snippet.labels.each { |label| snippet_labels << label.name }
    labels_difference = snippet_labels - labels
    if labels_difference.length > 0
      labels_difference.each do |diff|
        to_delete_label = Label.find_by(name: diff)
        Labeling.where(label_id: to_delete_label.id).find_by(snippet_id: @snippet.id).destroy
        to_delete_label.destroy if to_delete_label.snippets_count <= 1
      end
    end
  end

  def snippet_params
    # TODO: it's legacy for core counter_cache issues
    data = params.require(:snippet).permit(:title, :description, :id, snippet_files_attributes: [:id, :title, :content, :language, :tabs, :_destroy], label_attributes: [:name])
    return data
  end
end
