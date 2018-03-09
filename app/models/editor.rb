class Editor
  def self.languages
    data = YAML.load_file(File.join(Rails.root, 'config', 'editor.yml'))
    data['languages'].symbolize_keys
  end
end
