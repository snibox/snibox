module ResponseData
  extend ActiveSupport::Concern

  def snippet_save_data(snippet, completed)
    if completed
      { completed: true, snippet: SnippetSerializer.new(snippet).attributes }
    else
      { completed: false, errors: snippet.errors.full_messages }
    end
  end
end
