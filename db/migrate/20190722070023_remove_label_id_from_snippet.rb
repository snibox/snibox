class RemoveLabelIdFromSnippet < ActiveRecord::Migration[5.2]
  def change
    Label.update_all(snippets_count: 0)
    Snippet.where.not(label_id: nil).each do |snippet|
      label = Label.find_by(id: snippet.label_id)
      labeling = label.labelings.build(snippet: snippet)
      labeling.save!
    end
    remove_column :snippets, :label_id
  end
end
