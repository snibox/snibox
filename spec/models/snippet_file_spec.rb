require 'rails_helper'

describe SnippetFile do
  describe '#language_suported' do
    let(:snippet_file_valid_language) { build(:single_snippet_file, language: 'php') }
    let(:snippet_file_not_valid_language) { build(:single_snippet_file, language: 'language') }

    it 'not valid when language isn\'t supported' do
      expect(snippet_file_not_valid_language).to_not be_valid
    end

    it 'valid when language supported' do
      expect(snippet_file_valid_language).to be_valid
    end
  end
end
