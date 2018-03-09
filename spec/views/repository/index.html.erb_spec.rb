require 'rails_helper'

describe 'repository/index' do
  it 'render #app wrapper for vue.js frontend' do
    render
    assert_select '#app', count: 1
  end
end
