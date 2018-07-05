class ConvertLegacyLanguages < ActiveRecord::Migration[5.2]
  def change
    update_matrix = {
      shell: :bash,
      sass: :scss
    }

    snippets = Snippet.where(language: update_matrix.keys)

    snippets.each do |snippet|
      snippet.update(language: update_matrix[snippet.language.to_sym])
    end
  end
end
