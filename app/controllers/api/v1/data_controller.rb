class Api::V1::DataController < Api::BaseController
  def default_state
    snippets = Snippet.includes(:snippet_files, :labels)

    data = {
      snippets: ActiveModelSerializers::SerializableResource.new(snippets, each_serializer: ::SnippetSerializer),
      languages: Editor.languages
    }

    render json: data
  end
end
