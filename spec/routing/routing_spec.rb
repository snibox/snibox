require 'rails_helper'

describe Api::V1::LabelsController do
  it 'routes to #update via PUT' do
    expect(put: '/api/v1/labels/1').to route_to('api/v1/labels#update', id: '1')
  end

  it 'routes to #update via PATCH' do
    expect(patch: '/api/v1/labels/1').to route_to('api/v1/labels#update', id: '1')
  end
end

describe Api::V1::SnippetsController do
  it 'routes to #index' do
    expect(get: '/api/v1/snippets').to route_to('api/v1/snippets#index')
  end

  it 'routes to #new' do
    expect(get: '/api/v1/snippets/new').to route_to('api/v1/snippets#new')
  end

  it 'routes to #edit' do
    expect(get: '/api/v1/snippets/1/edit').to route_to('api/v1/snippets#edit', id: '1')
  end

  it 'routes to #create' do
    expect(post: '/api/v1/snippets').to route_to('api/v1/snippets#create')
  end

  it 'routes to #update via PUT' do
    expect(put: '/api/v1/snippets/1').to route_to('api/v1/snippets#update', id: '1')
  end

  it 'routes to #update via PATCH' do
    expect(patch: '/api/v1/snippets/1').to route_to('api/v1/snippets#update', id: '1')
  end

  it 'routes to #destroy' do
    expect(delete: '/api/v1/snippets/1').to route_to('api/v1/snippets#destroy', id: '1')
  end

  it 'routes to #raw' do
    expect(get: '/api/v1/snippets/1/raw/1').to route_to('api/v1/snippets#raw', id: '1', snippet_file: '1')
  end
end

describe Api::V1::DataController do
  it 'routes to #default_state' do
    expect(get: '/api/v1/data/default-state').to route_to('api/v1/data#default_state')
  end

  it 'routes to #update_state' do
    expect(get: '/api/v1/data/update-state').to route_to('api/v1/data#update_state')
  end
end

describe 'Root' do
  it 'routes to repository#index' do
    expect(get: '/').to route_to('repository#index')
  end
end
