Rails.application.routes.draw do
  devise_for :users,
             path: '/',
             path_names: {
                 sign_in: 'login',
                 sign_out: 'logout',
                 sign_up: 'register'
             },
             controllers: {
                 registrations: 'registrations',
                 passwords: 'passwords',
                 sessions: 'sessions'
             }

  namespace :api do
    namespace :v1 do
      resources :labels, only: [:update]

      resources :snippets, except: [:show] do
        member do
          get 'raw/:snippet_file', to: 'snippets#raw', as: 'raw_snippet'
          delete 'destroy/:snippet_file', to: 'snippets#destroy_snippet_file', as: 'destroy_snippet_file'
        end
      end

      get 'data/default-state', to: 'data#default_state'
      get 'data/update-state', to: 'data#update_state'
    end
  end

  get 'help', to: 'pages#help'

  root 'repository#index'
end
