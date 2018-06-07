class Api::V1::DataController < Api::BaseController
  def default_state
    data = {
      snippets: ActiveModelSerializers::SerializableResource.new(Snippet.all, each_serializer: ::SnippetSerializer),
      languages: Editor.languages
    }
    render json: data
  end
end
