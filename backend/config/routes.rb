Rails.application.routes.draw do
    # Shorthand
    resources :categories do
        resources :tasks
    end

    post '/signup', to: 'auth#signup'
    post '/login', to: 'auth#login'

    # Categories routes
    # get '/categories', to: 'categories#index'
    # post '/categories', to: 'categories#create'
    # get '/categories/:id', to: 'categories#show'
    # patch '/categories/:id', to: 'categories#update'
    # delete '/categories/:id', to: 'categories#destroy'

    # # Tasks routes
    # get '/categories/:category_id/tasks', to: 'tasks#index'
    # post '/categories/:category_id/tasks', to: 'tasks#create'
    # get '/categories/:category_id/tasks/:id', to: 'tasks#show'
    # patch '/categories/:category_id/tasks/:id', to: 'tasks#update'
    # delete '/categories/:category_id/tasks/:id', to: 'tasks#destroy'
end
