# works for the next structure:
# db/data/snippets/:label/snippet_title.md
# example: db/data/snippets/aws/ec2.md

SNIPPETS_PATH = File.expand_path('./data/snippets/**/*', __dir__).freeze

Dir[SNIPPETS_PATH].each do |path|
  info = path.split '/'

  next if info.length != 12

  content = ''
  File.open(path, 'r') do |f|
    f.each_line do |line|
      content += line
    end
  end

  snippet_title = info.pop.gsub!('.md', '')
  label_name = info.pop

  Snippet.create(
    title: snippet_title,
    label: Label.find_or_create_by(name: label_name),
    content: content,
    language: 'automatically',
    tabs: 2
  )
end

if ENV['DEMO'].present?
  User.delete_all

  User.create(
    email: ENV['DEMO_EMAIL'],
    password: ENV['DEMO_PASSWORD']
  )
end
